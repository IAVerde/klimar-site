import type { PlanId } from "./plans";

type Cell =
  | { type: "check" }
  | { type: "cross" }
  | { type: "warn" }
  | { type: "text"; value: string }
  | { type: "highlight"; value: string };

export interface ComparisonRow {
  label: string;
  cells: Record<PlanId, Cell>;
}

export interface ComparisonCategory {
  label: string;
  rows: ComparisonRow[];
}

export const PRICING_COMPARISON: ComparisonCategory[] = [
  {
    label: "limites",
    rows: [
      {
        label: "Usuários",
        cells: {
          free: { type: "text", value: "1" },
          pro: { type: "text", value: "3" },
          business: { type: "text", value: "Ilimitados" },
          enterprise: { type: "text", value: "Ilimitados" },
        },
      },
      {
        label: "OS por mês",
        cells: {
          free: { type: "text", value: "20" },
          pro: { type: "text", value: "Ilimitadas" },
          business: { type: "text", value: "Ilimitadas" },
          enterprise: { type: "text", value: "Ilimitadas" },
        },
      },
      {
        label: "Clientes cadastrados",
        cells: {
          free: { type: "text", value: "100" },
          pro: { type: "text", value: "Ilimitados" },
          business: { type: "text", value: "Ilimitados" },
          enterprise: { type: "text", value: "Ilimitados" },
        },
      },
      {
        label: "Armazenamento de fotos",
        cells: {
          free: { type: "text", value: "2 GB" },
          pro: { type: "text", value: "25 GB" },
          business: { type: "text", value: "200 GB" },
          enterprise: { type: "text", value: "Sob medida" },
        },
      },
    ],
  },
  {
    label: "recursos básicos",
    rows: [
      {
        label: "App mobile (iOS / Android)",
        cells: {
          free: { type: "check" },
          pro: { type: "check" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "Fotos antes/depois",
        cells: {
          free: { type: "check" },
          pro: { type: "check" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "Assinatura digital",
        cells: {
          free: { type: "check" },
          pro: { type: "check" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "QR code de equipamento",
        cells: {
          free: { type: "check" },
          pro: { type: "check" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "Checklist por serviço",
        cells: {
          free: { type: "check" },
          pro: { type: "check" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
    ],
  },
  {
    label: "recursos pro",
    rows: [
      {
        label: "Logo + cor próprios",
        cells: {
          free: { type: "cross" },
          pro: { type: "check" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "Dashboard de KPIs",
        cells: {
          free: { type: "cross" },
          pro: { type: "check" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "PDF de orçamento + WhatsApp",
        cells: {
          free: { type: "cross" },
          pro: { type: "check" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "Histórico por equipamento",
        cells: {
          free: { type: "text", value: "Limitado" },
          pro: { type: "check" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
    ],
  },
  {
    label: "recursos business",
    rows: [
      {
        label: "PMOC nativo",
        cells: {
          free: { type: "cross" },
          pro: { type: "cross" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "Roteirização inteligente",
        cells: {
          free: { type: "cross" },
          pro: { type: "cross" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "NPS pós-atendimento",
        cells: {
          free: { type: "cross" },
          pro: { type: "cross" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "API + Webhooks",
        cells: {
          free: { type: "cross" },
          pro: { type: "cross" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "SSO / SAML",
        cells: {
          free: { type: "cross" },
          pro: { type: "cross" },
          business: { type: "cross" },
          enterprise: { type: "check" },
        },
      },
    ],
  },
  {
    label: "suporte",
    rows: [
      {
        label: "Suporte por e-mail",
        cells: {
          free: { type: "check" },
          pro: { type: "check" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "Chat em horário comercial",
        cells: {
          free: { type: "cross" },
          pro: { type: "check" },
          business: { type: "check" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "CSM dedicado",
        cells: {
          free: { type: "cross" },
          pro: { type: "cross" },
          business: { type: "cross" },
          enterprise: { type: "check" },
        },
      },
      {
        label: "SLA contratual",
        cells: {
          free: { type: "cross" },
          pro: { type: "cross" },
          business: { type: "text", value: "99.5%" },
          enterprise: { type: "text", value: "99.95%" },
        },
      },
    ],
  },
];

export type CompetitorId = "klimar" | "auvo" | "field-control" | "excel";

interface TeaserCell {
  type: "check" | "cross" | "warn" | "text" | "highlight" | "dash";
  value?: string;
  badge?: string;
}

export interface TeaserRow {
  label: string;
  cells: Record<CompetitorId, TeaserCell>;
}

export const HOME_COMPARISON: TeaserRow[] = [
  {
    label: "Plano gratuito real",
    cells: {
      klimar: { type: "check" },
      auvo: { type: "cross" },
      "field-control": { type: "cross" },
      excel: { type: "dash" },
    },
  },
  {
    label: "Setup pago",
    cells: {
      klimar: { type: "highlight", value: "R$ 0" },
      auvo: { type: "text", value: "Negociado" },
      "field-control": { type: "text", value: "R$ 299" },
      excel: { type: "dash" },
    },
  },
  {
    label: "App moderno (Flutter)",
    cells: {
      klimar: { type: "check" },
      auvo: { type: "warn" },
      "field-control": { type: "warn" },
      excel: { type: "cross" },
    },
  },
  {
    label: "PMOC nativo",
    cells: {
      klimar: { type: "check", badge: "business" },
      auvo: { type: "text", value: "Add-on" },
      "field-control": { type: "text", value: "Add-on" },
      excel: { type: "cross" },
    },
  },
  {
    label: "WhatsApp integrado",
    cells: {
      klimar: { type: "check" },
      auvo: { type: "warn" },
      "field-control": { type: "warn" },
      excel: { type: "cross" },
    },
  },
  {
    label: "Preço de entrada",
    cells: {
      klimar: { type: "highlight", value: "R$ 49/mês" },
      auvo: { type: "text", value: "R$ 134+/mês" },
      "field-control": { type: "text", value: "R$ 89+/mês" },
      excel: { type: "text", value: "“Grátis” *" },
    },
  },
];
