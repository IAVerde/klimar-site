"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { trackEvent } from "@/components/analytics/posthog-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnalyticsEvent } from "@/lib/analytics-events";
import { waitlistSchema, type WaitlistInput } from "@/lib/schemas";
import { readUtmFromUrl } from "@/lib/utm";

interface WaitlistFormProps {
  source?: string;
  audience?: "solo" | "company";
  className?: string;
}

export function WaitlistForm({ source = "landing", audience, className }: WaitlistFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { source, audience },
  });

  const onSubmit = async (values: WaitlistInput) => {
    const utm = readUtmFromUrl();
    const payload = { ...values, ...utm };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error ?? "Erro ao enviar.");
      }

      trackEvent(AnalyticsEvent.waitlistSubmitted, { source, audience });

      toast.success(
        data.alreadyRegistered ? "Já estava na lista — em breve te chamamos." : "Você está na lista!",
        { description: "Mandamos um email de confirmação." },
      );
      reset({ email: "", source, audience });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro inesperado";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={className}
      noValidate
      aria-busy={isSubmitting}
    >
      <div className="flex flex-col sm:flex-row gap-3 items-start">
        <div className="flex-1 w-full">
          <Label htmlFor="waitlist-email" className="sr-only">
            Email
          </Label>
          <Input
            id="waitlist-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="seu@email.com.br"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "waitlist-email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="waitlist-email-error"
              className="font-mono text-[11px] tracking-[0.12em] uppercase text-red-400 mt-2"
            >
              {errors.email.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting || isSubmitSuccessful}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Enviando…
            </>
          ) : (
            <>
              Entrar na lista <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
