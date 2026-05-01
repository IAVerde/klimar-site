import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";

import { businessLeadInternalHtml } from "@/lib/email-templates";
import { getClientIp } from "@/lib/get-client-ip";
import { getPostHogClient } from "@/lib/posthog-server";
import { rateLimit } from "@/lib/rate-limit";
import { RESEND_FROM, getResend } from "@/lib/resend";
import { businessLeadSchema } from "@/lib/schemas";
import { createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limiter = rateLimit(`lead:${ip}`, { windowMs: 60_000, max: 2 });
  if (!limiter.allowed) {
    return NextResponse.json(
      { error: "Muitas requisições. Aguarde um momento." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(limiter.resetIn / 1000)) } },
    );
  }

  let payload;
  try {
    const json = await req.json();
    payload = businessLeadSchema.parse(json);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.errors[0]?.message ?? "Dados inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const supabase = createServerClient();
  const userAgent = req.headers.get("user-agent") ?? undefined;

  if (supabase) {
    const { error } = await supabase.from("business_leads").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      company: payload.company,
      num_technicians: payload.num_technicians ?? null,
      message: payload.message ?? null,
      source: payload.source ?? "landing",
      utm_source: payload.utm_source,
      utm_medium: payload.utm_medium,
      utm_campaign: payload.utm_campaign,
      user_agent: userAgent,
      ip_address: ip === "anonymous" ? null : ip,
    });

    if (error) {
      console.error("[lead] insert error:", error);
      return NextResponse.json({ error: "Falha ao registrar." }, { status: 500 });
    }
  } else {
    console.warn("[lead] supabase indisponível — log only", payload);
  }

  const resend = getResend();
  const notify = process.env.LEAD_NOTIFICATION_EMAIL;
  if (resend && notify) {
    try {
      await resend.emails.send({
        from: RESEND_FROM,
        to: notify,
        replyTo: payload.email,
        subject: `[Business Lead] ${payload.company} · ${payload.name}`,
        html: businessLeadInternalHtml({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          company: payload.company,
          num_technicians: payload.num_technicians,
          message: payload.message,
          source: payload.source,
          utm_source: payload.utm_source,
          utm_medium: payload.utm_medium,
          utm_campaign: payload.utm_campaign,
          ip,
        }),
      });
    } catch (err) {
      console.warn("[lead] notification email failed:", err);
    }
  }

  const posthog = getPostHogClient();
  if (posthog) {
    posthog.capture({
      distinctId: payload.email,
      event: "business_lead_submitted",
      properties: {
        company: payload.company,
        num_technicians: payload.num_technicians ?? null,
        source: payload.source ?? "landing",
        utm_source: payload.utm_source,
        utm_medium: payload.utm_medium,
        utm_campaign: payload.utm_campaign,
      },
    });
  }

  return NextResponse.json({ success: true });
}
