import { cn } from "@/lib/utils";

interface KlimarLogoProps {
  className?: string;
  withWordmark?: boolean;
  withTrademark?: boolean;
}

/**
 * Logo placeholder: gradiente cyan com "k" italic. Substituir pelo SVG real
 * quando o logo definitivo for entregue.
 */
export function KlimarLogo({
  className,
  withWordmark = true,
  withTrademark = true,
}: KlimarLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="k-mark" aria-hidden="true">
        k
      </div>
      {withWordmark && (
        <div className="font-display font-bold text-[18px] tracking-tighter2 leading-none flex items-baseline gap-1">
          <span>klimar</span>
          {withTrademark && (
            <span className="font-mono text-[10px] text-slate-500 align-super">™</span>
          )}
        </div>
      )}
    </div>
  );
}
