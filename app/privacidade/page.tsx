import type { Metadata } from "next";

import { MarketingFooter } from "@/components/marketing/footer";
import { MarketingNav } from "@/components/marketing/nav";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Política de privacidade e LGPD do Klimar™. Em breve substituiremos por documento gerado via iubenda.",
  alternates: { canonical: "/privacidade" },
  robots: { index: false, follow: true },
};

export default function PrivacidadePage() {
  return (
    <>
      <MarketingNav />
      <main className="pt-[112px] pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="eyebrow mb-6">
            <span>legal · placeholder</span>
          </div>
          <h1 className="h-display text-[clamp(40px,5vw,64px)] mb-8">
            Privacidade &amp; <span className="tic">LGPD.</span>
          </h1>
          <p className="text-slate-300 text-[17px] leading-[1.7] mb-6">
            Klimar™ é compromisso de transparência: hospedagem no Brasil, exportação
            completa de dados (inclusive no Free), zero venda ou compartilhamento, zero
            uso pra treinamento de IA. A versão definitiva desta política será publicada
            pela{" "}
            <a
              href="https://www.iubenda.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00B8D4] hover:underline"
            >
              iubenda
            </a>{" "}
            cobrindo LGPD, Marco Civil e CDC.
          </p>

          <div id="cookies" className="mt-12 mb-6 scroll-mt-32">
            <div className="eyebrow mb-3">
              <span>cookies</span>
            </div>
            <p className="text-slate-400 text-[15px] leading-relaxed">
              Usamos cookies essenciais (sessão) e analytics anônimos (PostHog) com
              identificação só após login. Sem cookies de propaganda, sem retargeting.
            </p>
          </div>

          <div id="lgpd" className="mt-10 mb-6 scroll-mt-32">
            <div className="eyebrow mb-3">
              <span>seus direitos lgpd</span>
            </div>
            <p className="text-slate-400 text-[15px] leading-relaxed">
              Acesso, correção, exclusão e portabilidade dos seus dados a qualquer momento
              em{" "}
              <a
                href="mailto:contato@iaverde.ia.br"
                className="text-[#00B8D4] hover:underline"
              >
                contato@iaverde.ia.br
              </a>
              . Resposta em até 15 dias.
            </p>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
