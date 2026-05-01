// Klimar — shared components & icons
// Lucide-style stroke icons inline (24x24)

const Icon = ({ name, size = 24, color = "currentColor", strokeWidth = 2, ...rest }) => {
  const paths = {
    home: <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5Z"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>,
    users: <><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.7-3.2 3.4-5.5 6.5-5.5s5.8 2.3 6.5 5.5"/><circle cx="17" cy="6.5" r="2.5"/><path d="M21.5 16c-.4-1.9-1.7-3.5-3.5-4"/></>,
    receipt: <><path d="M5 3h14v18l-3-2-3 2-3-2-3 2-2-1.3V3Z"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
    more: <><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    bell: <><path d="M6 8a6 6 0 1 1 12 0c0 5 2 7 2 7H4s2-2 2-7Z"/><path d="M10 19a2 2 0 0 0 4 0"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    filter: <><path d="M4 5h16M7 12h10M10 19h4"/></>,
    chevronRight: <><path d="m9 6 6 6-6 6"/></>,
    chevronLeft: <><path d="m15 6-6 6 6 6"/></>,
    chevronDown: <><path d="m6 9 6 6 6-6"/></>,
    arrowRight: <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    arrowUp: <><path d="m6 9 6-6 6 6M12 3v18"/></>,
    arrowDown: <><path d="m6 15 6 6 6-6M12 3v18"/></>,
    phone: <><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></>,
    whatsapp: <><path d="M3 21l1.7-5A8.5 8.5 0 1 1 9 21H3Z"/><path d="M8.5 11c.5 2.2 2.3 4 4.5 4.5l1.5-1.5 2.5 1.2c0 1-.8 1.8-1.8 1.8a7 7 0 0 1-7-7c0-1 .8-1.8 1.8-1.8l1.2 2.5L8.5 11Z" fill="currentColor" stroke="none"/></>,
    map: <><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/></>,
    mapPin: <><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></>,
    camera: <><path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"/><circle cx="12" cy="13" r="3.5"/></>,
    qr: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 19h3M14 21h7"/></>,
    check: <><path d="m4 12 5 5L20 6"/></>,
    checkCircle: <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
    circle: <><circle cx="12" cy="12" r="9"/></>,
    x: <><path d="m6 6 12 12M18 6 6 18"/></>,
    edit: <><path d="M16 4 20 8 8 20H4v-4L16 4Z"/></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13M10 11v6M14 11v6"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.7l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.7-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.7.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.7 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.7.3h.1a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.7-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.7v.1a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4 4-7 8-7s7.3 3 8 7"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M5 5l1.4 1.4M17.6 17.6 19 19M2 12h2M20 12h2M5 19l1.4-1.4M17.6 6.4 19 5"/></>,
    moon: <><path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10Z"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    play: <><path d="M7 5v14l12-7L7 5Z" fill="currentColor"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></>,
    wifiOff: <><path d="M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M5 12.5a10 10 0 0 1 5-2.7M19 12.5a10 10 0 0 0-3-2.3M12 20h.01M2 8.8a16 16 0 0 1 4-2.5M22 8.8a16 16 0 0 0-9-3.7"/></>,
    refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 4v4h-4M21 12a9 9 0 0 1-15 6.7L3 16M3 20v-4h4"/></>,
    alert: <><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 18h.01"/></>,
    file: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6"/></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M5 21h14"/></>,
    share: <><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8 11 8-4M8 13l8 4"/></>,
    print: <><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6Z"/></>,
    snowflake: <><path d="M12 3v18M3 12h18M5 5l14 14M19 5 5 19M12 6l-2 2M12 6l2 2M12 18l-2-2M12 18l2-2M6 12l2-2M6 12l2 2M18 12l-2-2M18 12l-2 2"/></>,
    mic: <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></>,
    palette: <><path d="M12 21a9 9 0 1 1 9-9c0 2-2 3-4 3h-2a2 2 0 0 0-1 4 1.5 1.5 0 0 1-2 2Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16.5" cy="10.5" r="1"/></>,
    google: <><path d="M21 12a9 9 0 1 1-3-6.7L15 8a5 5 0 1 0 1.5 5H12v-3h9c.1.7 0 1.4 0 2Z"/></>,
    package: <><path d="m12 3 9 5v8l-9 5-9-5V8l9-5Z"/><path d="m3 8 9 5 9-5M12 13v10"/></>,
    flame: <><path d="M12 22a7 7 0 0 0 4-13c0 3-3 4-3 7 0 0-2-1-2-4 0-3 3-5 1-9-2 5-7 8-7 13a7 7 0 0 0 7 6Z"/></>,
    history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2"/></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    upload: <><path d="M12 21V9m-5 5 5-5 5 5M5 3h14"/></>,
    air: <><path d="M3 8a3 3 0 0 1 5-2.2A3 3 0 0 1 13 4M3 14a3 3 0 0 0 5 2.2M9 12h12M9 18h7M9 6h7"/></>,
    bolt: <><path d="m13 3-9 12h6l-1 6 9-12h-6l1-6Z"/></>,
    pen: <><path d="M14 4 20 10 8 22H2v-6L14 4Z"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name] || null}
    </svg>
  );
};

// Avatar with deterministic color from string
const avatarColors = ['#0B5FFF', '#06B6D4', '#16A34A', '#F59E0B', '#8B5CF6', '#EC4899', '#0284C7', '#DC2626'];
function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return avatarColors[h % avatarColors.length];
}
function initials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
const Avatar = ({ name = '?', size = 'md' }) => (
  <div className={`avatar ${size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : ''}`}
       style={{ background: avatarColor(name) }}>
    {initials(name)}
  </div>
);

// Status badge
const STATUS_LABELS = {
  scheduled: 'Agendado',
  in_progress: 'Em andamento',
  done: 'Concluído',
  cancelled: 'Cancelado',
  overdue: 'Atrasado',
};
const Badge = ({ status, children }) => {
  const cls = (status || '').replace('_', '-');
  return (
    <span className={`badge ${cls}`}>
      <span className="dot" />
      {children || STATUS_LABELS[status] || status}
    </span>
  );
};

// KPI card
const KpiCard = ({ label, value, delta, trend, hint, onClick }) => (
  <button className="card kpi" onClick={onClick}
          style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 8, border: '1px solid var(--outline-variant)', padding: 14, background: 'var(--surface-elevated)' }}>
    <div className="t-label-up" style={{ color: 'var(--on-surface-muted)' }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{value}</div>
    </div>
    {delta && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 500,
                    color: trend === 'up' ? 'var(--success)' : trend === 'down' ? 'var(--error)' : 'var(--on-surface-muted)' }}>
        {trend === 'up' && <Icon name="arrowUp" size={12} strokeWidth={2.5} />}
        {trend === 'down' && <Icon name="arrowDown" size={12} strokeWidth={2.5} />}
        {delta}
      </div>
    )}
    {hint && <div className="t-caption" style={{ color: 'var(--on-surface-muted)' }}>{hint}</div>}
  </button>
);

// Empty / Error / Loading
const EmptyState = ({ icon = 'package', title, message, actionLabel, onAction }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '48px 24px', gap: 16 }}>
    <div style={{ width: 72, height: 72, borderRadius: 20, background: 'var(--surface-container)', display: 'grid', placeItems: 'center', color: 'var(--on-surface-muted)' }}>
      <Icon name={icon} size={32} strokeWidth={1.6} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 280 }}>
      <div className="t-headline-s">{title}</div>
      {message && <div className="t-body text-muted">{message}</div>}
    </div>
    {actionLabel && (
      <button className="btn btn-primary" onClick={onAction} style={{ marginTop: 8 }}>
        <Icon name="plus" size={18} strokeWidth={2.5} />
        {actionLabel}
      </button>
    )}
  </div>
);

const ErrorView = ({ message = 'Não foi possível carregar.', onRetry }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '48px 24px', gap: 16 }}>
    <div style={{ width: 72, height: 72, borderRadius: 20, background: 'var(--status-overdue-bg)', display: 'grid', placeItems: 'center', color: 'var(--status-overdue)' }}>
      <Icon name="alert" size={32} strokeWidth={1.6} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 280 }}>
      <div className="t-headline-s">Algo deu errado</div>
      <div className="t-body text-muted">{message}</div>
    </div>
    {onRetry && (
      <button className="btn btn-secondary" onClick={onRetry} style={{ marginTop: 8 }}>
        <Icon name="refresh" size={18} strokeWidth={2.2} />
        Tentar novamente
      </button>
    )}
  </div>
);

const Skeleton = ({ w = '100%', h = 16, r = 8, style }) => (
  <div className="sk" style={{ width: w, height: h, borderRadius: r, ...style }} />
);

// Bottom sheet
const BottomSheet = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', animation: 'fadeIn 200ms' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'var(--surface)',
                    borderRadius: '20px 20px 0 0', padding: '12px 16px calc(24px + env(safe-area-inset-bottom))',
                    boxShadow: '0 -8px 32px rgba(0,0,0,0.2)', animation: 'sheetUp 250ms cubic-bezier(.2,.7,.3,1)' }}>
        <div style={{ width: 36, height: 4, background: 'var(--outline)', borderRadius: 2, margin: '4px auto 16px' }} />
        {title && <div className="t-headline-s" style={{ marginBottom: 12 }}>{title}</div>}
        {children}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes sheetUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
      `}</style>
    </div>
  );
};

Object.assign(window, {
  Icon, Avatar, Badge, KpiCard, EmptyState, ErrorView, Skeleton, BottomSheet,
  STATUS_LABELS, avatarColor, initials,
});
