import type { Metadata } from "next";

import { AudienceToggle } from "@/components/marketing/audience-toggle";
import { ComparisonTeaser } from "@/components/marketing/comparison-teaser";
import { FaqSection } from "@/components/marketing/faq";
import { FeatureBento } from "@/components/marketing/feature-bento";
import { FinalCta } from "@/components/marketing/final-cta";
import { MarketingFooter } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { MarketingNav } from "@/components/marketing/nav";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { StatsSection } from "@/components/marketing/stats-section";
import { HOME_FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Klimar™ — Gestão para serviços técnicos",
  description:
    "OS digital, fotos antes/depois, assinatura no app, PDF de orçamento direto pro WhatsApp. Para autônomos, MEIs e empresas de ar-condicionado, elétrica e manutenção predial.",
};

export default function HomePage() {
  return (
    <>
      <MarketingNav />
      <main>
        <Hero />
        <AudienceToggle />
        <StatsSection />
        <FeatureBento />
        <HowItWorks />
        <ComparisonTeaser />
        <PricingTeaser />
        <FaqSection
          eyebrow="dúvidas comuns"
          title="Perguntas frequentes."
          items={HOME_FAQS}
          source="home"
        />
        <FinalCta
          id="cta"
          size="lg"
          title={
            <>
              Comece a usar o Klimar <span className="tic">hoje.</span>
            </>
          }
          description="Grátis. Sem cartão. Sem letra miúda."
          primary={{ href: "/precos", label: "Criar conta grátis" }}
          secondary={{ href: "#cta-business", label: "Falar com vendas" }}
        />
      </main>
      <MarketingFooter />
    </>
  );
}
