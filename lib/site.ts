export const SITE = {
  name: "Klimar",
  legalName: "IAVerde",
  trademark: "Klimar™",
  domain: "useklimar.com.br",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://useklimar.com.br",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.useklimar.com.br",
  email: "contato@useklimar.com.br",
  parentEmail: "contato@iaverde.ia.br",
  parentUrl: "https://iaverde.ia.br",
  parentLocation: { city: "Rio de Janeiro", region: "RJ", country: "BR" },
  description: "Gestão para serviços técnicos.",
} as const;
