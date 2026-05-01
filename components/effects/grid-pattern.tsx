import { cn } from "@/lib/utils";

export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("grid-pattern absolute inset-0 pointer-events-none", className)}
    />
  );
}
