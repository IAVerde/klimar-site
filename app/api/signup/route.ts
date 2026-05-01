import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";

import { getClientIp } from "@/lib/get-client-ip";
import { getPostHogClient } from "@/lib/posthog-server";
import { rateLimit } from "@/lib/rate-limit";
import { signupSchema } from "@/lib/schemas";
import { SITE } from "@/lib/site";
import { createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`signup:${ip}`, { windowMs: 60_000, max: 3 });
  if (!limiter.allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde um momento." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(limiter.resetIn / 1000)) } },
    );
  }

  let payload;
  try {
    const json = await req.json();
    payload = signupSchema.parse(json);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message ?? "Dados inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const supabase = createServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Cadastro temporariamente indisponível. Tente novamente em instantes." },
      { status: 503 },
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      emailRedirectTo: `${SITE.appUrl}/dashboard`,
      data: { source: "landing", audience: payload.audience ?? "unknown" },
    },
  });

  if (error) {
    console.warn("[signup] supabase error:", error.message);
    return NextResponse.json(
      { error: humanizeAuthError(error.message) },
      { status: 400 },
    );
  }

  const distinctId = data.user?.id ?? payload.email;
  const posthog = getPostHogClient();
  if (posthog) {
    posthog.identify({
      distinctId,
      properties: { email: payload.email, audience: payload.audience ?? "unknown" },
    });
    posthog.capture({
      distinctId,
      event: "signup_completed",
      properties: {
        audience: payload.audience ?? "unknown",
        requires_confirmation: !data.session,
        source: "landing",
      },
    });
  }

  return NextResponse.json({
    success: true,
    requiresConfirmation: !data.session,
  });
}

function humanizeAuthError(message: string): string {
  if (message.toLowerCase().includes("already registered")) {
    return "Esse email já tem cadastro. Faça login no app.";
  }
  if (message.toLowerCase().includes("password")) {
    return "Senha inválida. Use ao menos 8 caracteres.";
  }
  return "Não foi possível criar a conta. Tente novamente.";
}
