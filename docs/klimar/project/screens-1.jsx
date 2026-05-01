// Klimar — screens (part 1: Login, Dashboard, Agenda, Clients, Client detail)

const { CLIENTS, APPOINTMENTS, BUDGETS, SERVICES, EQUIPMENT_TYPES, CHECKLIST_HIGIENIZACAO } = window.__DATA__;

// ─── Login ───────────────────────────────────────────────────────────────
function LoginScreen({ onEnter, tenantName }) {
  return (
    <div className="app" style={{ background: 'var(--surface)', padding: '0 24px', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="wordmark lg" style={{ marginBottom: 4 }}>klimar</div>
          <div className="t-body text-muted" style={{ maxWidth: 280, margin: '0 auto' }}>
            Gestão completa para serviços técnicos
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="field">
            <label className="field-label">E-mail</label>
            <input className="input" type="email" defaultValue="lucas@phparcondicionado.com.br" />
          </div>
          <div className="field">
            <label className="field-label">Senha</label>
            <input className="input" type="password" defaultValue="••••••••••" />
          </div>
          <button onClick={onEnter} className="btn btn-primary btn-block" style={{ marginTop: 4 }}>
            Entrar
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <button className="btn btn-ghost btn-sm" style={{ padding: 0, height: 'auto' }}>Esqueci a senha</button>
            <button className="btn btn-ghost btn-sm" style={{ padding: 0, height: 'auto' }}>Criar conta</button>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '20px 0 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div className="t-caption text-muted">Klimar • iaverde</div>
        <div style={{ fontSize: 11, color: 'var(--on-surface-muted)' }}>
          {tenantName ? `Você está acessando como ${tenantName}` : 'useklimar.com.br'}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────
function DashboardScreen({ go, tenantName, onFab }) {
  const todayAppts = APPOINTMENTS.filter(a => a.date === '01/05/2026');
  const upcomingPending = BUDGETS.filter(b => b.status === 'pending').slice(0, 3);
  return (
    <>
      <div className="appbar">
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--brand-container)',
                      color: 'var(--brand-on-container)', display: 'grid', placeItems: 'center',
                      fontWeight: 700, fontSize: 13, letterSpacing: '-0.02em' }}>
          {tenantName === 'PHP Ar Condicionado' ? 'PHP' : 'KL'}
        </div>
        <div className="flex-1" style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, color: 'var(--on-surface-muted)' }}>Bom dia, Lucas</div>
          <div className="appbar-title truncate" style={{ fontSize: 15 }}>{tenantName}</div>
        </div>
        <button className="appbar-icon"><Icon name="bell" size={22} strokeWidth={1.8} /></button>
        <Avatar name="Lucas Andrade" size="sm" />
      </div>

      <div className="scroll">
        <div className="page">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <KpiCard label="Atendimentos hoje" value="4" delta="2 concluídos" trend="flat" />
            <KpiCard label="Orçamentos pendentes" value="2" delta="R$ 10.340 em aprovação" trend="flat" />
            <KpiCard label="Faturamento mês" value="R$ 42.8k" delta="+12% vs abril" trend="up" />
            <KpiCard label="Próxima visita" value="10:30" delta="Maria Silva" trend="flat" />
          </div>

          <div>
            <div className="section-h">
              <h3>Próximos atendimentos</h3>
              <button className="link" onClick={() => go('agenda')}>Ver todos</button>
            </div>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', margin: '0 -16px', padding: '0 16px 4px' }} className="no-scrollbar">
              {todayAppts.slice(0, 4).map(a => (
                <button key={a.id} onClick={() => go('appointment', a.id)}
                        style={{ flex: '0 0 240px', textAlign: 'left', padding: 14, background: 'var(--surface-elevated)',
                                 border: '1px solid var(--outline-variant)', borderRadius: 12, display: 'flex',
                                 flexDirection: 'column', gap: 8, cursor: 'pointer' }}>
                  <div className="row between">
                    <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{a.time}</div>
                    <Badge status={a.status} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14 }} className="truncate">{a.clientName}</div>
                  <div className="t-caption truncate">{a.service}</div>
                  <div className="t-caption text-muted truncate"><Icon name="mapPin" size={11} /> {a.address}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="section-h">
              <h3>Orçamentos para aprovar</h3>
              <button className="link" onClick={() => go('budgets')}>Ver todos</button>
            </div>
            <div className="card" style={{ padding: 0 }}>
              {upcomingPending.map((b, i) => (
                <div key={b.id} className="card-row" style={{ borderBottom: i === upcomingPending.length - 1 ? 0 : '1px solid var(--outline-variant)' }}>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <div className="row gap-2" style={{ marginBottom: 2 }}>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--on-surface-muted)', fontWeight: 600 }}>#{b.number}</span>
                    </div>
                    <div style={{ fontWeight: 500 }} className="truncate">{b.clientName}</div>
                    <div className="t-caption text-muted">{b.date}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="mono" style={{ fontWeight: 700, fontSize: 15 }}>{b.total}</div>
                    <Badge status="scheduled">Pendente</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="fab" onClick={onFab}><Icon name="plus" size={28} strokeWidth={2.5} /></button>
    </>
  );
}

// ─── Agenda ───────────────────────────────────────────────────────────────
function AgendaScreen({ go }) {
  const [view, setView] = React.useState('day');
  const [filter, setFilter] = React.useState('all');
  const today = APPOINTMENTS.filter(a => a.date === '01/05/2026');

  return (
    <>
      <div className="appbar">
        <div className="flex-1">
          <div className="appbar-title">Agenda</div>
          <div className="appbar-sub">sex, 1 de maio · 4 atendimentos</div>
        </div>
        <button className="appbar-icon"><Icon name="filter" size={22} strokeWidth={1.8} /></button>
      </div>

      <div style={{ padding: '12px 16px 8px' }}>
        <div className="seg">
          {['day', 'week', 'month'].map(v => (
            <button key={v} className={view === v ? 'active' : ''} onClick={() => setView(v)}>
              {v === 'day' ? 'Dia' : v === 'week' ? 'Semana' : 'Mês'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '4px 16px 12px', display: 'flex', gap: 8, overflowX: 'auto' }} className="no-scrollbar">
        {[
          { k: 'all', label: 'Todos', count: 4 },
          { k: 'scheduled', label: 'Agendados', count: 3 },
          { k: 'in_progress', label: 'Em andamento', count: 1 },
          { k: 'done', label: 'Concluídos', count: 0 },
        ].map(f => (
          <button key={f.k} className={`chip ${filter === f.k ? 'active' : ''}`} onClick={() => setFilter(f.k)}>
            {f.label} · {f.count}
          </button>
        ))}
      </div>

      <div className="scroll">
        {view === 'day' && <DayView appointments={today} go={go} />}
        {view === 'week' && <WeekView />}
        {view === 'month' && <MonthView />}
      </div>

      <button className="fab"><Icon name="plus" size={28} strokeWidth={2.5} /></button>
    </>
  );
}

function DayView({ appointments, go }) {
  const startHour = 7, endHour = 20;
  const hours = [];
  for (let h = startHour; h <= endHour; h++) hours.push(h);
  const HOUR_H = 64;

  // place events
  const events = appointments.map(a => {
    const [hh, mm] = a.time.split(':').map(Number);
    const top = ((hh - startHour) + mm / 60) * HOUR_H;
    const height = (a.duration / 60) * HOUR_H - 4;
    return { ...a, top, height };
  });

  const statusColor = {
    scheduled: 'var(--status-scheduled)',
    scheduled_bg: 'var(--status-scheduled-bg)',
    in_progress: 'var(--status-in-progress)',
    in_progress_bg: 'var(--status-in-progress-bg)',
  };

  return (
    <div style={{ position: 'relative', padding: '8px 16px 120px', display: 'flex' }}>
      <div style={{ width: 48, flexShrink: 0 }}>
        {hours.map(h => (
          <div key={h} style={{ height: HOUR_H, color: 'var(--on-surface-muted)', fontSize: 11, fontWeight: 500,
                                paddingTop: 2, fontVariantNumeric: 'tabular-nums' }}>
            {String(h).padStart(2, '0')}:00
          </div>
        ))}
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        {hours.map((h, i) => (
          <div key={h} style={{ height: HOUR_H, borderTop: i === 0 ? 0 : '1px solid var(--outline-variant)' }} />
        ))}
        {events.map(e => {
          const isProg = e.status === 'in_progress';
          const c = isProg ? 'var(--status-in-progress)' : 'var(--status-scheduled)';
          const cBg = isProg ? 'var(--status-in-progress-bg)' : 'var(--status-scheduled-bg)';
          return (
            <button key={e.id} onClick={() => go('appointment', e.id)}
                    style={{ position: 'absolute', left: 4, right: 4, top: e.top, height: e.height,
                             background: cBg, borderLeft: `3px solid ${c}`, borderRadius: 8,
                             padding: '8px 10px', textAlign: 'left', cursor: 'pointer',
                             display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, color: c }}>
                <span className="mono">{e.time}</span>
                <span style={{ opacity: 0.6 }}>·</span>
                <span>{e.duration}min</span>
                {isProg && <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <span className="dot" style={{ width: 6, height: 6, borderRadius: '50%', background: c, animation: 'pulse 1.4s infinite' }} />
                  Em andamento
                </span>}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--on-surface)' }} className="truncate">{e.clientName}</div>
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)' }} className="truncate">{e.service}</div>
            </button>
          );
        })}
        {/* now line — 09:30 */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: ((9.5 - startHour) * HOUR_H), pointerEvents: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--error)', marginLeft: -4 }} />
            <div style={{ flex: 1, height: 2, background: 'var(--error)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function WeekView() {
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const dates = [27, 28, 29, 30, 1, 2, 3];
  const today = 4; // sex
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '32px repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
        <div />
        {days.map((d, i) => (
          <div key={d} style={{ textAlign: 'center', padding: 6 }}>
            <div style={{ fontSize: 10, color: 'var(--on-surface-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{d}</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2,
                          color: i === today ? '#fff' : 'var(--on-surface)',
                          background: i === today ? 'var(--brand)' : 'transparent',
                          width: 24, height: 24, borderRadius: '50%', lineHeight: '24px',
                          margin: '2px auto 0' }}>{dates[i]}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '32px repeat(7, 1fr)', gap: 1, background: 'var(--outline-variant)',
                    border: '1px solid var(--outline-variant)', borderRadius: 8, overflow: 'hidden' }}>
        {Array.from({ length: 12 }).map((_, hr) => (
          <React.Fragment key={hr}>
            <div style={{ background: 'var(--surface)', padding: '4px 4px', fontSize: 9, color: 'var(--on-surface-muted)',
                          textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
              {String(8 + hr).padStart(2, '0')}
            </div>
            {Array.from({ length: 7 }).map((__, day) => {
              // sample events
              let event = null;
              if (day === 4 && hr === 0) event = { c: 'var(--status-in-progress)', label: 'Boa Mesa' };
              if (day === 4 && hr === 2) event = { c: 'var(--status-scheduled)', label: 'M. Silva' };
              if (day === 4 && hr === 5) event = { c: 'var(--status-scheduled)', label: 'Verdes' };
              if (day === 4 && hr === 8) event = { c: 'var(--status-scheduled)', label: 'J. Pereira' };
              if (day === 0 && hr === 3) event = { c: 'var(--status-done)', label: 'Almeida' };
              if (day === 1 && hr === 1) event = { c: 'var(--status-done)', label: 'Lima' };
              if (day === 3 && hr === 6) event = { c: 'var(--status-done)', label: 'Boa Mesa' };
              return (
                <div key={day} style={{ background: 'var(--surface)', minHeight: 36, padding: 2, position: 'relative' }}>
                  {event && (
                    <div style={{ background: event.c, color: '#fff', fontSize: 9, fontWeight: 600,
                                  padding: '2px 4px', borderRadius: 3, lineHeight: 1.2 }} className="truncate">
                      {event.label}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function MonthView() {
  // April 2026 — Apr 1 was Wed
  const cells = [];
  // start on Mon -> shift
  const firstWeekday = 2; // Wed = 2 (mon=0)
  for (let i = 0; i < firstWeekday; i++) cells.push({ blank: true });
  for (let d = 1; d <= 30; d++) cells.push({ day: d });
  while (cells.length < 35) cells.push({ blank: true });

  const events = { 3: 1, 5: 2, 8: 1, 10: 3, 12: 1, 14: 2, 17: 4, 19: 1, 21: 2, 24: 3, 26: 1, 28: 2, 29: 1, 30: 4 };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: 'center', fontWeight: 600, marginBottom: 12, fontSize: 15 }}>Maio 2026</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
        {['S','T','Q','Q','S','S','D'].map((d,i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, color: 'var(--on-surface-muted)' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {cells.map((c, i) => {
          if (c.blank) return <div key={i} />;
          const count = events[c.day];
          const isToday = c.day === 1;
          return (
            <div key={i} style={{ aspectRatio: '1', borderRadius: 8, padding: 6, position: 'relative',
                                  background: isToday ? 'var(--brand-container)' : 'var(--surface-elevated)',
                                  border: '1px solid var(--outline-variant)',
                                  display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: isToday ? 'var(--brand-on-container)' : 'var(--on-surface)' }}>
                {c.day}
              </div>
              {count && (
                <div style={{ marginTop: 'auto', fontSize: 10, fontWeight: 600,
                              color: isToday ? 'var(--brand-on-container)' : 'var(--brand)' }}>
                  {count}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Clients list ─────────────────────────────────────────────────────────
function ClientsScreen({ go, state, setState }) {
  return (
    <>
      <div className="appbar">
        <div className="flex-1">
          <div className="appbar-title">Clientes</div>
          <div className="appbar-sub">{CLIENTS.length} cadastrados</div>
        </div>
        <button className="appbar-icon"><Icon name="filter" size={22} strokeWidth={1.8} /></button>
      </div>
      <div style={{ padding: '8px 16px 12px' }}>
        <div className="search">
          <Icon name="search" size={18} color="var(--on-surface-muted)" strokeWidth={2} />
          <input placeholder="Buscar por nome, telefone, endereço…" />
        </div>
      </div>

      {/* state switcher (Tweak-driven) */}
      <div className="scroll">
        {state === 'loading' && <ClientsLoading />}
        {state === 'empty' && (
          <EmptyState icon="users" title="Nenhum cliente cadastrado"
                      message="Comece adicionando seu primeiro cliente. Você poderá agendar atendimentos e enviar orçamentos."
                      actionLabel="Adicionar cliente" onAction={() => go('client_form')} />
        )}
        {state === 'error' && <ErrorView message="Não foi possível carregar a lista de clientes. Verifique sua conexão." onRetry={() => setState('success')} />}
        {state === 'success' && (
          <div style={{ paddingBottom: 120 }}>
            {CLIENTS.map(c => (
              <button key={c.id} onClick={() => go('client', c.id)} className="list-item" style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: 0 }}>
                <Avatar name={c.name} />
                <div className="flex-1" style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }} className="truncate">{c.name}</div>
                  </div>
                  <div className="t-caption text-muted truncate" style={{ marginTop: 2 }}>
                    {c.phone} · {c.equipmentCount} {c.equipmentCount === 1 ? 'equipamento' : 'equipamentos'}
                  </div>
                  <div className="t-caption text-muted" style={{ fontSize: 11 }}>Última visita: {c.lastVisit}</div>
                </div>
                <Icon name="chevronRight" size={18} color="var(--on-surface-muted)" strokeWidth={2} />
              </button>
            ))}
          </div>
        )}
      </div>
      <button className="fab" onClick={() => go('client_form')}><Icon name="plus" size={28} strokeWidth={2.5} /></button>
    </>
  );
}

function ClientsLoading() {
  return (
    <div style={{ paddingBottom: 120 }}>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="list-item" style={{ gap: 12 }}>
          <Skeleton w={40} h={40} r={20} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skeleton w="50%" h={14} />
            <Skeleton w="75%" h={11} />
            <Skeleton w="35%" h={10} />
          </div>
          <Skeleton w={16} h={16} r={4} />
        </div>
      ))}
    </div>
  );
}

// ─── Client detail ────────────────────────────────────────────────────────
function ClientDetail({ id, go, back }) {
  const c = CLIENTS.find(x => x.id === id) || CLIENTS[0];
  const [tab, setTab] = React.useState('equipment');
  const equipment = [
    { id: 'eq1', name: 'Split Inverter 12.000 BTU', location: 'Sala', code: 'EQ-0231', last: '12/04/2026' },
    { id: 'eq2', name: 'Split Inverter 9.000 BTU', location: 'Quarto principal', code: 'EQ-0232', last: '12/04/2026' },
    { id: 'eq3', name: 'Split 18.000 BTU', location: 'Escritório', code: 'EQ-0233', last: '15/03/2026' },
  ];
  const history = APPOINTMENTS.filter(a => a.clientId === c.id);
  const budgets = BUDGETS.filter(b => b.clientId === c.id);

  return (
    <>
      <div className="appbar">
        <button className="appbar-icon" onClick={back}><Icon name="chevronLeft" size={22} strokeWidth={2} /></button>
        <div className="flex-1 truncate">
          <div className="appbar-title truncate">{c.name}</div>
          <div className="appbar-sub">Cliente desde abr/2024</div>
        </div>
        <button className="appbar-icon"><Icon name="edit" size={20} strokeWidth={1.8} /></button>
      </div>

      <div className="scroll">
        <div style={{ padding: '20px 16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Avatar name={c.name} size="lg" />
          <div style={{ textAlign: 'center' }}>
            <div className="t-headline-s">{c.name}</div>
            <div className="t-caption text-muted">{c.equipmentCount} equipamentos · {history.length} atendimentos</div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button className="btn btn-secondary btn-sm"><Icon name="phone" size={16} strokeWidth={2} />Ligar</button>
            <button className="btn btn-secondary btn-sm" style={{ background: '#25D36620', color: '#1ea752' }}>
              <Icon name="whatsapp" size={16} strokeWidth={2} />WhatsApp
            </button>
            <button className="btn btn-secondary btn-sm"><Icon name="mapPin" size={16} strokeWidth={2} />Maps</button>
          </div>
        </div>

        <div style={{ padding: 16 }}>
          <div className="card" style={{ padding: 0 }}>
            <div className="card-row">
              <Icon name="phone" size={18} color="var(--on-surface-muted)" strokeWidth={1.8} />
              <div className="flex-1">
                <div className="t-label" style={{ marginBottom: 0 }}>Telefone</div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 500 }}>{c.phone}</div>
              </div>
            </div>
            <div className="card-row">
              <Icon name="mapPin" size={18} color="var(--on-surface-muted)" strokeWidth={1.8} />
              <div className="flex-1">
                <div className="t-label" style={{ marginBottom: 0 }}>Endereço</div>
                <div style={{ fontSize: 14 }}>{c.address}</div>
                <div className="mono t-caption text-muted">CEP {c.cep}</div>
              </div>
            </div>
            <div className="card-row">
              <Icon name="info" size={18} color="var(--on-surface-muted)" strokeWidth={1.8} />
              <div className="flex-1">
                <div className="t-label" style={{ marginBottom: 0 }}>E-mail</div>
                <div style={{ fontSize: 14 }}>{c.email}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs" style={{ padding: '0 16px' }}>
          <button className={tab === 'equipment' ? 'active' : ''} onClick={() => setTab('equipment')}>
            Equipamentos ({equipment.length})
          </button>
          <button className={tab === 'history' ? 'active' : ''} onClick={() => setTab('history')}>
            Histórico ({history.length})
          </button>
          <button className={tab === 'budgets' ? 'active' : ''} onClick={() => setTab('budgets')}>
            Orçamentos ({budgets.length})
          </button>
        </div>

        <div style={{ paddingBottom: 100 }}>
          {tab === 'equipment' && (
            <div>
              {equipment.map(e => (
                <div key={e.id} className="list-item">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface-container-high)', display: 'grid', placeItems: 'center', color: 'var(--on-surface-variant)' }}>
                    <Icon name="air" size={20} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }} className="truncate">{e.name}</div>
                    <div className="t-caption text-muted truncate">{e.location} · última manutenção {e.last}</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--on-surface-muted)' }}>#{e.code}</div>
                  </div>
                  <button className="appbar-icon"><Icon name="qr" size={18} strokeWidth={1.8} /></button>
                </div>
              ))}
              <div style={{ padding: 16 }}>
                <button className="btn btn-secondary btn-block">
                  <Icon name="plus" size={18} strokeWidth={2.2} />Adicionar equipamento
                </button>
              </div>
            </div>
          )}
          {tab === 'history' && (
            <div style={{ padding: 16, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 30, top: 24, bottom: 24, width: 2, background: 'var(--outline-variant)' }} />
              {history.length === 0 ? (
                <EmptyState icon="history" title="Sem histórico" message="Quando este cliente tiver atendimentos, eles aparecerão aqui." />
              ) : history.map(a => (
                <button key={a.id} onClick={() => go('appointment', a.id)} style={{ display: 'flex', gap: 12, marginBottom: 16, background: 'transparent', border: 0, padding: 0, width: '100%', textAlign: 'left', cursor: 'pointer' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--brand-container)', color: 'var(--brand-on-container)', display: 'grid', placeItems: 'center', flexShrink: 0, zIndex: 1 }}>
                    <Icon name="check" size={14} strokeWidth={2.5} />
                  </div>
                  <div className="card flex-1" style={{ padding: 12 }}>
                    <div className="row between" style={{ marginBottom: 4 }}>
                      <div className="mono" style={{ fontSize: 12, color: 'var(--on-surface-muted)', fontWeight: 600 }}>{a.osNumber}</div>
                      <Badge status={a.status} />
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{a.service}</div>
                    <div className="t-caption text-muted">{a.date} às {a.time}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {tab === 'budgets' && (
            <div style={{ padding: 16 }}>
              {budgets.length === 0 ? (
                <EmptyState icon="receipt" title="Nenhum orçamento" message="Crie um orçamento para este cliente." actionLabel="Novo orçamento" />
              ) : budgets.map(b => (
                <div key={b.id} className="card" style={{ marginBottom: 8, padding: 12 }}>
                  <div className="row between" style={{ marginBottom: 4 }}>
                    <div className="mono" style={{ fontSize: 12, color: 'var(--on-surface-muted)', fontWeight: 600 }}>#{b.number}</div>
                    <div className="mono" style={{ fontWeight: 700, fontSize: 15 }}>{b.total}</div>
                  </div>
                  <div className="row between">
                    <div className="t-caption text-muted">{b.date}</div>
                    <Badge status={b.status === 'approved' ? 'done' : b.status === 'rejected' ? 'cancelled' : 'scheduled'}>
                      {b.status === 'approved' ? 'Aprovado' : b.status === 'rejected' ? 'Recusado' : b.status === 'pending' ? 'Pendente' : 'Rascunho'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Object.assign(window, { LoginScreen, DashboardScreen, AgendaScreen, ClientsScreen, ClientDetail });
