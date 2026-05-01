// Klimar — screens (part 2: Appointment detail with 4 states, Budgets list, Budget detail)

const { CLIENTS: C2, APPOINTMENTS: A2, BUDGETS: B2, SERVICES: S2, EQUIPMENT_TYPES: E2, CHECKLIST_HIGIENIZACAO: CK } = window.__DATA__;

// ─── Appointment detail ──────────────────────────────────────────────────
function AppointmentDetail({ id, go, back, state, setState }) {
  const a = A2.find(x => x.id === id) || A2[0];
  const c = C2.find(x => x.id === a.clientId);
  const [check, setCheck] = React.useState(CK);
  const doneCount = check.filter(x => x.done).length;
  const progressPct = Math.round((doneCount / check.length) * 100);
  const [signed, setSigned] = React.useState(false);

  if (state === 'loading') return <AppointmentLoading back={back} />;
  if (state === 'empty') {
    return (
      <>
        <Header back={back} title="Atendimento" />
        <EmptyState icon="calendar" title="Atendimento não encontrado" message="Este atendimento pode ter sido removido ou está fora do seu acesso." />
      </>
    );
  }
  if (state === 'error') {
    return (
      <>
        <Header back={back} title="Atendimento" />
        <ErrorView message="Não foi possível carregar este atendimento. Verifique sua conexão e tente novamente." onRetry={() => setState('success')} />
      </>
    );
  }

  return (
    <>
      <div className="appbar" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <button className="appbar-icon" onClick={back}><Icon name="chevronLeft" size={22} strokeWidth={2} /></button>
        <div className="flex-1">
          <div className="appbar-title mono" style={{ fontSize: 14, color: 'var(--on-surface-muted)' }}>{a.osNumber}</div>
          <div className="appbar-sub">{a.date} · {a.time}</div>
        </div>
        <button className="appbar-icon"><Icon name="more" size={22} strokeWidth={2} /></button>
      </div>

      <div className="scroll">
        {/* Hero header */}
        <div style={{ padding: '20px 16px 16px', background: 'var(--surface-container)', borderBottom: '1px solid var(--outline-variant)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Badge status={a.status} />
            <div className="t-headline-l">{a.service}</div>
            <div className="t-body text-variant">{a.clientName} · {a.equipment}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--on-surface-variant)' }}>
              <Icon name="clock" size={14} strokeWidth={2} />
              <span>{a.date}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{a.time}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{a.duration}min</span>
            </div>
            {a.status === 'in_progress' && (
              <div style={{ background: 'var(--status-in-progress-bg)', color: 'var(--status-in-progress)',
                            padding: '10px 12px', borderRadius: 10, display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between', gap: 8, fontSize: 13, fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor', animation: 'pulse 1.4s infinite' }} />
                  Em andamento
                </span>
                <span className="mono">00:38:24</span>
              </div>
            )}
          </div>
        </div>

        <div className="page" style={{ paddingBottom: 24 }}>
          {/* Cliente */}
          <Section title="Cliente" />
          <div className="card" style={{ padding: 12 }}>
            <div className="row" style={{ marginBottom: 12 }}>
              <Avatar name={c.name} />
              <div className="flex-1" style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }} className="truncate">{c.name}</div>
                <div className="t-caption text-muted truncate">{c.address}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <button className="btn btn-secondary btn-sm"><Icon name="phone" size={16} strokeWidth={2} />Ligar</button>
              <button className="btn btn-secondary btn-sm" style={{ background: '#25D36615', color: '#1ea752' }}>
                <Icon name="whatsapp" size={16} strokeWidth={2} />WhatsApp
              </button>
              <button className="btn btn-secondary btn-sm"><Icon name="mapPin" size={16} strokeWidth={2} />Maps</button>
            </div>
          </div>

          {/* Checklist */}
          <Section title="Checklist" right={<span className="mono" style={{ fontSize: 12, color: 'var(--on-surface-muted)', fontWeight: 600 }}>{doneCount}/{check.length}</span>} />
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: '12px 14px 8px' }}>
              <div style={{ height: 6, background: 'var(--surface-container-high)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${progressPct}%`, height: '100%', background: 'var(--brand)', transition: 'width 250ms cubic-bezier(.2,.7,.3,1)' }} />
              </div>
              <div className="t-caption text-muted" style={{ marginTop: 6 }}>{progressPct}% completo · Higienização química</div>
            </div>
            {check.map((item, i) => (
              <button key={item.id} onClick={() => setCheck(check.map(x => x.id === item.id ? { ...x, done: !x.done } : x))}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'transparent', border: 0, borderTop: '1px solid var(--outline-variant)', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${item.done ? 'var(--brand)' : 'var(--outline)'}`,
                              background: item.done ? 'var(--brand)' : 'transparent', display: 'grid', placeItems: 'center', flexShrink: 0, color: '#fff' }}>
                  {item.done && <Icon name="check" size={14} strokeWidth={3} />}
                </div>
                <div style={{ fontSize: 14, color: item.done ? 'var(--on-surface-muted)' : 'var(--on-surface)',
                              textDecoration: item.done ? 'line-through' : 'none', flex: 1 }}>{item.text}</div>
              </button>
            ))}
          </div>

          {/* Fotos antes/depois */}
          <Section title="Fotos" />
          <div className="card" style={{ padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div className="t-label-up">Antes</div>
              <div className="t-caption text-muted">3 fotos</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 14 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 8, background: `linear-gradient(${135+i*30}deg, #cbd5e1, #94a3b8)`, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)', backdropFilter: 'contrast(0.9)' }} />
                </div>
              ))}
              <button style={{ aspectRatio: '1', borderRadius: 8, border: '1px dashed var(--outline)', background: 'var(--surface-container)', display: 'grid', placeItems: 'center', color: 'var(--on-surface-muted)' }}>
                <Icon name="camera" size={20} strokeWidth={1.8} />
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div className="t-label-up">Depois</div>
              <div className="t-caption text-muted">0 fotos</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              <button style={{ aspectRatio: '1', borderRadius: 8, border: '1px dashed var(--outline)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center', color: 'var(--on-surface-muted)', fontSize: 10 }}>
                <Icon name="camera" size={20} strokeWidth={1.8} />
                <span>Câmera</span>
              </button>
              <button style={{ aspectRatio: '1', borderRadius: 8, border: '1px dashed var(--outline)', background: 'var(--surface-container)', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center', color: 'var(--on-surface-muted)', fontSize: 10 }}>
                <Icon name="upload" size={20} strokeWidth={1.8} />
                <span>Galeria</span>
              </button>
            </div>
          </div>

          {/* Equipamento */}
          <Section title="Equipamento atendido" />
          <div className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--brand-container)', color: 'var(--brand-on-container)', display: 'grid', placeItems: 'center' }}>
              <Icon name="qr" size={22} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div style={{ fontWeight: 600, fontSize: 14 }}>{a.equipment}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--on-surface-muted)' }}>EQ-0231 · histórico (4)</div>
            </div>
            <button className="btn btn-ghost btn-sm">Ver</button>
          </div>

          {/* Anotações */}
          <Section title="Anotações" />
          <div className="card" style={{ padding: 0 }}>
            <textarea className="textarea" style={{ border: 0, background: 'transparent', minHeight: 80 }}
                      placeholder="Adicione observações técnicas sobre o atendimento…"
                      defaultValue="Cliente solicitou verificação do dreno externo. Equipamento apresenta gotejamento intermitente." />
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 12px 10px' }}>
              <button className="btn btn-ghost btn-sm" style={{ color: 'var(--on-surface-muted)' }}>
                <Icon name="mic" size={14} strokeWidth={2} />Ditado
              </button>
            </div>
          </div>

          {/* Assinatura */}
          <Section title="Assinatura do cliente" />
          <div className="card" style={{ padding: 12 }}>
            <div onClick={() => setSigned(!signed)}
                 style={{ height: 140, borderRadius: 10, border: '1px dashed var(--outline)', background: 'var(--surface)',
                          display: 'grid', placeItems: 'center', color: 'var(--on-surface-muted)',
                          cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
              {signed ? (
                <svg width="220" height="80" viewBox="0 0 220 80" style={{ color: 'var(--on-surface)' }}>
                  <path d="M10 60 Q 30 20, 50 50 T 90 45 Q 110 35, 130 55 T 170 40 Q 190 30, 210 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Icon name="pen" size={26} strokeWidth={1.6} />
                  <div className="t-caption">Toque para assinar</div>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <div className="t-caption text-muted">{signed ? 'Maria Silva · 01/05 09:42' : 'Pendente'}</div>
              {signed && <button className="btn btn-ghost btn-sm" onClick={() => setSigned(false)}>Limpar</button>}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-actions">
        <button className="btn btn-primary btn-block" disabled={!signed}
                style={{ opacity: signed ? 1 : 0.5 }}>
          <Icon name="check" size={20} strokeWidth={2.5} />Finalizar atendimento
        </button>
        <button className="btn btn-ghost btn-block" style={{ height: 40, fontSize: 13, fontWeight: 500 }}>
          Gerar orçamento a partir deste
        </button>
      </div>
    </>
  );
}

function Header({ back, title, sub }) {
  return (
    <div className="appbar">
      <button className="appbar-icon" onClick={back}><Icon name="chevronLeft" size={22} strokeWidth={2} /></button>
      <div className="flex-1">
        <div className="appbar-title">{title}</div>
        {sub && <div className="appbar-sub">{sub}</div>}
      </div>
    </div>
  );
}

function Section({ title, right }) {
  return (
    <div className="section-h" style={{ marginTop: 4, marginBottom: 8 }}>
      <h3>{title}</h3>
      {right}
    </div>
  );
}

function AppointmentLoading({ back }) {
  return (
    <>
      <Header back={back} title="Carregando…" />
      <div style={{ padding: '20px 16px', background: 'var(--surface-container)', borderBottom: '1px solid var(--outline-variant)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Skeleton w={100} h={22} r={11} />
        <Skeleton w="80%" h={24} />
        <Skeleton w="60%" h={14} />
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[1,2,3].map(i => (
          <div key={i} className="card" style={{ padding: 14, gap: 10, display: 'flex', flexDirection: 'column' }}>
            <Skeleton w={120} h={12} />
            <Skeleton w="70%" h={16} />
            <Skeleton w="100%" h={50} />
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Budgets list ─────────────────────────────────────────────────────────
function BudgetsScreen({ go }) {
  const [tab, setTab] = React.useState('all');
  const filtered = tab === 'all' ? B2 :
                   tab === 'pending' ? B2.filter(b => b.status === 'pending') :
                   tab === 'approved' ? B2.filter(b => b.status === 'approved') :
                   tab === 'rejected' ? B2.filter(b => b.status === 'rejected') :
                   B2.filter(b => b.status === 'draft');
  return (
    <>
      <div className="appbar">
        <div className="flex-1">
          <div className="appbar-title">Orçamentos</div>
          <div className="appbar-sub">{B2.length} no total · R$ 12.910 pendentes</div>
        </div>
        <button className="appbar-icon"><Icon name="search" size={22} strokeWidth={1.8} /></button>
      </div>
      <div className="tabs">
        {[
          { k: 'all', l: 'Todos' },
          { k: 'pending', l: 'Pendentes' },
          { k: 'approved', l: 'Aprovados' },
          { k: 'rejected', l: 'Recusados' },
          { k: 'draft', l: 'Rascunhos' },
        ].map(t => (
          <button key={t.k} className={tab === t.k ? 'active' : ''} onClick={() => setTab(t.k)}>{t.l}</button>
        ))}
      </div>
      <div className="scroll">
        <div style={{ paddingBottom: 120 }}>
          {filtered.map(b => (
            <button key={b.id} onClick={() => go('budget', b.id)} className="list-item" style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: 0, gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface-container-high)', color: 'var(--on-surface-variant)', display: 'grid', placeItems: 'center' }}>
                <Icon name="receipt" size={20} strokeWidth={1.8} />
              </div>
              <div className="flex-1" style={{ minWidth: 0 }}>
                <div className="row gap-2" style={{ marginBottom: 2 }}>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--on-surface-muted)', fontWeight: 600 }}>#{b.number}</span>
                  <Badge status={b.status === 'approved' ? 'done' : b.status === 'rejected' ? 'cancelled' : b.status === 'pending' ? 'scheduled' : 'cancelled'}>
                    {b.status === 'approved' ? 'Aprovado' : b.status === 'rejected' ? 'Recusado' : b.status === 'pending' ? 'Pendente' : 'Rascunho'}
                  </Badge>
                </div>
                <div style={{ fontWeight: 600, fontSize: 14 }} className="truncate">{b.clientName}</div>
                <div className="t-caption text-muted">{b.date}</div>
              </div>
              <div className="mono" style={{ fontWeight: 700, fontSize: 15 }}>{b.total}</div>
            </button>
          ))}
        </div>
      </div>
      <button className="fab" onClick={() => go('budget_form')}><Icon name="plus" size={28} strokeWidth={2.5} /></button>
    </>
  );
}

// ─── Budget detail ────────────────────────────────────────────────────────
function BudgetDetail({ id, go, back }) {
  const b = B2.find(x => x.id === id) || B2[0];
  const items = b.items.length ? b.items : [
    { desc: 'Higienização química — Cassete 36k BTU', qty: 6, unit: 'R$ 280,00', total: 'R$ 1.680,00' },
    { desc: 'Recarga de gás R-410A', qty: 1, unit: 'R$ 380,00', total: 'R$ 380,00' },
    { desc: 'Mão de obra (h)', qty: 2, unit: 'R$ 120,00', total: 'R$ 240,00' },
  ];
  const subtotal = 8450;
  const tax = 0;

  return (
    <>
      <Header back={back} title={`Orçamento #${b.number}`} sub={b.date} />
      <div className="scroll">
        <div className="page">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div className="t-label-up">Orçamento</div>
              <div className="mono" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>#{b.number}</div>
              <Badge status={b.status === 'approved' ? 'done' : 'scheduled'}>
                {b.status === 'approved' ? 'Aprovado' : 'Aguardando aprovação'}
              </Badge>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="t-label-up">Total</div>
              <div className="mono" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--brand)' }}>
                {b.total}
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name={b.clientName} size="sm" />
            <div className="flex-1">
              <div style={{ fontWeight: 600, fontSize: 14 }}>{b.clientName}</div>
              <div className="t-caption text-muted">CNPJ 12.345.678/0001-90</div>
            </div>
            <Icon name="chevronRight" size={18} color="var(--on-surface-muted)" strokeWidth={2} />
          </div>

          <div>
            <Section title="Itens" right={<button className="link" style={{ background: 'none', border: 0, color: 'var(--brand)', fontSize: 13, fontWeight: 500 }}>+ Adicionar</button>} />
            <div className="card" style={{ padding: 0 }}>
              {items.map((it, i) => (
                <div key={i} className="card-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 6, padding: 12 }}>
                  <div className="row between">
                    <div style={{ fontWeight: 500, fontSize: 14, flex: 1, paddingRight: 8 }}>{it.desc}</div>
                    <div className="mono" style={{ fontWeight: 600, fontSize: 14 }}>{it.total}</div>
                  </div>
                  <div className="t-caption text-muted mono">{it.qty} × {it.unit}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 0 }}>
            <div className="card-row" style={{ justifyContent: 'space-between' }}>
              <div className="t-caption text-muted">Subtotal</div>
              <div className="mono" style={{ fontWeight: 500 }}>R$ 8.450,00</div>
            </div>
            <div className="card-row" style={{ justifyContent: 'space-between' }}>
              <div className="t-caption text-muted">Desconto</div>
              <div className="mono" style={{ fontWeight: 500 }}>R$ 0,00</div>
            </div>
            <div className="card-row" style={{ justifyContent: 'space-between', background: 'var(--surface-container)' }}>
              <div style={{ fontWeight: 600 }}>Total</div>
              <div className="mono" style={{ fontWeight: 700, fontSize: 18, color: 'var(--brand)' }}>{b.total}</div>
            </div>
          </div>

          <div className="card" style={{ padding: 12, display: 'flex', alignItems: 'flex-start', gap: 10, background: 'var(--brand-container)', border: 0 }}>
            <Icon name="info" size={18} color="var(--brand-on-container)" strokeWidth={2} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand-on-container)' }}>Validade: 7 dias</div>
              <div className="t-caption" style={{ color: 'var(--brand-on-container)', opacity: 0.85 }}>Após aprovação, agendaremos a visita.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-actions">
        <button className="btn btn-primary btn-block">
          <Icon name="check" size={20} strokeWidth={2.5} />Aprovar orçamento
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button className="btn btn-secondary" style={{ background: '#25D36615', color: '#1ea752' }}>
            <Icon name="whatsapp" size={18} strokeWidth={2} />WhatsApp
          </button>
          <button className="btn btn-secondary"><Icon name="file" size={18} strokeWidth={2} />PDF</button>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { AppointmentDetail, BudgetsScreen, BudgetDetail, Header, Section });
