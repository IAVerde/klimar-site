export type PlanId = "free" | "pro" | "business" | "enterprise";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  priceUnit: string;
  pricingNote: string;
  pricingNoteYearly?: string;
  customLabel?: string;
  cta: { label: string; variant: "primary" | "ghost" | "secondary" };
  features: string[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Pra autônomos.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    priceUnit: "/mês",
    pricingNote: "para sempre",
    cta: { label: "Começar grátis", variant: "ghost" },
    features: [
      "1 usuário",
      "20 OS / mês",
      "Fotos antes/depois",
      "Assinatura digital",
      "Exportação CSV / PDF",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Pra empresas pequenas.",
    monthlyPrice: 49,
    yearlyPrice: 39,
    priceUnit: "/mês",
    pricingNote: "cobrança mensal",
    pricingNoteYearly: "cobrado anualmente · economiza 20%",
    cta: { label: "Testar 14 dias grátis", variant: "primary" },
    popular: true,
    features: [
      "OS ilimitadas",
      "Até 3 usuários",
      "Branding próprio",
      "Dashboard de KPIs",
      "WhatsApp + PDF",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "Pra operação multi-técnico.",
    monthlyPrice: 119,
    yearlyPrice: 95,
    priceUnit: "/usuário/mês",
    pricingNote: "mín. 3 usuários",
    cta: { label: "Falar com vendas", variant: "secondary" },
    features: [
      "Tudo do Pro",
      "PMOC nativo",
      "Roteirização inteligente",
      "NPS pós-atendimento",
      "API & integrações",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Pra grandes operações.",
    monthlyPrice: null,
    yearlyPrice: null,
    priceUnit: "",
    pricingNote: "contrato anual",
    customLabel: "Sob medida",
    cta: { label: "Solicitar proposta", variant: "secondary" },
    features: [
      "SSO / SAML",
      "SLA dedicado",
      "CSM dedicado",
      "Onboarding presencial",
      "Hospedagem dedicada",
    ],
  },
];

export const PLAN_TEASERS: Plan[] = PLANS.filter((p) =>
  ["free", "pro", "business"].includes(p.id),
).map((p) =>
  p.id === "free"
    ? { ...p, tagline: "Para começar e ficar." }
    : p.id === "pro"
      ? { ...p, tagline: "Quando o negócio cresce." }
      : { ...p, tagline: "Operação multi-técnico séria." },
);
