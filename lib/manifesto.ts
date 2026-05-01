export interface ManifestoPrinciple {
  title: string;
  description: string;
}

export const MANIFESTO_PRINCIPLES: ManifestoPrinciple[] = [
  {
    title: "grátis deve ser grátis",
    description:
      'Sem letra miúda, sem ads invasivos, sem deixar feature crítica como "premium" pra forçar upgrade. Free serve negócio real.',
  },
  {
    title: "dados são seus",
    description:
      "Exporte tudo, qualquer hora, em CSV e PDF. Inclusive no Free. Sem reféns.",
  },
  {
    title: "feito no brasil",
    description:
      "LGPD nativa, suporte em português pelo time que escreveu o código, NF-e brasileira, datacenter no Brasil.",
  },
  {
    title: "técnico em campo é prioridade",
    description:
      "Pensado pra usar com luva, no telhado, no sol, com 4G ruim. Offline-first. Não é dashboard de gerente — é ferramenta de campo.",
  },
  {
    title: "transparência no preço",
    description:
      'Sem demo obrigatória, sem "fale com vendas" em 90% dos planos, sem upgrade surpresa na fatura.',
  },
  {
    title: "construímos com clientes, não pra eles",
    description:
      "Toda feature crítica passou por uso real em uma empresa de manutenção antes de virar release. Sem suposição.",
  },
];
