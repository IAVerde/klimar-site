"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { trackEvent } from "@/components/analytics/posthog-provider";
import { AnalyticsEvent } from "@/lib/analytics-events";
import type { Faq } from "@/lib/faqs";

interface FaqSectionProps {
  eyebrow: string;
  title: React.ReactNode;
  items: Faq[];
  source: "home" | "pricing";
}

export function FaqSection({ eyebrow, title, items, source }: FaqSectionProps) {
  return (
    <section className="section-pad relative">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <div className="eyebrow">
            <span>{eyebrow}</span>
          </div>
          <h2 className="h-section text-[clamp(28px,4vw,48px)] mt-5">{title}</h2>
        </div>
        <Accordion.Root
          type="single"
          collapsible
          onValueChange={(value) => {
            if (value)
              trackEvent(AnalyticsEvent.faqOpened, { question: value, source });
          }}
        >
          {items.map((item, idx) => {
            const id = `${source}-${idx}`;
            return (
              <Accordion.Item
                key={id}
                value={item.q}
                className="border-b border-slate-700"
              >
                <Accordion.Header asChild>
                  <h3 className="m-0">
                    <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display font-semibold text-[19px] tracking-[-0.01em] text-slate-100 transition-colors data-[state=open]:text-white">
                      <span className="text-balance">{item.q}</span>
                      <ChevronDown className="w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#00B8D4]" />
                    </Accordion.Trigger>
                  </h3>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-[16px] leading-[1.65] text-slate-400 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="pb-6 pr-12">{item.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </div>
    </section>
  );
}
