"use client";

import Link from "next/link";

import { trackEvent } from "@/components/analytics/posthog-provider";
import { AnalyticsEvent } from "@/lib/analytics-events";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  href: string;
  label: string;
  location: string;
  size?: "default" | "lg" | "xl";
  variant?: "primary" | "ghost" | "secondary";
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

export function CtaButton({
  href,
  label,
  location,
  size = "default",
  variant = "primary",
  className,
  children,
  external,
}: CtaButtonProps) {
  const baseClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "ghost"
        ? "btn-ghost"
        : "btn-secondary";
  const sizeClass = variant === "primary" && size !== "default" ? size : "";

  const onClick = () => {
    trackEvent(AnalyticsEvent.ctaClicked, { location, label, variant });
  };

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(baseClass, sizeClass, className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={cn(baseClass, sizeClass, className)}>
      {children}
    </Link>
  );
}
