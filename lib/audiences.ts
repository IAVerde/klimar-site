export type Audience = "solo" | "company";

export const AUDIENCES: Record<
  Audience,
  { label: string; caption: string; recommendedPlan: "free" | "pro" | "business" }
> = {
  solo: {
    label: "Autônomo / MEI",
    caption: "destaca: free · 1 técnico · 20 os/mês · sem branding",
    recommendedPlan: "free",
  },
  company: {
    label: "Empresa estabelecida",
    caption: "destaca: pro · até 3 técnicos · branding · dashboard",
    recommendedPlan: "pro",
  },
};
