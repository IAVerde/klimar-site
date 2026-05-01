"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { CtaButton } from "@/components/marketing/cta-button";
import { trackEvent } from "@/components/analytics/posthog-provider";
import { AnalyticsEvent } from "@/lib/analytics-events";
import { PLANS, type Plan } from "@/lib/plans";

type Billing = "monthly" | "yearly";

export function PricingCards() {
  const [billing, setBilling] = useState<Billing>("monthly");

  const onSwitch = (next: Billing) => {
    if (next === billing) return;
    setBilling(next);
    trackEvent(AnalyticsEvent.pricingBillingToggled, { billing: next });
  };

  return (
    <>
      <section className="relative pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
          <div className="billing-toggle inline-flex">
            <button
              type="button"
              className={billing === "monthly" ? "active" : ""}
              onClick={() => onSwitch("monthly")}
              aria-pressed={billing === "monthly"}
            >
              Mensal
            </button>
            <button
              type="button"
              className={billing === "yearly" ? "active" : ""}
              onClick={() => onSwitch("yearly")}
              aria-pressed={billing === "yearly"}
            >
              Anual <span className="savings-badge">economize 20%</span>
            </button>
          </div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} billing={billing} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PricingCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price =
    plan.customLabel ??
    (billing === "yearly" ? plan.yearlyPrice : plan.monthlyPrice);
  const note =
    billing === "yearly" && plan.pricingNoteYearly ? plan.pricingNoteYearly : plan.pricingNote;

  return (
    <div
      className={`card-surface p-7 flex flex-col ${plan.popular ? "pricing-popular" : ""}`}
    >
      {plan.popular && <span className="popular-badge">mais popular</span>}
      <div className="font-display font-semibold text-[20px] tracking-tighter2">
        {plan.name}
      </div>
      <div className="text-slate-400 text-[13px] mt-1">{plan.tagline}</div>
      <div className="mt-6 mb-1 flex items-baseline gap-1.5">
        <span className="font-display font-bold text-[44px] tracking-tightest leading-none">
          {plan.customLabel ? (
            "Sob medida"
          ) : (
            <>R$&nbsp;{price}</>
          )}
        </span>
        {!plan.customLabel && (
          <span className="text-slate-500 text-[13px]">{plan.priceUnit}</span>
        )}
      </div>
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-slate-500 mb-6">
        {note}
      </div>
      <ul
        className={`space-y-2.5 text-[14px] mb-7 ${plan.popular ? "text-slate-200" : "text-slate-300"}`}
      >
        {plan.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <Check className="w-4 h-4 text-[#00B8D4] mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <CtaButton
        href={ctaHref(plan.id)}
        label={plan.cta.label}
        location={`pricing-cards-${plan.id}`}
        variant={plan.cta.variant}
        className="mt-auto justify-center"
      >
        {plan.cta.label}
      </CtaButton>
    </div>
  );
}

function ctaHref(id: string): string {
  if (id === "business") return "/precos#cta-business";
  if (id === "enterprise") return "/precos#cta-business";
  return "/precos#cta";
}
