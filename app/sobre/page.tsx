import type { Metadata } from "next";

import {
  AboutHero,
  MissionSection,
  OriginStorySection,
  WhoWeAreSection,
} from "@/components/marketing/about-sections";
import { FinalCta } from "@/components/marketing/final-cta";
import { MarketingFooter } from "@/components/marketing/footer";
import { ManifestoSection } from "@/components/marketing/manifesto";
import { MarketingNav } from "@/components/marketing/nav";
import { RoadmapSection } from "@/components/marketing/roadmap";

export const metadata: Metadata = {
  title: "Sobre · Construído por quem vive o problema",
  description:
    "Klimar é o produto da IAVerde — startup brasileira de base tecnológica baseada no Rio de Janeiro. Manifesto, time, e roadmap público.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <MarketingNav />
      <main>
        <AboutHero />
        <MissionSection />
        <WhoWeAreSection />
        <OriginStorySection />
        <ManifestoSection />
        <RoadmapSection />
        <FinalCta
          id="cta"
          title={
            <>
              Bora <span className="tic">construir junto?</span>
            </>
          }
          description="Comece grátis, ou converse com o time fundador."
          primary={{ href: "/precos", label: "Começar grátis" }}
          secondary={{ href: "mailto:contato@useklimar.com.br", label: "Falar com fundador" }}
        />
      </main>
      <MarketingFooter />
    </>
  );
}
