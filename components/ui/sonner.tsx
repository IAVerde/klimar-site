"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-slate-900 border border-slate-700 text-slate-100 rounded-xl shadow-2xl",
          description: "text-slate-400",
          actionButton: "bg-[#00B8D4] text-[#021018] font-semibold",
          cancelButton: "bg-slate-800 text-slate-300",
          success: "[&>svg]:text-[#00B8D4]",
        },
      }}
      {...props}
    />
  );
}
