export interface RoadmapItem {
  title: string;
  description: string;
}

export interface RoadmapColumn {
  id: "now" | "soon" | "future";
  label: string;
  accentClass: string;
  textColorClass: string;
  items: RoadmapItem[];
}

export const ROADMAP: RoadmapColumn[] = [
  {
    id: "now",
    label: "agora · q2 2026",
    accentClass: "road-now",
    textColorClass: "text-emerald-400",
    items: [
      {
        title: "PMOC nativo",
        description: "geração automática conforme Lei 13.589/2018",
      },
      {
        title: "App offline-first v2",
        description: "sincronização incremental + conflict resolution",
      },
      {
        title: "Dashboard NPS",
        description: "pesquisa pós-OS por WhatsApp",
      },
    ],
  },
  {
    id: "soon",
    label: "em breve · q3 2026",
    accentClass: "road-soon",
    textColorClass: "text-[#00B8D4]",
    items: [
      {
        title: "Roteirização inteligente",
        description: "otimização de rota multi-técnico",
      },
      {
        title: "API pública",
        description: "REST + webhooks para integrações",
      },
      {
        title: "Cobrança recorrente",
        description: "contratos de manutenção preventiva",
      },
    ],
  },
  {
    id: "future",
    label: "futuro · 2027+",
    accentClass: "road-future",
    textColorClass: "text-slate-400",
    items: [
      {
        title: "Marketplace de técnicos",
        description: "demanda extra → técnicos certificados",
      },
      {
        title: "Estoque + ordem de compra",
        description: "peças de reposição integradas",
      },
      {
        title: "IA de diagnóstico",
        description: "assistente para o técnico em campo",
      },
    ],
  },
];
