import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-[15px] text-slate-100 placeholder:text-slate-500 transition-colors focus-visible:outline-none focus-visible:border-[#00B8D4] focus-visible:ring-1 focus-visible:ring-[#00B8D4] disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
