import { ArrowRight, FileText, MessageCircle } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="section-pad relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="eyebrow">
            <span>em 3 passos</span>
          </div>
          <h2 className="h-section text-[clamp(32px,4vw,52px)] mt-5">
            Da agenda ao orçamento, <span className="tic">sem fricção.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          <Step
            number="01"
            title="Cadastra cliente e equipamento"
            description="Em segundos, com QR code automático para o equipamento."
            illustration={
              <div className="h-32 mb-6 flex items-end gap-3">
                <div className="w-12 h-20 rounded-md bg-slate-800 border border-slate-700" />
                <div
                  className="w-12 h-28 rounded-md"
                  style={{
                    background:
                      "linear-gradient(180deg,rgba(0,184,212,0.25),rgba(0,184,212,0.05))",
                    border: "1px solid rgba(0,184,212,0.3)",
                  }}
                >
                  <div
                    className="w-full h-1.5 mt-3 mx-auto"
                    style={{ background: "rgba(0,184,212,0.6)" }}
                  />
                </div>
                <div className="w-12 h-16 rounded-md bg-slate-800 border border-slate-700" />
              </div>
            }
          />
          <Step
            number="02"
            title="Técnico atende com app"
            description="Fotos, checklist, assinatura — tudo no celular."
            illustration={
              <div className="h-32 mb-6 relative">
                <div className="absolute left-0 top-0 w-20 h-32 rounded-xl border border-slate-700 bg-slate-800" />
                <div className="absolute left-8 top-4 w-20 h-32 rounded-xl border border-slate-700 bg-slate-800/80" />
                <div
                  className="absolute left-16 top-8 w-20 h-32 rounded-xl border"
                  style={{
                    background:
                      "linear-gradient(180deg,rgba(0,184,212,0.18),rgba(0,184,212,0.04))",
                    borderColor: "rgba(0,184,212,0.4)",
                  }}
                >
                  <div className="absolute inset-3 flex flex-col gap-2">
                    <div className="h-2 rounded" style={{ background: "rgba(0,184,212,0.7)" }} />
                    <div className="h-2 rounded bg-slate-700" />
                    <div className="h-2 rounded bg-slate-700 w-2/3" />
                  </div>
                </div>
              </div>
            }
          />
          <Step
            number="03"
            title="Orçamento direto no WhatsApp"
            description="PDF profissional com sua marca, em 3 cliques."
            illustration={
              <div className="h-32 mb-6 flex items-center justify-center gap-4">
                <div className="w-16 h-20 rounded-md bg-slate-800 border border-slate-700 grid place-items-center">
                  <FileText className="w-6 h-6 text-[#00B8D4]" />
                </div>
                <ArrowRight className="w-6 h-6 text-slate-600" />
                <div
                  className="w-12 h-12 rounded-xl grid place-items-center"
                  style={{ background: "#16A34A" }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  description,
  illustration,
}: {
  number: string;
  title: string;
  description: string;
  illustration: React.ReactNode;
}) {
  return (
    <div className="card-surface p-7 lg:p-8 relative">
      <div className="font-mono text-[11px] tracking-[0.18em] text-slate-500 absolute top-6 right-7">
        {number}
      </div>
      {illustration}
      <h3 className="font-display font-semibold text-[22px] tracking-tighter2 mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-slate-400 text-[15px]">{description}</p>
    </div>
  );
}
