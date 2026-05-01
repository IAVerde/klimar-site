import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GradientOrbs } from "@/components/effects/gradient-orbs";
import { GridPattern } from "@/components/effects/grid-pattern";
import { HeroPhonePreview } from "@/components/effects/hero-phone-preview";
import { CtaButton } from "@/components/marketing/cta-button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[72px]">
      <GridPattern />
      <GradientOrbs />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-24 lg:pb-32 grid lg:grid-cols-12 gap-12 items-center min-h-[calc(90vh-72px)]">
        <div className="lg:col-span-7 relative z-10">
          <div className="eyebrow mb-7">
            <span>klimar™</span>
            <span className="dot">·</span>
            <span>gestão para serviços técnicos</span>
          </div>
          <h1 className="h-display text-[clamp(44px,7vw,92px)] mb-7">
            A <span className="tic">agenda</span> do seu técnico,
            <br className="hidden sm:inline" /> resolvida.
          </h1>
          <p className="text-[18px] lg:text-[19px] text-slate-300 max-w-[560px] mb-10 leading-[1.55]">
            OS digital, fotos antes/depois, assinatura no app, PDF de orçamento direto pro
            WhatsApp. Para autônomos, MEIs e empresas de ar-condicionado, elétrica e
            manutenção predial.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <CtaButton size="lg" location="hero" label="Começar grátis" href="/#cta">
              Começar grátis <ArrowRight className="w-[18px] h-[18px]" />
            </CtaButton>
            <Link
              href="/precos"
              className="btn-ghost"
              style={{ padding: "16px 26px" }}
            >
              Ver planos
            </Link>
          </div>
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span>grátis para sempre</span>
            <span className="text-slate-700">·</span>
            <span>sem cartão</span>
            <span className="text-slate-700">·</span>
            <span>lgpd compliant</span>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <div
            className="absolute inset-0 -m-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(0,184,212,0.25), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <HeroPhonePreview />
        </div>
      </div>
    </section>
  );
}
