export interface Faq {
  q: string;
  a: string;
}

export const HOME_FAQS: Faq[] = [
  {
    q: "Posso usar de graça pra sempre?",
    a: "Sim. O plano Free é gratuito para sempre, sem cartão e sem letra miúda. Inclui 1 usuário, 20 OS por mês, fotos antes/depois e assinatura digital. Quando precisar de mais, você decide.",
  },
  {
    q: "Quando preciso pagar?",
    a: "Quando bater o limite de OS no Free, ou quando quiser branding próprio, dashboard avançado e usuários extras. O Pro é R$ 49/mês — abaixo do que custa um almoço de equipe.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim, no painel, em dois cliques, sem ligar pra ninguém. Você fica com seus dados — exporta tudo em CSV/PDF antes de sair.",
  },
  {
    q: "Meus dados são meus?",
    a: "São. Klimar é LGPD compliant via iubenda, hospedado no Brasil, e exportação completa em qualquer plano — incluindo o Free. A gente não vende, não compartilha, não treina IA com os seus dados.",
  },
  {
    q: "Funciona no celular do meu técnico?",
    a: "App Flutter nativo, Android e iOS. Funciona offline — sincroniza quando volta o sinal. Pensado pra usar com luva, no telhado, no sol direto.",
  },
  {
    q: "Como sei se Klimar serve pra minha empresa?",
    a: "Se você é autônomo, MEI ou empresa de até 50 técnicos em HVAC, elétrica, refrigeração ou manutenção predial — Klimar serve. Crie a conta Free, importe um cliente, faça uma OS de teste. Você sabe em 10 minutos.",
  },
];

export const PRICING_FAQS: Faq[] = [
  {
    q: "A cobrança anual realmente economiza 20%?",
    a: "Sim. No Pro, o anual sai a R$ 39/mês cobrado uma vez ao ano (R$ 468/ano), versus R$ 49/mês no mensal (R$ 588/ano). Você economiza R$ 120/ano por usuário.",
  },
  {
    q: "Posso mudar de plano a qualquer momento?",
    a: "Sim, a qualquer momento. Upgrades são imediatos com cobrança proporcional. Downgrades entram em vigor no próximo ciclo.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Cartão de crédito (todas as bandeiras), boleto bancário (somente anual) e Pix recorrente.",
  },
  {
    q: "Tem teste grátis do Pro?",
    a: "14 dias de Pro grátis, sem cartão. Se não quiser continuar, sua conta cai automaticamente pro Free — seus dados ficam.",
  },
  {
    q: 'Como funciona o "mín. 3 usuários" do Business?',
    a: "O Business cobra por usuário ativo, com mínimo de 3. Ou seja, R$ 357/mês cobre até 3 técnicos; o 4º técnico adiciona R$ 119.",
  },
  {
    q: "Existe taxa de setup ou implantação?",
    a: "R$ 0 em todos os planos exceto Enterprise (que inclui onboarding presencial). Você cria a conta e começa.",
  },
  {
    q: "E se eu cancelar — perco meus dados?",
    a: "Não. Você mantém acesso ao plano Free indefinidamente. Pode também exportar tudo (CSV / PDF) antes de cancelar definitivamente.",
  },
  {
    q: "Vocês emitem nota fiscal?",
    a: "NFS-e emitida automaticamente todo mês, em PDF e XML, no painel.",
  },
];
