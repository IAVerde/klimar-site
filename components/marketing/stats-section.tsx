import { KPI_STATS } from "@/lib/stats";

export function StatsSection() {
  return (
    <section className="section-pad relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="eyebrow justify-center inline-flex">
            <span>por que klimar</span>
          </div>
          <h2 className="h-section text-[clamp(32px,4vw,52px)] mt-5 max-w-3xl mx-auto">
            Resultado em números, não em <span className="tic">promessas.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 lg:divide-x divide-slate-800">
          {KPI_STATS.map((stat) => (
            <div key={stat.value} className="text-center px-6">
              <div
                className="kpi-num"
                dangerouslySetInnerHTML={{ __html: stat.value.replace(/ /g, "&nbsp;") }}
              />
              <p className="text-slate-400 text-[14px] mt-3 max-w-[180px] mx-auto leading-snug">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
