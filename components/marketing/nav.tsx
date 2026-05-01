"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { KlimarLogo } from "@/components/icons/klimar-logo";
import { trackEvent } from "@/components/analytics/posthog-provider";
import { AnalyticsEvent } from "@/lib/analytics-events";
import { SITE } from "@/lib/site";

const NAV_LINKS = [
  { href: "/#features", label: "Recursos" },
  { href: "/precos", label: "Preços" },
  { href: "/sobre", label: "Sobre" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <>
      <nav className="nav-blur fixed top-0 inset-x-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <Link href="/" aria-label="Klimar — Início" className="flex items-center gap-2.5">
            <KlimarLogo />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[14.5px] text-slate-300">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SITE.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(AnalyticsEvent.appLoginClicked, { location: "nav" })}
              className="hidden sm:inline-flex btn-ghost"
              style={{ padding: "10px 18px", fontSize: 14 }}
            >
              Entrar
            </a>
            <Link
              href="/#cta"
              onClick={() =>
                trackEvent(AnalyticsEvent.ctaClicked, { location: "nav", label: "Começar grátis" })
              }
              className="btn-primary"
              style={{ padding: "10px 18px", fontSize: 14 }}
            >
              Começar grátis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              className="md:hidden p-2 text-slate-200"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-[100] md:hidden flex flex-col p-6"
          style={{ background: "rgba(2,6,23,0.95)", backdropFilter: "blur(20px)" }}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between mb-12">
            <KlimarLogo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-1 text-2xl font-display font-semibold tracking-tighter3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-4 border-b border-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href={SITE.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost justify-center"
              onClick={() => setOpen(false)}
            >
              Entrar
            </a>
            <Link
              href="/#cta"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center"
            >
              Começar grátis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
