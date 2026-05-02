export interface TeamMember {
  name: string;
  role: string;
  roleLabel: string;
  bio?: string;
  avatarGradient: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Everton Fernandes",
    role: "founder",
    roleLabel: "Founder & CEO",
    bio: "EFundador e CEO. Responsável por arquitetura técnica, IA aplicada e relacionamento institucional.",
    avatarGradient: "linear-gradient(135deg,#00B8D4,#006C7F)",
  },
  {
    name: "Yuri Fernandes",
    role: "cfo",
    roleLabel: "CFO",
    bio: "Responsável pelo financeiro, controles internos e relacionamento bancário da IAVerde.",
    avatarGradient: "linear-gradient(135deg,#4DD0E1,#1E293B)",
  },
  {
    name: "Michael Vitor",
    role: "investor",
    roleLabel: "Sócio investidor",
    bio: "Aporte semente da IAVerde. Atua no conselho da empresa.",
    avatarGradient: "linear-gradient(135deg,#16A34A,#0F172A)",
  },
  {
    name: "Fernando Barbosa",
    role: "vesting",
    roleLabel: "Sócio em vesting",
    bio: "Colaborador estratégico participando do quadro societário via vesting plurianual.",
    avatarGradient: "linear-gradient(135deg,#F59E0B,#1E293B)",
  },
];
