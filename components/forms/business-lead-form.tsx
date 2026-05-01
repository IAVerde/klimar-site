"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { trackEvent } from "@/components/analytics/posthog-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnalyticsEvent } from "@/lib/analytics-events";
import { businessLeadSchema, type BusinessLeadInput } from "@/lib/schemas";
import { readUtmFromUrl } from "@/lib/utm";

interface BusinessLeadFormProps {
  source?: string;
}

export function BusinessLeadForm({ source = "pricing" }: BusinessLeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BusinessLeadInput>({
    resolver: zodResolver(businessLeadSchema),
    defaultValues: { source },
  });

  const onSubmit = async (values: BusinessLeadInput) => {
    const utm = readUtmFromUrl();
    const payload = { ...values, ...utm };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Erro ao enviar.");

      trackEvent(AnalyticsEvent.businessLeadSubmitted, { source, company: values.company });
      toast.success("Recebemos sua mensagem.", {
        description: "Vamos retornar em até 1 dia útil.",
      });
      reset({ source });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro inesperado";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field id="lead-name" label="Nome" error={errors.name?.message}>
          <Input
            id="lead-name"
            autoComplete="name"
            placeholder="Maria Silva"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field id="lead-email" label="Email" error={errors.email?.message}>
          <Input
            id="lead-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="maria@empresa.com.br"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field id="lead-phone" label="Telefone (WhatsApp)" error={errors.phone?.message}>
          <Input
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            placeholder="(11) 98765-4321"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
        <Field id="lead-company" label="Empresa" error={errors.company?.message}>
          <Input
            id="lead-company"
            autoComplete="organization"
            placeholder="Ar Condicionado Brasil Ltda"
            aria-invalid={!!errors.company}
            {...register("company")}
          />
        </Field>
      </div>
      <Field
        id="lead-num-technicians"
        label="Número de técnicos (estimativa)"
        error={errors.num_technicians?.message}
      >
        <Input
          id="lead-num-technicians"
          type="number"
          inputMode="numeric"
          min={1}
          max={2000}
          placeholder="3"
          aria-invalid={!!errors.num_technicians}
          {...register("num_technicians", { valueAsNumber: true })}
        />
      </Field>
      <Field
        id="lead-message"
        label="Sobre a operação (opcional)"
        error={errors.message?.message}
      >
        <Textarea
          id="lead-message"
          rows={4}
          placeholder="Quantas OS por mês, principais dores, prazos..."
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Enviando…
          </>
        ) : (
          <>
            Enviar mensagem <Send className="w-4 h-4" />
          </>
        )}
      </Button>
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate-500">
        Resposta em até 1 dia útil · não compartilhamos seus dados
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
