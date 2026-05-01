import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";

import { getClientIp } from "@/lib/get-client-ip";
import { getPostHogClient } from "@/lib/posthog-server";
import { rateLimit } from "@/lib/rate-limit";
import { RESEND_FROM, getResend } from "@/lib/resend";
import { waitlistWelcomeHtml, waitlistInternalHtml } from "@/lib/email-templates";
import { waitlistSchema } from "@/lib/schemas";
import { createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`waitlist:${ip}`, { windowMs: 30_000, max: 1 });
  if (!limiter.allowed) {
    return NextResponse.json(
      { error: "Muitas requisições. Aguarde alguns segundos." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(limiter.resetIn / 1000)) } },
    );
  }

  let payload;
  try {
    const json = await req.json();
    payload = waitlistSchema.parse(json);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message ?? "Dados inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const supabase = createServerClient();
  const userAgent = req.headers.get("user-agent") ?? undefined;
  let alreadyRegistered = false;

  if (supabase) {
    const audience = payload.audience ?? "unknown";
    const { error } = await supabase.from("waitlist").insert({
      email: payload.email,
      audience,
      source: payload.source ?? "landing",
      utm_source: payload.utm_source,
      utm_medium: payload.utm_medium,
      utm_campaign: payload.utm_campaign,
      user_agent: userAgent,
      ip_address: ip === "anonymous" ? null : ip,
    });

    if (error) {
      // 23505 = unique_violation. Trata como sucesso silencioso (UX).
      if (error.code === "23505") {
        alreadyRegistered = true;
      } else {
        console.error("[waitlist] insert error:", error);
        return NextResponse.json({ error: "Falha ao registrar." }, { status: 500 });
      }
    }
  } else {
    console.warn("[waitlist] supabase indisponível — log only", payload);
  }

  const resend = getResend();
  const notify = process.env.LEAD_NOTIFICATION_EMAIL;
  if (resend && !alreadyRegistered) {
    try {
      await resend.emails.send({
        from: RESEND_FROM,
        to: payload.email,
        subject: "Bem-vindo ao Klimar — em breve liberamos seu acesso",
        html: waitlistWelcomeHtml(),
      });
    } catch (err) {
      console.warn("[waitlist] welcome email failed:", err);
    }

    if (notify) {
      try {
        await resend.emails.send({
          from: RESEND_FROM,
          to: notify,
          subject: `[Waitlist] ${payload.email}`,
          html: waitlistInternalHtml({
            email: payload.email,
            audience: payload.audience,
            source: payload.source,
            utm_source: payload.utm_source,
            utm_medium: payload.utm_medium,
            utm_campaign: payload.utm_campaign,
            user_agent: userAgent,
            ip,
          }),
        });
      } catch (err) {
        console.warn("[waitlist] notification email failed:", err);
      }
    }
  }

  if (!alreadyRegistered) {
    const posthog = getPostHogClient();
    if (posthog) {
      posthog.capture({
        distinctId: payload.email,
        event: "waitlist_submitted",
        properties: {
          audience: payload.audience ?? "unknown",
          source: payload.source ?? "landing",
          utm_source: payload.utm_source,
          utm_medium: payload.utm_medium,
          utm_campaign: payload.utm_campaign,
        },
      });
    }
  }

  return NextResponse.json({ success: true, alreadyRegistered });
}
