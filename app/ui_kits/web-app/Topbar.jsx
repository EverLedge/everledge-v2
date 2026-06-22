/* Top bar: page title, search, notifications, account. */
function Topbar({ title, subtitle, action }) {
  const { Icon, Avatar } = window.EverLedgeDesignSystem_de3ce8;
  const D = window.EL_DATA;
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 20,
      padding: '20px 36px', borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)', position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: 'var(--text-h2)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{title}</h1>
        {subtitle && <p style={{ margin: '4px 0 0', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px',
        background: 'var(--neutral-50)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)', width: 220, color: 'var(--text-muted)',
      }}>
        <Icon name="search" size={17} color="var(--text-muted)" />
        <span style={{ fontSize: 'var(--text-sm)' }}>Search estate…</span>
      </div>

      {action}

      <button style={{
        width: 40, height: 40, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)',
        background: 'var(--surface-card)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', position: 'relative',
      }}>
        <Icon name="bell" size={19} color="var(--neutral-600)" />
        <span style={{ position: 'absolute', top: 9, right: 9, width: 7, height: 7, borderRadius: '50%', background: 'var(--status-warning)', border: '1.5px solid #fff' }} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 11, paddingLeft: 6 }}>
        <Avatar name={D.user.name} tone="navy" size={40} />
        <div style={{ lineHeight: 1.25 }}>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{D.user.name}</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gold-700)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="sparkles" size={11} color="var(--gold-600)" /> {D.user.plan}
          </div>
        </div>
      </div>
    </header>
  );
}
window.Topbar = Topbar;
