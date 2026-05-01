import { CheckCircle2, Circle, FileText, Send, TrendingUp } from "lucide-react";

export function FeatureBento() {
  return (
    <section id="features" className="section-pad relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="eyebrow">
            <span>recursos que viram contrato</span>
          </div>
          <h2 className="h-section text-[clamp(32px,4vw,56px)] mt-5">
            Tudo o que sua empresa precisa, <span className="tic">na palma da mão.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[minmax(220px,auto)]">
          <PhotosBeforeAfterCard />
          <SignatureCard />
          <QrCodeCard />
          <DashboardKpisCard />
          <ChecklistCard />
          <WhatsappCard />
        </div>
      </div>
    </section>
  );
}

function PhotosBeforeAfterCard() {
  return (
    <div className="card-surface hover-lift md:col-span-4 md:row-span-2 p-7 lg:p-9 flex flex-col">
      <div className="eyebrow cyan mb-3">
        <span>fotos antes/depois</span>
      </div>
      <h3 className="font-display font-semibold text-[26px] tracking-tighter2 mb-3 leading-tight">
        A prova do serviço, em duas imagens.
      </h3>
      <p className="text-slate-400 text-[15px] max-w-md mb-6">
        Antes e depois de cada serviço, anexados à OS. Vai pro PDF, vai pro cliente, fica
        no histórico do equipamento.
      </p>
      <div className="flex-1 mt-auto grid grid-cols-2 gap-3 max-w-md">
        <div
          className="relative rounded-lg overflow-hidden aspect-[4/3]"
          style={{ background: "linear-gradient(135deg,#1E293B 0%,#334155 100%)" }}
        >
          <div className="absolute inset-0 grid grid-rows-3 gap-1 p-3 opacity-30">
            <div className="bg-slate-700 rounded-sm" />
            <div className="bg-slate-700 rounded-sm" />
            <div className="bg-slate-700 rounded-sm" />
          </div>
          <span className="absolute top-2 left-2 font-mono text-[9px] tracking-[0.14em] uppercase text-slate-300 bg-black/40 px-1.5 py-0.5 rounded">
            antes
          </span>
        </div>
        <div
          className="relative rounded-lg overflow-hidden aspect-[4/3]"
          style={{
            background: "linear-gradient(135deg,rgba(0,184,212,0.18),rgba(77,208,225,0.05))",
          }}
        >
          <div className="absolute inset-0 grid grid-rows-3 gap-1 p-3 opacity-30">
            <div className="rounded-sm" style={{ background: "rgba(0,184,212,0.4)" }} />
            <div className="rounded-sm" style={{ background: "rgba(0,184,212,0.4)" }} />
            <div className="rounded-sm" style={{ background: "rgba(0,184,212,0.4)" }} />
          </div>
          <span className="absolute top-2 left-2 font-mono text-[9px] tracking-[0.14em] uppercase text-[#00B8D4] bg-black/40 px-1.5 py-0.5 rounded">
            depois
          </span>
        </div>
      </div>
    </div>
  );
}

function SignatureCard() {
  return (
    <div className="card-surface hover-lift md:col-span-2 p-7 flex flex-col">
      <div className="eyebrow cyan mb-3">
        <span>assinatura digital</span>
      </div>
      <h3 className="font-display font-semibold text-[20px] tracking-tighter2 mb-2 leading-tight">
        Cliente assina na tela.
      </h3>
      <p className="text-slate-400 text-[14px] mb-5">
        Comprovação legal, sem papel, sem caneta.
      </p>
      <div className="mt-auto rounded-lg p-4 border border-slate-800 bg-slate-900/60">
        <svg viewBox="0 0 200 50" className="w-full h-12" aria-hidden="true">
          <path
            d="M5 38 Q 18 12, 32 30 T 62 26 Q 76 8, 92 36 T 130 22 Q 146 4, 162 32 T 195 28"
            stroke="#00B8D4"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-slate-500 mt-2">
          marcos almeida · 14:32
        </div>
      </div>
    </div>
  );
}

function QrCodeCard() {
  return (
    <div className="card-surface hover-lift md:col-span-2 p-7 flex flex-col">
      <div className="eyebrow cyan mb-3">
        <span>qr code de equipamento</span>
      </div>
      <h3 className="font-display font-semibold text-[20px] tracking-tighter2 mb-2 leading-tight">
        Cole no aparelho. Histórico inteiro.
      </h3>
      <p className="text-slate-400 text-[14px] mb-4">
        Escaneou, viu manutenções, peças, técnico responsável.
      </p>
      <div className="mt-auto self-end">
        <div className="w-16 h-16 rounded-md p-1.5 bg-white">
          <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-px">
            <div className="col-span-2 row-span-2 bg-slate-900 rounded-sm" />
            <div className="bg-slate-900" />
            <div />
            <div className="bg-slate-900" />
            <div className="bg-slate-900" />
            <div className="bg-slate-900" />
            <div />
            <div className="bg-slate-900" />
            <div className="bg-slate-900" />
            <div className="col-start-5 col-span-2 row-span-2 bg-slate-900 rounded-sm" />
            <div />
            <div className="bg-slate-900" />
            <div />
            <div className="bg-slate-900" />
            <div className="bg-slate-900" />
            <div />
            <div className="bg-slate-900" />
            <div />
            <div className="bg-slate-900" />
            <div className="bg-slate-900" />
            <div />
            <div className="bg-slate-900" />
            <div className="bg-slate-900" />
            <div />
            <div className="bg-slate-900" />
            <div />
            <div className="row-start-5 col-span-2 row-span-2 bg-slate-900 rounded-sm" />
            <div className="bg-slate-900" />
            <div />
            <div className="bg-slate-900" />
            <div className="bg-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardKpisCard() {
  return (
    <div className="card-surface hover-lift md:col-span-4 p-7 lg:p-8 flex flex-col">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div className="eyebrow cyan mb-3">
            <span>dashboard kpis</span>
          </div>
          <h3 className="font-display font-semibold text-[22px] tracking-tighter2 mb-2 leading-tight">
            Receita, OS abertas, conclusão. Em tempo real.
          </h3>
          <p className="text-slate-400 text-[14px] max-w-sm">
            A foto do mês na primeira tela depois do login.
          </p>
        </div>
        <div className="flex items-end gap-6 flex-shrink-0">
          <div>
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate-500">
              receita · maio
            </div>
            <div className="font-display font-bold text-[26px] tracking-tighter2 text-slate-100 leading-none mt-1">
              R$&nbsp;48.320
            </div>
            <div className="text-[12px] text-emerald-400 mt-1.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18%
            </div>
          </div>
          <svg viewBox="0 0 140 56" className="w-[140px] h-14" aria-hidden="true">
            <defs>
              <linearGradient id="sparkfill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#00B8D4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00B8D4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 42 L18 38 L36 30 L54 34 L72 22 L90 26 L108 14 L126 18 L140 8 L140 56 L0 56 Z"
              fill="url(#sparkfill)"
            />
            <path
              d="M0 42 L18 38 L36 30 L54 34 L72 22 L90 26 L108 14 L126 18 L140 8"
              stroke="#00B8D4"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChecklistCard() {
  const items = [
    { label: "Inspeção do filtro", done: true },
    { label: "Limpeza serpentina", done: true },
    { label: "Teste de pressão", done: false },
    { label: "Recarga de gás", done: false },
  ];
  return (
    <div className="card-surface hover-lift md:col-span-2 p-7 flex flex-col">
      <div className="eyebrow cyan mb-3">
        <span>checklist por serviço</span>
      </div>
      <h3 className="font-display font-semibold text-[20px] tracking-tighter2 mb-2 leading-tight">
        Padroniza o trabalho.
      </h3>
      <p className="text-slate-400 text-[14px] mb-4">
        Cada tipo de serviço, seu próprio checklist.
      </p>
      <div className="mt-auto space-y-1.5 text-[12.5px]">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2">
            {it.done ? (
              <CheckCircle2 className="w-4 h-4 text-[#00B8D4]" />
            ) : (
              <Circle className="w-4 h-4 text-slate-600" />
            )}
            <span className={it.done ? "text-slate-300" : "text-slate-500"}>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatsappCard() {
  return (
    <div className="card-surface hover-lift md:col-span-4 p-7 lg:p-8 flex flex-col">
      <div className="eyebrow cyan mb-3">
        <span>whatsapp direto</span>
      </div>
      <h3 className="font-display font-semibold text-[22px] tracking-tighter2 mb-2 leading-tight">
        Orçamento PDF pro cliente em <span className="tic">3 cliques</span>.
      </h3>
      <p className="text-slate-400 text-[14px] max-w-md mb-5">
        Sua marca, número de protocolo, condições — direto no WhatsApp do cliente.
      </p>
      <div className="mt-auto flex items-center gap-3 max-w-md">
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 flex-1">
          <FileText className="w-5 h-5 text-[#00B8D4]" />
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] text-slate-100 font-medium truncate">
              Orçamento_OS-1042.pdf
            </div>
            <div className="font-mono text-[10px] text-slate-500 mt-0.5">
              312 KB · pronto
            </div>
          </div>
        </div>
        <div
          className="w-11 h-11 rounded-xl grid place-items-center flex-shrink-0"
          style={{ background: "#16A34A" }}
          aria-hidden="true"
        >
          <Send className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}
