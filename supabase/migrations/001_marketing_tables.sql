-- ===================================================
-- Marketing leads do site useklimar.com.br
-- ===================================================

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  audience text check (audience in ('solo', 'company', 'unknown')) default 'unknown',
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  ip_address inet,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on public.waitlist(created_at desc);
create unique index if not exists waitlist_email_unique on public.waitlist(email);

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
  user_agent text,
  ip_address inet,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists business_leads_status_idx on public.business_leads(status, created_at desc);
create index if not exists business_leads_email_idx on public.business_leads(email);

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

-- RLS: só service_role acessa (sem policies = bloqueia tudo no client)
alter table public.waitlist enable row level security;
alter table public.business_leads enable row level security;

comment on table public.waitlist is 'Lista de inscrição via formulário do site (autônomos / empresas).';
comment on table public.business_leads is 'Leads qualificados Business / Enterprise via formulário "Falar com vendas".';
