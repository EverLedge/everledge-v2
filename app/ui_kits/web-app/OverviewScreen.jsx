/* Overview / dashboard — clarity and reassurance. */
function OverviewScreen() {
  const { SummaryCard, Card, PETTimeline, Icon, Button, Badge } = window.EverLedgeDesignSystem_de3ce8;
  const D = window.EL_DATA;

  const actionTone = {
    warning: { bg: 'var(--status-warning-bg)', fg: 'var(--status-warning)' },
    primary: { bg: 'var(--blue-50)', fg: 'var(--blue-600)' },
    neutral: { bg: 'var(--neutral-100)', fg: 'var(--neutral-600)' },
  };

  return (
    <div style={{ padding: '32px 36px 56px', maxWidth: 'var(--content-max)' }}>
      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 24 }}>
        <SummaryCard label="Net Estate Value" value={D.summary.netEstate} icon="landmark" delta={D.summary.netEstateDelta} caption="vs last valuation" />
        <SummaryCard label="Lifetime Gifts" value={D.summary.lifetimeGifts} icon="gift" caption="6 recorded" />
        <SummaryCard label="Estimated IHT Exposure" value={D.summary.ihtExposure} icon="shield" caption="after reliefs" />
        <SummaryCard label="Executors Recorded" value={D.summary.executors} icon="users" caption="1 pending" />
      </div>

      {/* Signature PET timeline */}
      <Card padding="var(--space-6)" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 6 }}>Next exemption milestone</div>
            <h3 style={{ margin: 0, fontSize: 'var(--text-h3)', fontWeight: 600, color: 'var(--text-strong)' }}>Gift to Eleanor — £250,000</h3>
          </div>
          <Button variant="secondary" size="sm" iconRight={<Icon name="chevron-right" size={16} />}>View all PETs</Button>
        </div>
        <PETTimeline giftDate="2021-04-02" />
      </Card>

      {/* Two-column: activity + action centre */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
        <Card padding="var(--space-6)">
          <h3 style={{ margin: '0 0 18px', fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)' }}>Recent activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {D.activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: i < D.activity.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ width: 34, height: 34, flex: 'none', borderRadius: 'var(--radius-md)', background: 'var(--blue-50)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={a.icon} size={17} color="var(--blue-600)" />
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-strong)' }}>{a.text}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{a.who}</div>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{a.when}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="var(--space-6)">
          <h3 style={{ margin: '0 0 18px', fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)' }}>Action centre</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {D.actions.map((a, i) => {
              const t = actionTone[a.tone];
              return (
                <div key={i} style={{ display: 'flex', gap: 13, padding: 14, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                  <span style={{ width: 32, height: 32, flex: 'none', borderRadius: 'var(--radius-sm)', background: t.bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={a.icon} size={16} color={t.fg} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{a.title}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.4 }}>{a.detail}</div>
                  </div>
                  <Icon name="chevron-right" size={16} color="var(--neutral-400)" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
window.OverviewScreen = OverviewScreen;
