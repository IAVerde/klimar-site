import { ImageIcon } from "lucide-react";

export function Testimonial() {
  return (
    <section className="section-pad relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="card-surface relative max-w-3xl mx-auto p-10 lg:p-14 overflow-hidden">
          <div
            className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,184,212,0.18), transparent 60%)",
            }}
            aria-hidden="true"
          />
          <div className="eyebrow mb-6">
            <span>founding customer</span>
          </div>
          <blockquote className="font-display italic text-[clamp(24px,3vw,32px)] tracking-tighter3 leading-[1.25] text-slate-100 mb-8">
            “[Aguardando depoimento da PHP Ar Condicionado e Elétrica — Founding Customer.]”
          </blockquote>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full"
              style={{ background: "linear-gradient(135deg,#4DD0E1,#006C7F)" }}
              aria-hidden="true"
            />
            <div>
              <div className="text-[15px] font-semibold text-slate-100">
                [Nome do contato]{" "}
                <span className="text-slate-500 font-normal">— Diretor</span>
              </div>
              <div className="text-[13px] text-slate-400 mt-0.5">
                PHP Ar Condicionado e Elétrica
              </div>
            </div>
            <div className="ml-auto hidden sm:flex items-center gap-2 px-3 py-2 rounded-md border border-dashed border-slate-700 font-mono text-[10px] tracking-[0.14em] uppercase text-slate-500">
              <ImageIcon className="w-3.5 h-3.5" /> logo php
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
