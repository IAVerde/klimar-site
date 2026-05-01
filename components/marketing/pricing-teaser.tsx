import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { CtaButton } from "@/components/marketing/cta-button";
import { PLAN_TEASERS } from "@/lib/plans";

export function PricingTeaser() {
  return (
    <section className="section-pad relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="eyebrow">
            <span>preços</span>
          </div>
          <h2 className="h-section text-[clamp(32px,4vw,52px)] mt-5">
            Comece grátis. <span className="tic">Cresce</span> quando você crescer.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {PLAN_TEASERS.map((plan) => (
            <div
              key={plan.id}
              className={`card-surface p-8 flex flex-col ${plan.popular ? "pricing-popular" : ""}`}
            >
              {plan.popular && <span className="popular-badge">mais popular</span>}
              <div className="font-display font-semibold text-[22px] tracking-tighter2">
                {plan.name}
              </div>
              <div className="text-slate-400 text-[14px] mt-1">{plan.tagline}</div>
              <div className="mt-7 mb-2 flex items-baseline gap-2">
                <span className="font-display font-bold text-[52px] tracking-tightest leading-none">
                  R$&nbsp;{plan.id === "free" ? 0 : plan.id === "pro" ? 49 : 119}
                </span>
                <span className="text-slate-500 text-[14px]">{plan.priceUnit}</span>
              </div>
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-slate-500 mb-7">
                {plan.id === "pro" ? "ou r$ 39/mês no anual" : plan.pricingNote}
              </div>
              <ul
                className={`space-y-3 text-[14.5px] mb-8 ${plan.popular ? "text-slate-200" : "text-slate-300"}`}
              >
                {teaserFeatures(plan.id).map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="w-4 h-4 text-[#00B8D4] mt-1 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <CtaButton
                href={ctaHref(plan.id)}
                label={plan.cta.label}
                location="pricing-teaser"
                variant={plan.cta.variant}
                className="mt-auto justify-center"
              >
                {plan.cta.label}
              </CtaButton>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/precos"
            className="inline-flex items-center gap-2 text-[#00B8D4] text-[14.5px] font-medium hover:gap-3 transition-all"
          >
            Ver comparativo completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function teaserFeatures(id: "free" | "pro" | "business" | "enterprise"): string[] {
  if (id === "free")
    return [
      "1 usuário",
      "20 OS por mês",
      "Fotos antes/depois",
      "Assinatura digital",
    ];
  if (id === "pro")
    return [
      "OS, clientes e técnicos ilimitados",
      "Branding seu (logo + cor)",
      "Dashboard de KPIs",
      "WhatsApp + PDF de orçamento",
    ];
  return [
    "PMOC nativo",
    "Roteirização inteligente",
    "NPS pós-atendimento",
    "API e integrações",
  ];
}

function ctaHref(id: string): string {
  if (id === "business") return "/#cta-business";
  return "/#cta";
}
