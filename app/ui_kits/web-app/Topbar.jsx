function Topbar({ title, subtitle, search, onSearch }) {
  const { Icon } = window.EverLedgeDesignSystem_de3ce8;
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

      <label style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px',
        background: 'var(--neutral-50)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)', width: 240, cursor: 'text',
      }}>
        <Icon name="search" size={17} color="var(--text-muted)" />
        <input
          type="search"
          placeholder="Search estate…"
          value={search || ''}
          onChange={e => onSearch && onSearch(e.target.value)}
          style={{
            border: 'none', outline: 'none', background: 'transparent',
            fontSize: 'var(--text-sm)', color: 'var(--text-strong)',
            fontFamily: 'var(--font-sans)', width: '100%',
          }}
        />
        {search && (
          <button onClick={() => onSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <Icon name="x" size={14} color="var(--neutral-400)" />
          </button>
        )}
      </label>
    </header>
  );
}
window.Topbar = Topbar;
