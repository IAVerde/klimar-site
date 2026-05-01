# PROMPT — Implementar useklimar.com.br a partir do design

> **Quando rodar:** quando você tiver o ZIP do design do site dentro de `docs/Klimar+Site.zip` (ou pasta `docs/klimar-site/` extraída) no novo repositório.
>
> **Tempo estimado:** 1 sessão longa de Claude Code (4-8h). Pode dividir em 2 sessões: implementação visual primeiro, integrações backend depois.
>
> **Pré-requisitos antes de começar:**

```bash
# Cria o repo novo
mkdir klimar-site && cd klimar-site
git init

# Coloca o ZIP do design em docs/
mkdir -p docs
cp ~/Downloads/Klimar+Site.zip docs/

# Não rode npx create-next-app ainda — o prompt faz isso
```

**Tenha em mãos as variáveis de ambiente:**

- `NEXT_PUBLIC_SUPABASE_URL` — mesmo projeto do app Klimar
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — mesmo do app
- `SUPABASE_SERVICE_ROLE_KEY` — pra inserir leads via API server-side
- `NEXT_PUBLIC_POSTHOG_KEY` — chave do projeto Klimar no PostHog
- `NEXT_PUBLIC_POSTHOG_HOST` — `https://us.i.posthog.com`
- `RESEND_API_KEY` — conta Resend criada
- `LEAD_NOTIFICATION_EMAIL` — `contato@useklimar.com.br`

⚠ **Resend precisa de domínio verificado.** Antes de mandar email em produção, você precisa validar `useklimar.com.br` no Resend (adicionar DNS records SPF/DKIM/DMARC no registro.br). Em dev/preview, Resend permite mandar pra você mesmo sem validar — útil pra teste.

---

## Cole o prompt abaixo no Claude Code

````
Você vai implementar o site institucional do Klimar™ (useklimar.com.br) em Next.js 15 a partir de um design HTML/CSS estático que está no diretório `docs/`. O site é o canal de aquisição de leads pro SaaS Klimar — captura usuários do plano Free, gera leads Business, e mede tudo via PostHog.

# 0. CONTEXTO

- **Marca:** Klimar™ (registrada no INPI classes 9, 42, 35)
- **Empresa-mãe:** iaverde
- **Domínio:** useklimar.com.br
- **Produto:** SaaS de gestão para serviços técnicos (HVAC, elétrica, refrigeração, manutenção predial)
- **Modelo:** Freemium — Free (R$ 0), Pro (R$ 49/mês), Business (R$ 119/usuário/mês), Enterprise
- **Públicos:** autônomo/MEI (Free), pequena empresa 3-15 técnicos (Pro), empresa estabelecida (Business — primeiro cliente é a PHP Ar Condicionado e Elétrica)

# 1. PRIMEIRO PASSO — LER O DESIGN

Antes de começar a codar qualquer coisa:

1. Liste o conteúdo de `docs/`:
   ```bash
   ls -la docs/
   ```

2. Se houver `docs/Klimar+Site.zip` (ou similar), extraia para `docs/klimar-site-design/`:
   ```bash
   cd docs && unzip "Klimar+Site.zip" -d klimar-site-design/
   ```

3. Liste o conteúdo da pasta extraída e leia QUALQUER arquivo `README.md`, `INSTRUCTIONS.md` ou `DESIGN.md` que existir.

4. Identifique os arquivos relevantes do design:
   - `index.html` ou `Klimar+Site.html` (home)
   - `precos.html` ou similar
   - `sobre.html` ou similar
   - `styles.css` ou `style.css`
   - `components.js` ou `script.js`
   - assets em `images/`, `icons/`, `fonts/`

5. **LEIA o HTML principal por inteiro** antes de começar a portar. Identifique:
   - Estrutura semântica das seções
   - Classes CSS usadas
   - Componentes que se repetem (CTAs, eyebrows, cards)
   - Animações e interações JS
   - Fontes e imagens usadas

6. **REPORTE PRA MIM**: faça um sumário em markdown de 1-2 parágrafos descrevendo o que encontrou no design. Liste:
   - Quantas páginas existem
   - Quantas seções na home
   - Paleta de cores principal (extraia do CSS)
   - Tipografia usada
   - Componentes reutilizáveis identificados
   - Animações/JS usados

**Espere minha aprovação antes de seguir** pra etapa 2. Se tudo estiver alinhado, eu falo "segue".

# 2. SETUP DO PROJETO

Após aprovação:

```bash
npx create-next-app@latest . \
  --typescript --tailwind --app --turbopack \
  --src-dir false --import-alias "@/*" --no-eslint
```

Instale dependências adicionais:

```bash
npm install \
  framer-motion \
  lucide-react \
  @supabase/supabase-js \
  posthog-js \
  resend \
  react-hook-form \
  zod \
  @hookform/resolvers \
  sonner \
  class-variance-authority \
  clsx \
  tailwind-merge

npm install -D @types/node
```

Setup shadcn/ui:

```bash
npx shadcn@latest init
# Base color: slate
# CSS variables: yes
# Components dir: components/ui
```

Instale componentes shadcn iniciais:

```bash
npx shadcn@latest add button input card accordion badge separator dialog form label sonner
```

Configure fontes via `next/font/google` em `app/layout.tsx`:
- Space Grotesk (peso 500, 700) — display
- Inter (400, 500, 600, 700) — body
- JetBrains Mono (400, 500) — mono

# 3. ESTRUTURA DE ARQUIVOS

```
klimar-site/
├── app/
│   ├── layout.tsx              # Root layout: fonts, providers, analytics
│   ├── page.tsx                # Home (long-scroll)
│   ├── precos/page.tsx
│   ├── sobre/page.tsx
│   ├── termos/page.tsx         # Placeholder (vai virar iubenda depois)
│   ├── privacidade/page.tsx    # Placeholder
│   ├── api/
│   │   ├── waitlist/route.ts
│   │   ├── lead/route.ts
│   │   └── signup/route.ts
│   ├── globals.css             # Tailwind + CSS variables do design
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx     # OG image dinâmica
├── components/
│   ├── ui/                     # shadcn base
│   ├── marketing/              # Componentes específicos da landing
│   │   ├── nav.tsx
│   │   ├── hero.tsx
│   │   ├── audience-toggle.tsx
│   │   ├── feature-bento.tsx
│   │   ├── stats-section.tsx
│   │   ├── how-it-works.tsx
│   │   ├── comparison-table.tsx
│   │   ├── pricing-cards.tsx
│   │   ├── testimonial.tsx
│   │   ├── faq.tsx
│   │   ├── final-cta.tsx
│   │   └── footer.tsx
│   ├── effects/
│   │   ├── glow-button.tsx
│   │   ├── grid-pattern.tsx
│   │   ├── gradient-orb.tsx
│   │   └── product-preview.tsx  # Mockup do app
│   ├── icons/
│   │   └── klimar-logo.tsx
│   ├── analytics/
│   │   └── posthog-provider.tsx
│   └── forms/
│       ├── waitlist-form.tsx
│       ├── business-lead-form.tsx
│       └── signup-form.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   └── server.ts           # Server client (com service role)
│   ├── posthog.ts              # Server-side capture (opcional)
│   ├── resend.ts               # Cliente Resend
│   ├── plans.ts                # Dados estáticos dos planos
│   ├── features.ts             # Dados estáticos das features
│   ├── analytics-events.ts     # Catálogo de eventos PostHog
│   └── utils.ts                # cn() + helpers
├── docs/
│   └── klimar-site-design/     # design original como referência
├── public/
│   ├── og-image.png            # 1200x630 fallback
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── icons/
├── supabase/
│   └── migrations/
│       └── 001_marketing_tables.sql
├── .env.local.example
├── .env.local                  # NÃO commitar
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

# 4. PORTAR O DESIGN — METODOLOGIA

Pra cada página (home, /precos, /sobre):

1. Abra o HTML do design correspondente
2. Identifique as seções de cima pra baixo
3. Crie 1 componente React por seção em `components/marketing/`
4. Cada componente:
   - Use Tailwind utility classes
   - Extraia tokens de cor pro `tailwind.config.ts` ao invés de hex hardcoded
   - Tipografia via classes `font-display`, `font-sans`, `font-mono`
   - Animações com Framer Motion (`motion/react`)
   - Imagens via `next/image`
5. Componha as seções na page correspondente

**Princípio:** "reproduzir + melhorar". Reproduza fiel ao design, mas:
- Onde o design tem mock content estático → torne dinâmico (puxando de `lib/`)
- Onde tem JS imperativo → use React hooks/state
- Onde tem animação CSS → upgrade pra Framer Motion (com `prefers-reduced-motion`)
- Onde falta acessibilidade → adicione (aria-labels, focus rings, semantic HTML)

# 5. CONFIGURAR DESIGN TOKENS

No `tailwind.config.ts`, configure as cores extraídas do design (Cyan #00B8D4 e variações):

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        klimar: {
          cyan: {
            DEFAULT: "#00B8D4",
            light: "#4DD0E1",
            dark: "#006C7F",
            50: "#E0F7FA",
          },
        },
        // shadcn defaults preservados (background, foreground, primary, etc.)
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)"],
        sans: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
      },
      boxShadow: {
        "glow-cyan-sm": "0 0 32px rgba(0, 184, 212, 0.25)",
        "glow-cyan-md": "0 0 60px rgba(0, 184, 212, 0.45)",
        "glow-cyan-lg": "0 0 80px rgba(0, 184, 212, 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

Use o tema dark do shadcn como default (`<html className="dark">` no layout).

# 6. SUPABASE — TABELAS DE MARKETING

Crie a migration `supabase/migrations/001_marketing_tables.sql`:

```sql
-- ===================================================
-- Marketing leads do site useklimar.com.br
-- ===================================================

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  audience text check (audience in ('autonomo', 'empresa', 'unknown')) default 'unknown',
  source text,                      -- 'landing', 'pricing', 'about'
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  ip_address inet,
  created_at timestamptz not null default now()
);

create index on public.waitlist(email);
create index on public.waitlist(created_at desc);
create unique index on public.waitlist(email);

create table if not exists public.business_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text not null,
  num_technicians integer,
  message text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text check (status in ('new', 'contacted', 'qualified', 'closed', 'lost')) default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on public.business_leads(status, created_at desc);
create index on public.business_leads(email);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_business_leads_updated_at on public.business_leads;
create trigger set_business_leads_updated_at
  before update on public.business_leads
  for each row execute function public.set_updated_at();

-- RLS: ninguém vê do client (só service_role insere/lê)
alter table public.waitlist enable row level security;
alter table public.business_leads enable row level security;

-- Sem policies = só service_role acessa
```

# 7. APIs DE LEAD

Cada API:
- Valida com Zod
- Insere no Supabase (service_role)
- Manda email via Resend pro `LEAD_NOTIFICATION_EMAIL`
- Captura evento no PostHog server-side (opcional mas recomendado)
- Retorna `{ success: true }` ou `{ error: '...' }`
- Tem rate limit básico (1 req / IP / 30s) usando memória ou Upstash Redis se disponível

## `app/api/waitlist/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { resend } from "@/lib/resend";

const schema = z.object({
  email: z.string().email("Email inválido"),
  audience: z.enum(["autonomo", "empresa"]).optional(),
  source: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    
    const supabase = createServerClient();
    
    const { error: dbError } = await supabase
      .from("waitlist")
      .insert({
        ...data,
        user_agent: req.headers.get("user-agent"),
        ip_address: req.headers.get("x-forwarded-for")?.split(",")[0] || null,
      });
    
    if (dbError) {
      // Se já existe, retorna sucesso silencioso (UX)
      if (dbError.code === "23505") {
        return NextResponse.json({ success: true, alreadyRegistered: true });
      }
      throw dbError;
    }
    
    // Email de boas-vindas pro lead
    await resend.emails.send({
      from: "Klimar <noreply@useklimar.com.br>",
      to: data.email,
      subject: "Bem-vindo ao Klimar — em breve liberamos seu acesso",
      html: `
        <div style="font-family: system-ui; max-width: 600px;">
          <h1 style="color: #00B8D4;">Você está na lista!</h1>
          <p>Olá,</p>
          <p>Obrigado por se inscrever no Klimar. Em breve liberamos seu acesso ao painel.</p>
          <p>Klimar™ — Gestão para serviços técnicos</p>
        </div>
      `,
    });
    
    // Notificação interna pra equipe
    await resend.emails.send({
      from: "Klimar <noreply@useklimar.com.br>",
      to: process.env.LEAD_NOTIFICATION_EMAIL!,
      subject: `[Waitlist] ${data.email}`,
      html: `<p>Novo lead waitlist: ${data.email} (${data.audience || 'unknown'})</p>`,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: error instanceof z.ZodError ? error.errors : "Erro interno" },
      { status: 400 }
    );
  }
}
```

## `app/api/lead/route.ts` (Business)

Estrutura idêntica, mas com schema:

```typescript
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().min(2),
  num_technicians: z.number().int().positive().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});
```

Insere em `business_leads`. Email de notificação interna inclui todos os dados do lead pra você responder no WhatsApp/email rapidamente.

## `app/api/signup/route.ts`

Endpoint que cria conta no Supabase Auth direto pra usuários do Free. Simples:

```typescript
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: "https://app.useklimar.com.br/dashboard",
    data: { source: "landing", audience }
  }
});
```

# 8. POSTHOG

## Setup em `app/layout.tsx`

```typescript
import { PostHogProvider } from "@/components/analytics/posthog-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        <PostHogProvider>
          {children}
          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  );
}
```

## `components/analytics/posthog-provider.tsx`

```typescript
"use client";

import posthog from "posthog-js";
import { PostHogProvider as Provider } from "posthog-js/react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    capture_pageview: false, // captura manual via hook
    capture_pageleave: true,
    person_profiles: "identified_only",
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams]);
  
  return <Provider client={posthog}>{children}</Provider>;
}
```

## Catálogo de eventos `lib/analytics-events.ts`

```typescript
export const AnalyticsEvent = {
  // Navegação
  landingViewed: "landing_viewed",
  pricingViewed: "pricing_viewed",
  aboutViewed: "about_viewed",
  
  // Engajamento
  audienceToggled: "audience_toggled",
  ctaClicked: "cta_clicked",
  pricingPlanClicked: "pricing_plan_clicked",
  faqOpened: "faq_opened",
  comparisonViewed: "comparison_viewed",
  
  // Conversão
  signupStarted: "signup_started",
  signupCompleted: "signup_completed",
  waitlistSubmitted: "waitlist_submitted",
  businessLeadSubmitted: "business_lead_submitted",
  
  // Outbound
  appLoginClicked: "app_login_clicked",
  externalLinkClicked: "external_link_clicked",
} as const;
```

Uso em componentes:

```typescript
import posthog from "posthog-js";
import { AnalyticsEvent } from "@/lib/analytics-events";

// Em qualquer click
posthog.capture(AnalyticsEvent.ctaClicked, {
  location: "hero",
  label: "Começar grátis",
  audience: currentAudience,
});
```

# 9. RESEND

`lib/resend.ts`:

```typescript
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY missing — emails will fail");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
```

⚠ **DEV/PREVIEW:** Resend permite mandar email só pro próprio email cadastrado quando o domínio não está validado. Em prod, você precisa:

1. Adicionar domínio `useklimar.com.br` no painel do Resend
2. Configurar DNS records (SPF, DKIM, DMARC) no registro.br
3. Aguardar propagação (até 24h)
4. Validar no Resend

Antes disso funcionar em prod, **deixa o `LEAD_NOTIFICATION_EMAIL` apontando pra um email seu pessoal verificado no Resend**, e o `from:` usa `onboarding@resend.dev` (domínio sandbox do Resend que funciona sem validar).

Use Edge Runtime nas API routes que mandam email:

```typescript
export const runtime = "edge"; // ou "nodejs" se Edge der problema com Resend
```

# 10. SEO

## `app/layout.tsx` metadata

```typescript
export const metadata: Metadata = {
  title: {
    default: "Klimar™ — Gestão para serviços técnicos",
    template: "%s · Klimar",
  },
  description: "OS digital, fotos antes/depois, assinatura no app, PDF de orçamento direto pro WhatsApp. Para autônomos, MEIs e empresas de ar-condicionado, elétrica e manutenção predial.",
  keywords: ["gestão de serviços", "ar-condicionado", "PMOC", "ordem de serviço", "field service", "SaaS Brasil"],
  authors: [{ name: "iaverde" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://useklimar.com.br",
    siteName: "Klimar",
    title: "Klimar™ — Gestão para serviços técnicos",
    description: "OS digital, fotos antes/depois, PDF de orçamento direto pro WhatsApp.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klimar™ — Gestão para serviços técnicos",
    description: "OS digital, fotos antes/depois, PDF de orçamento direto pro WhatsApp.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://useklimar.com.br"),
};
```

## `app/sitemap.ts`

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://useklimar.com.br", priority: 1.0 },
    { url: "https://useklimar.com.br/precos", priority: 0.9 },
    { url: "https://useklimar.com.br/sobre", priority: 0.7 },
    { url: "https://useklimar.com.br/termos", priority: 0.3 },
    { url: "https://useklimar.com.br/privacidade", priority: 0.3 },
  ];
}
```

## `app/robots.ts`

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://useklimar.com.br/sitemap.xml",
  };
}
```

## JSON-LD Schema.org

Em `app/layout.tsx` `<head>`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Klimar",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
      },
      provider: {
        "@type": "Organization",
        name: "iaverde",
        url: "https://useklimar.com.br",
      },
    }),
  }}
/>
```

# 11. CRITÉRIOS DE ACEITE (não pula nenhum)

Antes de considerar pronto, **valide cada um**:

## Visual
- [ ] Reproduz o design do `docs/` com fidelidade
- [ ] Dark mode aplicado em todas as páginas
- [ ] Glow cyan funciona em CTAs primários
- [ ] Itálico cyan em palavras-chave de headlines
- [ ] Mobile responsivo (testado em 360px e 768px)
- [ ] Desktop testado em 1280px e 1920px

## Funcional
- [ ] Form de waitlist envia pro Supabase
- [ ] Form Business envia pro Supabase + email pra LEAD_NOTIFICATION_EMAIL
- [ ] Form de signup cria conta no Supabase Auth
- [ ] Audience toggle funciona e dispara evento PostHog
- [ ] Acordeão FAQ abre/fecha
- [ ] Smooth scroll em anchors
- [ ] Toggle Mensal/Anual em /precos atualiza preços

## Performance
- [ ] Lighthouse mobile ≥ 90 em todas as métricas
- [ ] Lighthouse desktop ≥ 95
- [ ] Core Web Vitals verde (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- [ ] Imagens com next/image
- [ ] Fontes via next/font (no FOIT/FOUT)

## SEO
- [ ] Metadata correto em cada página
- [ ] OG image renderiza (testar em https://www.opengraph.xyz)
- [ ] Sitemap gerando em /sitemap.xml
- [ ] robots.txt em /robots.txt
- [ ] JSON-LD válido

## Acessibilidade
- [ ] WCAG AA mínimo de contraste
- [ ] Tab order coerente
- [ ] Focus rings visíveis
- [ ] Aria-labels em IconButtons
- [ ] prefers-reduced-motion respeitado

## Analytics
- [ ] PostHog inicializa
- [ ] Pageview captura em mudança de rota
- [ ] Eventos de CTA, audience, FAQ disparando
- [ ] Identificação de usuário no signup
- [ ] Verificar dashboard PostHog após teste

# 12. ORDEM DE EXECUÇÃO RECOMENDADA

Não tente fazer tudo de uma vez. Divida em commits:

1. **Commit 1:** "chore: setup project + analyze design"
   - Setup Next.js + deps + shadcn
   - Análise do design no docs/
   - Configuração de tokens em tailwind.config.ts

2. **Commit 2:** "feat: layout + nav + footer"
   - app/layout.tsx com fonts e providers
   - PostHog provider
   - Nav e Footer reutilizáveis

3. **Commit 3:** "feat: home — hero + audience toggle + stats"
   - Hero completo com mockup
   - Audience toggle funcional
   - Stats section

4. **Commit 4:** "feat: home — features + how it works + comparison"

5. **Commit 5:** "feat: home — pricing teaser + testimonial + faq + cta final"

6. **Commit 6:** "feat: /precos page completa"

7. **Commit 7:** "feat: /sobre page completa"

8. **Commit 8:** "feat: API routes (waitlist + lead + signup)"

9. **Commit 9:** "feat: forms integrados com APIs"

10. **Commit 10:** "feat: SEO + sitemap + robots + JSON-LD + OG"

11. **Commit 11:** "test: lighthouse + a11y + analytics validation"

12. **Commit 12:** "chore: deploy config (vercel.json + env example)"

Entre cada commit, rode `npm run build` pra garantir que compila e `npm run dev` pra teste visual.

# 13. DEPLOY (instruções pra mim, não execute)

Após terminar tudo, me passe o checklist:

```
□ Conectar repo ao Vercel
□ Configurar env vars no painel Vercel:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY
  - NEXT_PUBLIC_POSTHOG_KEY
  - NEXT_PUBLIC_POSTHOG_HOST
  - RESEND_API_KEY
  - LEAD_NOTIFICATION_EMAIL
□ Configurar domínio useklimar.com.br no Vercel
□ Apontar DNS no registro.br pro Vercel
□ Adicionar domínio no Resend e configurar SPF/DKIM/DMARC
□ Rodar migration 001_marketing_tables.sql no Supabase
□ Validar OG image
□ Submeter sitemap ao Google Search Console
□ Validar JSON-LD em validator.schema.org
```

# 14. REGRAS RÍGIDAS

1. **Sempre LEIA o design no docs/ ANTES de codar.** Não invente.
2. **Reporte ANTES de seguir** etapas críticas (após análise do design, após setup, após cada página).
3. **Zero hardcode de cor** em componentes — tudo via Tailwind tokens.
4. **Toda animação respeita prefers-reduced-motion.**
5. **Toda imagem com width/height explícitos** (CLS = 0).
6. **Mobile-first sempre.**
7. **Toda mutation tem error boundary** (try/catch + toast de erro).
8. **Toda env var crítica é validada no boot** (lança erro se faltar em prod).
9. **Não commita .env.local nunca.**
10. **Comentários em português** nos componentes (ajuda quem mantém depois).

# 15. ANTES DE COMEÇAR

1. Confirme que vai usar Next.js 15 + Tailwind v4 + shadcn/ui + Framer Motion + Supabase + PostHog + Resend.
2. Liste o que encontrou em `docs/` e me dê o resumo.
3. Espere minha aprovação pra começar a etapa 2 (setup).

Vamos.
````

---

## Depois que o Claude Code terminar

### 1. Configurar Resend (importante!)

Antes do site funcionar 100% em produção:

1. Cria conta em [resend.com](https://resend.com)
2. Adiciona domínio `useklimar.com.br` em Settings → Domains
3. Resend te dá registros DNS (3 records: SPF TXT, DKIM TXT, DMARC TXT)
4. Vai no [registro.br](https://registro.br) → painel do `useklimar.com.br` → Editar zona DNS → adiciona os 3 records
5. Volta no Resend e clica "Verify" (pode levar até 24h pra propagar)
6. Cria API key em Settings → API Keys → "Production"
7. Copia pro `.env.local` e Vercel

Enquanto domínio não validar:
- `from:` usa `onboarding@resend.dev` (sandbox do Resend)
- `to:` precisa ser email cadastrado na sua conta Resend
- Funciona pra testar, não pra produção real

### 2. Configurar Supabase

No painel do Supabase do projeto Klimar:

1. SQL Editor → cola e roda a migration `001_marketing_tables.sql`
2. Settings → API → copia a `service_role` key
3. Cola no `.env.local` e Vercel como `SUPABASE_SERVICE_ROLE_KEY`

⚠ **Cuidado:** `service_role` ignora RLS. Nunca expõe no client. Só usa em API routes server-side.

### 3. Deploy Vercel

```bash
# No diretório klimar-site/
npx vercel

# Em produção:
npx vercel --prod
```

Configura no painel:
- Domain: useklimar.com.br
- Env vars (copia tudo do `.env.local`)

DNS no registro.br:
- Registro `A` → IP da Vercel (eles informam)
- Ou registro `CNAME` se preferir (apontando pra `cname.vercel-dns.com`)

### 4. Pós-deploy validação

- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) — mobile + desktop
- [ ] [OpenGraph.xyz](https://www.opengraph.xyz) — preview de WhatsApp/Slack
- [ ] [Schema validator](https://validator.schema.org)
- [ ] [Twitter Card validator](https://cards-dev.twitter.com/validator)
- [ ] Submeter sitemap no [Google Search Console](https://search.google.com/search-console)
- [ ] Submeter no [Bing Webmaster](https://www.bing.com/webmasters)
- [ ] Testa cada form preenchendo (waitlist + business + signup)
- [ ] Confere se email de notificação chega
- [ ] Confere PostHog pegando pageviews + eventos

---

## Calendário sugerido

| Quando | O que |
|---|---|
| **Hoje** | Coloca ZIP do design em `docs/`, cria conta Resend |
| **Próximas 4-6h** | Roda o prompt no Claude Code, valida análise inicial |
| **Próximas 4-8h** | Claude Code implementa, você revê commit a commit |
| **Dia seguinte** | Ajustes finos visuais, testa em mobile real |
| **Dia 3** | Deploy Vercel, configura DNS, valida em produção |
| **Dia 4-5** | Resend valida domínio, troca `from:` pra `noreply@useklimar.com.br` |
| **Semana 2** | Manda o link pro PHP virar Founding Customer |

---

**Marca: Klimar™ · Domínio: useklimar.com.br · Empresa: iaverde · Stack: Next.js 15 + Tailwind + shadcn/ui + Framer Motion + Supabase + PostHog + Resend**
