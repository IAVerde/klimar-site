import { ROADMAP } from "@/lib/roadmap";

export function RoadmapSection() {
  return (
    <section className="section-pad" id="roadmap">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <div className="eyebrow">
            <span>roadmap público</span>
          </div>
          <h2 className="h-section text-[clamp(32px,4vw,52px)] mt-4">
            O que estamos <span className="tic">construindo agora.</span>
          </h2>
          <p className="text-slate-400 text-[16px] mt-4 max-w-xl">
            Roadmap público porque a gente acredita que cliente sério merece saber o que
            está vindo. Atualizado mensalmente.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {ROADMAP.map((column) => (
            <div
              key={column.id}
              className={`card-surface p-7 road-col ${column.accentClass}`}
            >
              <h4
                className={`font-mono text-[11px] tracking-[0.16em] uppercase font-semibold ${column.textColorClass} mb-5`}
              >
                <span className="dot" />
                {column.label}
              </h4>
              <ul className="space-y-4 text-[14.5px] text-slate-200">
                {column.items.map((item) => (
                  <li key={item.title} className="leading-snug">
                    <span className="font-semibold">{item.title}</span>
                    <br />
                    <span className="text-slate-400 text-[13px]">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
