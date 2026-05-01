import { MANIFESTO_PRINCIPLES } from "@/lib/manifesto";

export function ManifestoSection() {
  return (
    <section className="light-section section-pad">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="eyebrow inline-flex justify-center">
            <span>manifesto</span>
          </div>
          <h2 className="h-section text-[clamp(32px,4vw,52px)] mt-4">
            As regras que <span className="tic">não negociamos.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {MANIFESTO_PRINCIPLES.map((p) => (
            <div key={p.title}>
              <div
                className="font-mono text-[11px] tracking-[0.16em] uppercase font-semibold mb-3"
                style={{ color: "var(--klimar-cyan)" }}
              >
                {p.title}
              </div>
              <p className="text-slate-700 text-[17px] leading-[1.65]">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
