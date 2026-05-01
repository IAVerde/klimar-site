// Klimar — screens (part 3: Forms, Catalog, Settings, Organization, About)

const { CLIENTS: C3, APPOINTMENTS: A3, BUDGETS: B3, SERVICES: S3, EQUIPMENT_TYPES: E3 } = window.__DATA__;

// ─── Appointment / Budget form (3-step stepper) ──────────────────────────
function AppointmentForm({ back, kind = 'appointment' }) {
  const [step, setStep] = React.useState(1);
  const total = 3;
  const labels = ['Cliente', 'Serviço', 'Confirmação'];

  return (
    <>
      <Header back={back} title={kind === 'budget' ? 'Novo orçamento' : 'Novo atendimento'} sub={`Etapa ${step} de ${total} · ${labels[step-1]}`} />
      <div style={{ padding: '0 16px 8px', display: 'flex', gap: 6 }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2,
                                 background: i <= step ? 'var(--brand)' : 'var(--surface-container-high)',
                                 transition: 'background 250ms' }} />
        ))}
      </div>
      <div className="scroll">
        <div className="page">
          {step === 1 && (
            <>
              <div className="field">
                <label className="field-label">Cliente</label>
                <div className="search">
                  <Icon name="search" size={18} color="var(--on-surface-muted)" />
                  <input placeholder="Buscar cliente…" defaultValue="Maria" />
                </div>
              </div>
              <div className="card" style={{ padding: 0 }}>
                {C3.slice(0, 4).map((c, i) => (
                  <div key={c.id} className="card-row" style={{ borderBottom: i === 3 ? 0 : undefined }}>
                    <Avatar name={c.name} size="sm" />
                    <div className="flex-1" style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 500, fontSize: 14 }} className="truncate">{c.name}</div>
                      <div className="t-caption text-muted truncate">{c.phone}</div>
                    </div>
                    {i === 0 && <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'grid', placeItems: 'center' }}>
                      <Icon name="check" size={14} strokeWidth={3} />
                    </div>}
                  </div>
                ))}
              </div>
              <button className="btn btn-secondary btn-block">
                <Icon name="plus" size={18} />Cadastrar novo cliente
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="field">
                <label className="field-label">Tipo de serviço</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {S3.slice(0, 4).map((s, i) => (
                    <button key={s.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', cursor: 'pointer', padding: 14, border: i === 1 ? '2px solid var(--brand)' : '1px solid var(--outline-variant)' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                        <div className="t-caption text-muted">A partir de {s.price}</div>
                      </div>
                      {i === 1 && <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'grid', placeItems: 'center' }}>
                        <Icon name="check" size={14} strokeWidth={3} />
                      </div>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label className="field-label">Equipamento</label>
                <select className="select" defaultValue="e5">
                  {E3.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div className="field">
                  <label className="field-label">Data</label>
                  <input className="input mono" defaultValue="02/05/2026" />
                </div>
                <div className="field">
                  <label className="field-label">Horário</label>
                  <input className="input mono" defaultValue="14:00" />
                </div>
              </div>
              <div className="field">
                <label className="field-label">Observações</label>
                <textarea className="textarea" placeholder="Detalhes adicionais para o técnico…" />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px 0', gap: 10 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--status-done-bg)', color: 'var(--status-done)', display: 'grid', placeItems: 'center' }}>
                  <Icon name="check" size={28} strokeWidth={3} />
                </div>
                <div className="t-headline-s">Tudo pronto?</div>
                <div className="t-caption text-muted" style={{ maxWidth: 280 }}>Revise as informações abaixo antes de confirmar.</div>
              </div>
              <div className="card" style={{ padding: 0 }}>
                <SummaryRow label="Cliente" value="Maria Silva" />
                <SummaryRow label="Telefone" value="(11) 98765-4321" mono />
                <SummaryRow label="Endereço" value="Rua Augusta, 1842" />
                <SummaryRow label="Serviço" value="Higienização química" />
                <SummaryRow label="Equipamento" value="Cassete 36.000 BTU" />
                <SummaryRow label="Quando" value="02/05/2026 · 14:00" mono last />
              </div>
              <div style={{ background: 'var(--brand-container)', color: 'var(--brand-on-container)', borderRadius: 12, padding: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Icon name="info" size={18} strokeWidth={2} />
                <div className="t-caption" style={{ color: 'inherit' }}>
                  Um lembrete será enviado por WhatsApp para o cliente 1 hora antes do atendimento.
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="footer-actions">
        {step < 3 ? (
          <button className="btn btn-primary btn-block" onClick={() => setStep(step + 1)}>
            Continuar<Icon name="arrowRight" size={20} strokeWidth={2.2} />
          </button>
        ) : (
          <button className="btn btn-primary btn-block" onClick={back}>
            <Icon name="check" size={20} strokeWidth={2.5} />Confirmar
          </button>
        )}
        {step > 1 && (
          <button className="btn btn-ghost btn-block" style={{ height: 40, fontSize: 13 }} onClick={() => setStep(step - 1)}>
            Voltar
          </button>
        )}
      </div>
    </>
  );
}

function SummaryRow({ label, value, mono, last }) {
  return (
    <div className="card-row" style={{ borderBottom: last ? 0 : undefined, justifyContent: 'space-between' }}>
      <div className="t-caption text-muted">{label}</div>
      <div className={mono ? 'mono' : ''} style={{ fontWeight: 500, fontSize: 14, textAlign: 'right' }}>{value}</div>
    </div>
  );
}

// ─── Catalog ──────────────────────────────────────────────────────────────
function CatalogScreen() {
  const [tab, setTab] = React.useState('services');
  return (
    <>
      <div className="appbar">
        <div className="flex-1">
          <div className="appbar-title">Catálogo</div>
          <div className="appbar-sub">Serviços e tipos de equipamento</div>
        </div>
      </div>
      <div className="tabs">
        <button className={tab === 'services' ? 'active' : ''} onClick={() => setTab('services')}>Serviços ({S3.length})</button>
        <button className={tab === 'types' ? 'active' : ''} onClick={() => setTab('types')}>Tipos de ar ({E3.length})</button>
      </div>
      <div className="scroll">
        <div style={{ paddingBottom: 120 }}>
          {tab === 'services' && S3.map(s => (
            <div key={s.id} className="list-item">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface-container-high)', color: 'var(--on-surface-variant)', display: 'grid', placeItems: 'center' }}>
                <Icon name="settings" size={20} strokeWidth={1.6} />
              </div>
              <div className="flex-1" style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                <div className="t-caption text-muted mono">{s.price} · {s.hourly} · extra {s.extra}</div>
              </div>
              <button className="appbar-icon"><Icon name="more" size={18} /></button>
            </div>
          ))}
          {tab === 'types' && E3.map(e => (
            <div key={e.id} className="list-item">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface-container-high)', color: 'var(--on-surface-variant)', display: 'grid', placeItems: 'center' }}>
                <Icon name="air" size={20} strokeWidth={1.6} />
              </div>
              <div className="flex-1">
                <div style={{ fontWeight: 600, fontSize: 14 }}>{e.name}</div>
                <div className="t-caption text-muted mono">Base: {e.basePrice}</div>
              </div>
              <button className="appbar-icon"><Icon name="more" size={18} /></button>
            </div>
          ))}
        </div>
      </div>
      <button className="fab"><Icon name="plus" size={28} strokeWidth={2.5} /></button>
    </>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────
function SettingsScreen({ go, tenantName }) {
  return (
    <>
      <div className="appbar"><div className="appbar-title">Configurações</div></div>
      <div className="scroll">
        <div className="page">
          <div className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name="Lucas Andrade" size="lg" />
            <div className="flex-1">
              <div style={{ fontWeight: 600, fontSize: 16 }}>Lucas Andrade</div>
              <div className="t-caption text-muted">lucas@phparcondicionado.com.br</div>
              <div className="t-caption" style={{ color: 'var(--brand)', fontWeight: 500 }}>Administrador</div>
            </div>
          </div>

          <SettingsGroup title="Conta">
            <SettingsRow icon="user" label="Perfil" />
            <SettingsRow icon="settings" label="Trocar senha" />
            <SettingsRow icon="logout" label="Sair" destructive last />
          </SettingsGroup>

          <SettingsGroup title="Empresa">
            <SettingsRow icon="package" label="Empresa" sub={tenantName} onClick={() => go('organization')} />
            <SettingsRow icon="palette" label="Logo e cor primária" sub="Personalize a identidade" onClick={() => go('organization')} />
            <SettingsRow icon="info" label="Dados fiscais" sub="CNPJ, endereço, telefone" last />
          </SettingsGroup>

          <SettingsGroup title="Integrações">
            <SettingsRow icon="calendar" label="Google Calendar" sub="Conectado · sincroniza a cada 5 min" badge="ON" last />
          </SettingsGroup>

          <SettingsGroup title="Aparência">
            <SettingsRow icon="moon" label="Tema" sub="Sistema · use tweaks ➝" last />
          </SettingsGroup>

          <SettingsGroup title="Sobre">
            <SettingsRow icon="info" label="Sobre o Klimar" onClick={() => go('about')} />
            <SettingsRow icon="file" label="Termos de uso" />
            <SettingsRow icon="eye" label="Privacidade" last />
          </SettingsGroup>

          <div style={{ textAlign: 'center', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div className="t-caption text-muted">Versão 2.4.0 (build 2401)</div>
            <div style={{ fontSize: 11, color: 'var(--on-surface-muted)' }}>Klimar é produto da iaverde</div>
          </div>
        </div>
      </div>
    </>
  );
}

function SettingsGroup({ title, children }) {
  return (
    <div>
      <div className="t-label-up" style={{ marginBottom: 8, paddingLeft: 4 }}>{title}</div>
      <div className="card" style={{ padding: 0 }}>{children}</div>
    </div>
  );
}

function SettingsRow({ icon, label, sub, badge, destructive, last, onClick }) {
  return (
    <button onClick={onClick} className="card-row" style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: 0, borderBottom: last ? 0 : '1px solid var(--outline-variant)', background: 'var(--surface-elevated)' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: destructive ? 'var(--status-overdue-bg)' : 'var(--surface-container)', color: destructive ? 'var(--status-overdue)' : 'var(--on-surface-variant)', display: 'grid', placeItems: 'center' }}>
        <Icon name={icon} size={18} strokeWidth={1.8} />
      </div>
      <div className="flex-1" style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 500, fontSize: 14, color: destructive ? 'var(--status-overdue)' : 'var(--on-surface)' }}>{label}</div>
        {sub && <div className="t-caption text-muted truncate">{sub}</div>}
      </div>
      {badge && <span className="badge done"><span className="dot" />{badge}</span>}
      {!destructive && <Icon name="chevronRight" size={18} color="var(--on-surface-muted)" />}
    </button>
  );
}

// ─── Organization (tenant white-label settings) ──────────────────────────
function OrganizationScreen({ back, tenantName, tenantBrand, setTenant }) {
  const swatches = ['#0B5FFF', '#E85D2F', '#16A34A', '#8B5CF6', '#06B6D4', '#DC2626'];
  return (
    <>
      <Header back={back} title="Empresa" sub="Identidade visual e dados fiscais" />
      <div className="scroll">
        <div className="page">
          <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div className="t-label-up" style={{ alignSelf: 'flex-start' }}>Logo da empresa</div>
            <div style={{ width: 96, height: 96, borderRadius: 20, background: 'var(--brand-container)',
                          color: 'var(--brand-on-container)', display: 'grid', placeItems: 'center',
                          fontWeight: 700, fontSize: 28, letterSpacing: '-0.04em' }}>
              {tenantName === 'PHP Ar Condicionado' ? 'PHP' : 'KL'}
            </div>
            <button className="btn btn-secondary btn-sm">
              <Icon name="upload" size={16} strokeWidth={2} />Enviar nova logo
            </button>
            <div className="t-caption text-muted" style={{ textAlign: 'center' }}>PNG ou SVG até 2 MB. Aparece no header dos PDFs e no app.</div>
          </div>

          <div>
            <Section title="Cor primária" />
            <div className="card" style={{ padding: 14 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                {swatches.map(c => (
                  <button key={c} style={{ width: 36, height: 36, borderRadius: '50%', background: c, border: c === tenantBrand ? '3px solid var(--on-surface)' : '1px solid var(--outline-variant)', cursor: 'pointer' }} />
                ))}
              </div>
              <div className="row gap-2">
                <div style={{ width: 36, height: 36, borderRadius: 8, background: tenantBrand, border: '1px solid var(--outline-variant)' }} />
                <input className="input mono" defaultValue={tenantBrand} style={{ flex: 1, height: 40, textTransform: 'uppercase' }} />
              </div>
              <div className="t-caption text-muted" style={{ marginTop: 8 }}>
                Sua cor sobrepõe o azul Klimar em botões, badges e KPIs.
              </div>
            </div>
          </div>

          <div>
            <Section title="Dados fiscais" />
            <div className="card" style={{ padding: 0 }}>
              <FieldRow label="Razão social" value={tenantName} />
              <FieldRow label="CNPJ" value="12.345.678/0001-90" mono />
              <FieldRow label="Telefone" value="(11) 3456-7890" mono />
              <FieldRow label="E-mail" value="contato@phparcondicionado.com.br" />
              <FieldRow label="Endereço" value="Av. Sapopemba, 8124 — São Paulo/SP" last />
            </div>
          </div>

          <div className="card" style={{ padding: 12, background: 'var(--surface-container)', border: 0, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Icon name="info" size={18} color="var(--on-surface-variant)" />
            <div className="t-caption text-variant">
              Klimar é uma plataforma multi-tenant. Sua identidade visual aparece em todo o app e nos documentos enviados aos seus clientes.
            </div>
          </div>
        </div>
      </div>
      <div className="footer-actions">
        <button className="btn btn-primary btn-block">Salvar alterações</button>
      </div>
    </>
  );
}

function FieldRow({ label, value, mono, last }) {
  return (
    <div className="card-row" style={{ borderBottom: last ? 0 : undefined, flexDirection: 'column', alignItems: 'stretch', gap: 2 }}>
      <div className="t-caption text-muted">{label}</div>
      <div className={mono ? 'mono' : ''} style={{ fontWeight: 500, fontSize: 14 }}>{value}</div>
    </div>
  );
}

// ─── About Klimar ─────────────────────────────────────────────────────────
function AboutScreen({ back }) {
  return (
    <>
      <Header back={back} title="Sobre o Klimar" />
      <div className="scroll">
        <div className="page" style={{ alignItems: 'center', textAlign: 'center', paddingTop: 32 }}>
          <div style={{ width: 88, height: 88, borderRadius: 22, background: '#0B5FFF', color: '#fff',
                        display: 'grid', placeItems: 'center', fontFamily: 'Inter', fontWeight: 700,
                        fontSize: 36, letterSpacing: '-0.04em' }}>k</div>
          <div className="wordmark lg" style={{ color: '#0B5FFF', marginTop: 4 }}>klimar</div>
          <div className="t-body text-muted" style={{ maxWidth: 280 }}>Gestão completa para serviços técnicos — do agendamento à assinatura digital.</div>
          <div className="mono t-caption text-muted">v2.4.0 · build 2401</div>

          <div className="card" style={{ padding: 0, alignSelf: 'stretch', marginTop: 16 }}>
            <SettingsRow icon="info" label="useklimar.com.br" sub="Site oficial" />
            <SettingsRow icon="file" label="Termos de uso" />
            <SettingsRow icon="eye" label="Política de privacidade" last />
          </div>

          <div style={{ marginTop: 24, padding: 16, background: 'var(--surface-container)', borderRadius: 12, alignSelf: 'stretch', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#16A34A', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13 }}>iV</div>
            <div style={{ textAlign: 'left' }}>
              <div className="t-caption text-muted">Klimar é um produto da</div>
              <div style={{ fontWeight: 600 }}>iaverde</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { AppointmentForm, CatalogScreen, SettingsScreen, OrganizationScreen, AboutScreen });
