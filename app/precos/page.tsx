import type { Metadata } from "next";

import { FaqSection } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { MarketingFooter } from "@/components/marketing/footer";
import { MarketingNav } from "@/components/marketing/nav";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { PricingComparison } from "@/components/marketing/pricing-comparison";
import { PricingHero } from "@/components/marketing/pricing-hero";
import { PRICING_FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Preços simples e transparentes",
  description:
    "Free pra sempre, Pro a partir de R$ 39/mês no anual, Business R$ 119/usuário/mês. Sem setup, sem letra miúda, cancela quando quiser.",
  alternates: { canonical: "/precos" },
};

export default function PrecosPage() {
  return (
    <>
      <MarketingNav />
      <main>
        <PricingHero />
        <PricingCards />
        <PricingComparison />
        <FaqSection
          eyebrow="dúvidas de pricing"
          title={
            <>
              Antes de <span className="tic">assinar.</span>
            </>
          }
          items={PRICING_FAQS}
          source="pricing"
        />
        <FinalCta
          id="cta"
          title={
            <>
              Comece com o Free <span className="tic">hoje.</span>
            </>
          }
          description="Pague apenas quando precisar de mais. Cancela quando quiser."
          primary={{ href: "#signup", label: "Criar conta grátis" }}
          secondary={{ href: "#cta-business", label: "Falar com vendas" }}
        />
      </main>
      <MarketingFooter />
    </>
  );
}
