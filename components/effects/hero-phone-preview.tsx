import { ChevronLeft, MapPin, MoreHorizontal, Phone, Plus, ArrowRight } from "lucide-react";

/**
 * Mockup do app dentro do iPhone-frame do hero.
 * Renderizado como SSR puro pra estabilizar LCP — sem hydration mismatch.
 */
export function HeroPhonePreview() {
  return (
    <div className="phone-frame float relative z-10">
      <div className="phone-screen">
        <div className="phone-notch" aria-hidden="true" />
        <div className="absolute inset-0 px-5 pt-12 pb-3 flex flex-col">
          {/* header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="w-9 h-9 rounded-full bg-slate-800 grid place-items-center"
            >
              <ChevronLeft className="w-4 h-4 text-slate-300" />
            </button>
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate-500">
              os&nbsp;#1042
            </div>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="w-9 h-9 rounded-full bg-slate-800 grid place-items-center"
            >
              <MoreHorizontal className="w-4 h-4 text-slate-300" />
            </button>
          </div>

          {/* status badge */}
          <div
            className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-md mb-4"
            style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F59E0B" }} />
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase font-semibold">
              em andamento
            </span>
          </div>

          {/* title */}
          <div className="font-display font-bold text-[22px] tracking-tighter2 text-slate-50 leading-tight mb-1">
            Manutenção preventiva
          </div>
          <div className="text-[13px] text-slate-400 mb-4">Construtora Verdes Ltda</div>

          {/* meta */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-4 leading-snug">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Av. Paulista, 1.500 — São Paulo</span>
          </div>
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate-500 mb-4">
            3 splits · 2h est · zona sul
          </div>

          {/* progress */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[12px] text-slate-300 font-medium">Checklist</div>
              <div className="font-mono text-[11px] text-[#00B8D4]">4/12</div>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: "33%",
                  background: "linear-gradient(90deg, #00B8D4, #4DD0E1)",
                  boxShadow: "0 0 10px rgba(0,184,212,0.5)",
                }}
              />
            </div>
          </div>

          {/* client */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 mb-3 flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full"
              style={{ background: "linear-gradient(135deg,#4DD0E1,#006C7F)" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-slate-100 truncate">
                Marcos Almeida
              </div>
              <div className="text-[10.5px] text-slate-500 truncate">
                Síndico · (11) 9 8132-4488
              </div>
            </div>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-slate-800 grid place-items-center"
            >
              <Phone className="w-3.5 h-3.5 text-slate-300" />
            </button>
          </div>

          {/* photo strip */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div
              className="aspect-square rounded-md"
              style={{ background: "linear-gradient(135deg,#1E293B,#334155)" }}
            />
            <div
              className="aspect-square rounded-md"
              style={{ background: "linear-gradient(135deg,#0F172A,#1E293B)" }}
            />
            <div className="aspect-square rounded-md grid place-items-center bg-slate-800/60 border border-dashed border-slate-700">
              <Plus className="w-4 h-4 text-slate-500" />
            </div>
          </div>

          <div className="mt-auto">
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold"
              style={{
                background: "var(--klimar-cyan)",
                color: "#021018",
                boxShadow: "0 0 30px rgba(0,184,212,0.45)",
              }}
            >
              Finalizar atendimento <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
