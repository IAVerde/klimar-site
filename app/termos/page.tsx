import type { Metadata } from "next";

import { MarketingFooter } from "@/components/marketing/footer";
import { MarketingNav } from "@/components/marketing/nav";

export const metadata: Metadata = {
  title: "Termos de uso",
  description:
    "Termos de uso do Klimar™. Em breve substituiremos por documento gerado via iubenda.",
  alternates: { canonical: "/termos" },
  robots: { index: false, follow: true },
};

export default function TermosPage() {
  return (
    <>
      <MarketingNav />
      <main className="pt-[112px] pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="eyebrow mb-6">
            <span>legal · placeholder</span>
          </div>
          <h1 className="h-display text-[clamp(40px,5vw,64px)] mb-8">
            Termos de <span className="tic">uso.</span>
          </h1>
          <p className="text-slate-300 text-[17px] leading-[1.7] mb-6">
            Esta página é um placeholder. A versão definitiva dos Termos de Uso será gerada
            pela{" "}
            <a
              href="https://www.iubenda.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00B8D4] hover:underline"
            >
              iubenda
            </a>{" "}
            e refletirá as obrigações legais aplicáveis ao serviço Klimar™ no Brasil
            (LGPD, Marco Civil da Internet e CDC).
          </p>
          <p className="text-slate-400 text-[15px]">
            Dúvidas no intervalo:{" "}
            <a
              href="mailto:contato@iaverde.ia.br"
              className="text-[#00B8D4] hover:underline"
            >
              contato@iaverde.ia.br
            </a>
            .
          </p>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
