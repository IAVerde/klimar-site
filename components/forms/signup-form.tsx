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
import { signupSchema, type SignupInput } from "@/lib/schemas";

interface SignupFormProps {
  audience?: "solo" | "company";
}

export function SignupForm({ audience }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { audience },
  });

  const onSubmit = async (values: SignupInput) => {
    trackEvent(AnalyticsEvent.signupStarted, { audience });
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Erro ao criar conta.");

      trackEvent(AnalyticsEvent.signupCompleted, { audience });

      if (data.requiresConfirmation) {
        toast.success("Confira seu email", {
          description: "Mandamos um link pra confirmar e ativar sua conta.",
        });
      } else {
        toast.success("Conta criada!", { description: "Indo para o painel..." });
      }
      reset({ audience });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro inesperado";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="seu@email.com.br"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="signup-password">Senha</Label>
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          placeholder="mínimo 8 caracteres"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full justify-center">
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Criando conta…
          </>
        ) : (
          <>
            Criar conta grátis <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate-500 text-center">
        sem cartão · grátis pra sempre
      </p>
    </form>
  );
}
