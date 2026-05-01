import { ArrowRight } from "lucide-react";

import { CtaButton } from "@/components/marketing/cta-button";
import { GridPattern } from "@/components/effects/grid-pattern";

interface FinalCtaProps {
  id?: string;
  title: React.ReactNode;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  size?: "default" | "lg";
}

export function FinalCta({
  id = "cta",
  title,
  description,
  primary,
  secondary,
  size = "default",
}: FinalCtaProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden"
      style={{ background: "#020617" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,184,212,0.18), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <GridPattern className="opacity-50" />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-32 lg:py-40 text-center">
        <h2
          className={`h-display ${
            size === "lg"
              ? "text-[clamp(40px,6vw,72px)]"
              : "text-[clamp(40px,5vw,64px)]"
          } mb-6`}
        >
          {title}
        </h2>
        <p
          className={`text-slate-400 ${
            size === "lg" ? "text-[18px] lg:text-[20px]" : "text-[18px]"
          } max-w-xl mx-auto mb-10`}
        >
          {description}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <CtaButton
            href={primary.href}
            label={primary.label}
            location={`final-cta-${id}`}
            size={size === "lg" ? "xl" : "lg"}
          >
            {primary.label} <ArrowRight className={size === "lg" ? "w-5 h-5" : "w-5 h-5"} />
          </CtaButton>
          {secondary && (
            <CtaButton
              href={secondary.href}
              label={secondary.label}
              location={`final-cta-${id}-secondary`}
              variant="ghost"
              className=""
            >
              {secondary.label}
            </CtaButton>
          )}
        </div>
      </div>
    </section>
  );
}
