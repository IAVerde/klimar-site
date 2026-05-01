# Klimar™ — useklimar.com.br

Site institucional do Klimar — SaaS de gestão para serviços técnicos (HVAC, elétrica, refrigeração, manutenção predial). Construído pela IAVerde.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 3 + shadcn/ui patterns
- Framer Motion + Lucide icons
- Supabase (auth + leads), PostHog (analytics), Resend (email)

## Setup local

```bash
cp .env.local.example .env.local
# preencha as variáveis (Supabase, PostHog, Resend)

npm install
npm run dev
```

Abra http://localhost:3000.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Dev server com Turbopack |
| `npm run build` | Build de produção |
| `npm run start` | Roda o build localmente |
| `npm run typecheck` | Type check estrito |

## Estrutura

```
app/                 Rotas (App Router): /, /precos, /sobre, /termos, /privacidade
  api/              Endpoints: /waitlist, /lead, /signup
components/
  marketing/        Seções da landing (hero, bento, faq, etc.)
  effects/          Visuais (orb, grid, phone-preview)
  forms/            Formulários (waitlist, business lead, signup)
  ui/               Primitivos (button, input, accordion)
  analytics/        PostHog provider
lib/                Dados estáticos (planos, features, faqs), clientes (supabase, resend), utils
supabase/migrations Schema das tabelas de leads
```

## Deploy

Vercel (recomendado). Configurar:

1. Domínio `useklimar.com.br` no painel Vercel
2. Env vars do `.env.local.example` no painel
3. Migration `supabase/migrations/001_marketing_tables.sql` no Supabase
4. Domínio verificado no Resend (DNS records SPF/DKIM/DMARC no registro.br)

Marca: **Klimar™** · Empresa: **IAVerde**
