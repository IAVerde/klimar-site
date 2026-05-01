import { cn } from "@/lib/utils";

interface GradientOrbsProps {
  variant?: "hero" | "subtle" | "single";
  className?: string;
}

export function GradientOrbs({ variant = "hero", className }: GradientOrbsProps) {
  if (variant === "single") {
    return (
      <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
        <div className="orb orb-1" style={{ opacity: 0.12 }} />
      </div>
    );
  }

  if (variant === "subtle") {
    return (
      <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
        <div className="orb orb-1" style={{ opacity: 0.14 }} />
        <div className="orb orb-2" style={{ opacity: 0.16 }} />
      </div>
    );
  }

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
  );
}
