import { GradientOrbs } from "@/components/effects/gradient-orbs";
import { GridPattern } from "@/components/effects/grid-pattern";

export function AboutHero() {
  return (
    <section className="relative pt-[112px] pb-20 overflow-hidden">
      <GradientOrbs variant="subtle" />
      <GridPattern />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 pt-12">
        <div className="eyebrow">
          <span>sobre a klimar</span>
        </div>
        <h1 className="h-display text-[clamp(48px,7vw,92px)] mt-5 mb-8">
          Construído por quem <span className="tic">vive</span> o problema.
        </h1>
        <p className="text-slate-300 text-[19px] lg:text-[22px] max-w-3xl leading-[1.5]">
          Klimar é a ferramenta de gestão que a gente queria pra própria empresa de
          manutenção — e não encontrou. Então construímos.
        </p>
      </div>
    </section>
  );
}

export function MissionSection() {
  return (
    <section className="section-pad">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="eyebrow">
              <span>nossa missão</span>
            </div>
            <h2 className="h-section text-[clamp(28px,3.5vw,40px)] mt-4">
              Tirar o técnico do <span className="tic">caderninho.</span>
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-slate-300 text-[17px] leading-[1.7]">
            <p>
              O Brasil tem 1.4 milhão de profissionais em serviços técnicos especializados.
              Eletricistas, técnicos de ar-condicionado, instaladores de refrigeração,
              manutenção predial. A grande maioria ainda gerencia o próprio negócio em
              caderno, WhatsApp e planilha.
            </p>
            <p>
              Klimar existe pra mudar isso — sem hostilizar quem está começando. Free de
              verdade, sem letra miúda, com dados que continuam sendo seus se você decidir
              sair. E quando o negócio crescer, a gente cresce junto, sem exigir um VP de
              TI pra implementar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhoWeAreSection() {
  return (
    <section className="pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="eyebrow">
              <span>quem somos</span>
            </div>
            <h2 className="h-section text-[clamp(28px,3.5vw,40px)] mt-4">
              Time pequeno. <span className="tic">Foco grande.</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="card-surface p-7 mb-5">
              <div className="flex items-center gap-5">
                <div
                  className="w-16 h-16 rounded-xl flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#00B8D4,#006C7F)" }}
                  aria-hidden="true"
                />
                <div>
                  <div className="font-display font-semibold text-[20px] tracking-tighter2">
                    IAVerde
                  </div>
                  <p className="text-slate-400 text-[14px] mt-1">
                    Startup brasileira de base tecnológica que desenvolve software, IA
                    aplicada e infraestrutura digital para resolver problemas concretos
                    com impacto mensurável. Klimar é o primeiro produto.
                  </p>
                  <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-slate-500 mt-3 flex items-center gap-3">
                    <span>rio de janeiro, br</span>
                    <span className="text-slate-700">·</span>
                    <a
                      href="https://iaverde.ia.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00B8D4] transition-colors"
                    >
                      iaverde.ia.br
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-surface p-7">
              <div className="flex items-start gap-5">
                <div
                  className="w-16 h-16 rounded-full flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#4DD0E1,#1E293B)" }}
                  aria-hidden="true"
                />
                <div>
                  <div className="font-display font-semibold text-[20px] tracking-tighter2">
                    [Fundador]{" "}
                    <span className="text-slate-500 font-normal text-[15px] italic">
                      — founder &amp; CEO
                    </span>
                  </div>
                  <p className="text-slate-400 text-[14px] mt-1.5 leading-[1.65]">
                    Engenheiro com 12 anos no setor de refrigeração. Construiu o Klimar
                    resolvendo o problema da própria empresa de manutenção — começou em
                    planilha, virou MVP, virou produto.
                  </p>
                  <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-slate-500 mt-3 flex items-center gap-3">
                    <span>rio de janeiro, br</span>
                    <span className="text-slate-700">·</span>
                    <span>IAVerde</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OriginStorySection() {
  return (
    <section className="section-pad">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="eyebrow">
              <span>como começamos</span>
            </div>
            <h2 className="h-section text-[clamp(28px,3.5vw,40px)] mt-4">
              A planilha, a dor real, <span className="tic">e o produto.</span>
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-slate-300 text-[17px] leading-[1.7]">
            <p>
              Klimar nasceu da convivência diária com técnicos, MEIs e pequenas empresas
              de manutenção que ainda controlam tudo no caderno e na planilha — e que
              perdem contrato quando o PMOC vence, a OS some no WhatsApp ou o orçamento
              não sai a tempo.
            </p>
            <p>
              O mercado brasileiro tinha duas opções: SaaS gringo cobrando em dólar com
              UX pensada pra outra realidade, ou ferramenta nacional travada em interface
              dos anos 2000 com setup pago. Nenhuma falava com a empresa pequena
              brasileira de verdade.
            </p>
            <p>
              A IAVerde decidiu construir essa terceira opção. Em vez de vender promessas,
              começamos rodando o produto na operação real — corrigindo cada atrito que o
              técnico encontrava no campo, no telhado, sob sol direto. O que está na sua
              frente agora é o resultado dessa iteração.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
