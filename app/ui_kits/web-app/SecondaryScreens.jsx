/* Executors & Documents screens. */
function ExecutorsScreen() {
  const { Card, Avatar, Badge, Button, Icon } = window.EverLedgeDesignSystem_de3ce8;
  const D = window.EL_DATA;
  return (
    <div style={{ padding: '32px 36px 56px', maxWidth: 'var(--content-max)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <p style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.55 }}>
          The people entrusted to administer your estate. Keep their details current so your affairs can be settled without delay.
        </p>
        <Button variant="primary" iconLeft={<Icon name="plus" size={16} />}>Add executor</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {D.executors.map((e, i) => (
          <Card key={i} accent={e.tone === 'gold' ? 'gold' : null} padding="var(--space-6)">
            <Avatar name={e.name} size={52} tone={e.tone} style={{ marginBottom: 16 }} />
            <div style={{ fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)' }}>{e.name}</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 4, marginBottom: 16 }}>{e.relationship}</div>
            <Badge tone={e.tone === 'gold' ? 'gold' : 'primary'}>{e.role}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
window.ExecutorsScreen = ExecutorsScreen;

function DocumentsScreen() {
  const { Card, Badge, Icon, Button } = window.EverLedgeDesignSystem_de3ce8;
  const D = window.EL_DATA;
  return (
    <div style={{ padding: '32px 36px 56px', maxWidth: 'var(--content-max)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <p style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--text-muted)' }}>Securely stored estate documents, available to your executors when needed.</p>
        <Button variant="secondary" iconLeft={<Icon name="plus" size={16} />}>Upload document</Button>
      </div>
      <Card padding="0">
        {D.documents.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', borderBottom: i < D.documents.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
            <span style={{ width: 42, height: 42, flex: 'none', borderRadius: 'var(--radius-md)', background: 'var(--neutral-100)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={d.icon} size={20} color="var(--navy-700)" />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-strong)' }}>{d.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>{d.meta}</div>
            </div>
            <Badge tone="neutral">{d.tag}</Badge>
            <button style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="download" size={17} color="var(--neutral-500)" />
            </button>
          </div>
        ))}
      </Card>
    </div>
  );
}
window.DocumentsScreen = DocumentsScreen;
