import { GradientOrbs } from "@/components/effects/gradient-orbs";
import { GridPattern } from "@/components/effects/grid-pattern";

export function PricingHero() {
  return (
    <section className="relative pt-[112px] pb-12 overflow-hidden">
      <GradientOrbs variant="single" />
      <GridPattern />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="eyebrow justify-center inline-flex">
          <span>preços</span>
        </div>
        <h1 className="h-display text-[clamp(48px,7vw,84px)] mt-5 mb-6">
          Preços simples, <span className="tic">transparentes.</span>
        </h1>
        <p className="text-slate-300 text-[18px] lg:text-[20px] max-w-2xl mx-auto mb-12">
          Comece grátis. Pague apenas quando crescer. Cancela quando quiser.
        </p>
      </div>
    </section>
  );
}
