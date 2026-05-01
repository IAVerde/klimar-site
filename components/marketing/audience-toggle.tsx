"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/components/analytics/posthog-provider";
import { AnalyticsEvent } from "@/lib/analytics-events";
import { AUDIENCES, type Audience } from "@/lib/audiences";

export function AudienceToggle() {
  const [audience, setAudience] = useState<Audience>("solo");
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({
    left: 4,
    width: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<Audience, HTMLButtonElement | null>>({
    solo: null,
    company: null,
  });

  const placePill = (target: HTMLButtonElement, container: HTMLDivElement) => {
    const r = target.getBoundingClientRect();
    const pr = container.getBoundingClientRect();
    setPillStyle({ left: r.left - pr.left, width: r.width });
  };

  useEffect(() => {
    const target = buttonRefs.current[audience];
    const container = containerRef.current;
    if (!target || !container) return;
    const id = requestAnimationFrame(() => placePill(target, container));
    return () => cancelAnimationFrame(id);
  }, [audience]);

  useEffect(() => {
    const onResize = () => {
      const target = buttonRefs.current[audience];
      const container = containerRef.current;
      if (target && container) placePill(target, container);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [audience]);

  const handleSwitch = (next: Audience) => {
    if (next === audience) return;
    setAudience(next);
    trackEvent(AnalyticsEvent.audienceToggled, { audience: next });
  };

  return (
    <section className="relative pt-2 pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center gap-4">
        <div className="eyebrow">
          <span>quem usa klimar</span>
        </div>
        <div ref={containerRef} className="seg" role="tablist" aria-label="Tipo de público">
          <span
            className="seg-pill"
            style={{ left: pillStyle.left, width: pillStyle.width }}
            aria-hidden="true"
          />
          {(Object.keys(AUDIENCES) as Audience[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={audience === key}
              ref={(el) => {
                buttonRefs.current[key] = el;
              }}
              onClick={() => handleSwitch(key)}
              className={audience === key ? "active" : ""}
            >
              {AUDIENCES[key].label}
            </button>
          ))}
        </div>
        <p
          className="font-mono text-[11px] tracking-[0.16em] uppercase text-slate-500 text-center max-w-2xl"
          aria-live="polite"
        >
          {AUDIENCES[audience].caption}
        </p>
      </div>
    </section>
  );
}
