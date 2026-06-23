function OverviewScreen({ search }) {
  const { Card, Badge, Icon, Avatar, Button } = window.EverLedgeDesignSystem_de3ce8;
  const [state, setState] = React.useState({ assets: [], gifts: [], executors: [], docs: [], loading: true });
  const sb = window._supabase;

  React.useEffect(() => {
    async function load() {
      const [{ data: assets }, { data: gifts }, { data: executors }, { data: docs }] = await Promise.all([
        sb.from('assets').select('*'),
        sb.from('gifts').select('*').order('gift_date', { ascending: false }),
        sb.from('executors').select('*'),
        sb.from('documents').select('id,name,tag,created_at').order('created_at', { ascending: false }).limit(5),
      ]);
      setState({ assets: assets || [], gifts: gifts || [], executors: executors || [], docs: docs || [], loading: false });
    }
    load();
  }, []);

  const { assets, gifts, executors, docs, loading } = state;
  const MS7 = 7 * 365.25 * 24 * 3600 * 1000;
  const fmt = (n) => '£' + Number(n).toLocaleString('en-GB', { minimumFractionDigits: 0 });

  const grossEstate = assets.reduce((s, a) => s + Number(a.value), 0);
  const activePETs = gifts.filter(g => Date.now() - new Date(g.gift_date) < MS7 && !g.from_surplus_income);
  const lifetimeGifts = activePETs.reduce((s, g) => s + Number(g.value), 0);
  const hasProperty = assets.some(a => a.category === 'Property');
  const NRB = 325000;
  const RNRB = hasProperty ? 175000 : 0;
  const nrbUsed = Math.min(NRB, lifetimeGifts);
  const nrbLeft = NRB - nrbUsed;
  const taxable = Math.max(0, grossEstate - nrbLeft - RNRB);
  const ihtExposure = taxable * 0.4;

  const statCards = [
    { label: 'Gross estate value', value: fmt(grossEstate), sub: `${assets.length} asset${assets.length !== 1 ? 's' : ''} recorded`, icon: 'landmark', tone: 'blue' },
    { label: 'Active lifetime gifts', value: fmt(lifetimeGifts), sub: `${activePETs.length} PET${activePETs.length !== 1 ? 's' : ''} within 7 years`, icon: 'gift', tone: 'gold' },
    { label: 'Estimated IHT', value: fmt(ihtExposure), sub: ihtExposure > 0 ? 'At 40% on taxable estate' : 'Within nil rate bands', icon: 'shield-alert', tone: ihtExposure > 0 ? 'amber' : 'green' },
    { label: 'Executors named', value: executors.length, sub: executors.length === 0 ? 'No executors added yet' : executors.map(e => e.name.split(' ')[0]).join(', '), icon: 'users', tone: 'navy' },
  ];

  const toneColors = {
    blue: { bg: 'var(--blue-50)', fg: 'var(--blue-700)' },
    gold: { bg: 'var(--gold-50)', fg: 'var(--gold-700)' },
    amber: { bg: 'var(--amber-50)', fg: 'var(--amber-700)' },
    green: { bg: 'var(--green-50)', fg: 'var(--green-700)' },
    navy: { bg: 'var(--blue-50)', fg: 'var(--navy-700)' },
  };

  if (loading) {
    return <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Loading your estate overview…</div>;
  }

  const recentGifts = gifts.slice(0, 5);

  return (
    <div style={{ padding: '32px 36px 56px', maxWidth: 'var(--content-max)' }}>

      {/* IHT Alert */}
      {ihtExposure > 0 && (
        <div style={{ marginBottom: 24, padding: '14px 18px', background: 'var(--amber-50)', border: '1px solid #EEDCBE', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 12, fontSize: 'var(--text-sm)', color: 'var(--amber-700)' }}>
          <Icon name="alert-triangle" size={18} color="var(--amber-600)" style={{ flex: 'none' }} />
          <div><strong>IHT Exposure:</strong> Your estate has an estimated {fmt(ihtExposure)} liability. Review the Reports tab for a full breakdown and consider speaking with an adviser.</div>
        </div>
      )}

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 28 }}>
        {statCards.map((s) => {
          const c = toneColors[s.tone] || toneColors.blue;
          return (
            <Card key={s.label} padding="var(--space-5)">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: c.bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={s.icon} size={18} color={c.fg} />
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.3rem, 1.8vw, 1.65rem)', fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>{s.value}</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-muted)', marginTop: 2, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{s.sub}</div>
            </Card>
          );
        })}
      </div>

      {/* Two-col: gifts + estate breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>

        {/* Recent gifts */}
        <Card padding="0">
          <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-strong)' }}>Recent Gifts</div>
            <Badge tone={activePETs.length > 0 ? 'warning' : 'neutral'}>{activePETs.length} active PET{activePETs.length !== 1 ? 's' : ''}</Badge>
          </div>
          {recentGifts.length === 0 ? (
            <div style={{ padding: '32px 22px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>No gifts recorded yet.</div>
          ) : (
            recentGifts.map((g, i) => {
              const yearsAgo = (Date.now() - new Date(g.gift_date)) / (365.25 * 24 * 3600 * 1000);
              const isPET = yearsAgo < 7 && !g.from_surplus_income;
              return (
                <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderBottom: i < recentGifts.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <Avatar name={g.recipient} size={34} tone="navy" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{g.recipient}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{new Date(g.gift_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{'£' + Number(g.value).toLocaleString('en-GB')}</div>
                    <Badge tone={g.from_surplus_income ? 'success' : isPET ? 'warning' : 'success'} style={{ marginTop: 3 }}>{g.from_surplus_income ? 'Exempt' : isPET ? 'PET' : 'Exempt'}</Badge>
                  </div>
                </div>
              );
            })
          )}
        </Card>

        {/* Estate breakdown */}
        <Card padding="0">
          <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-strong)' }}>Estate Breakdown</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{fmt(grossEstate)}</div>
          </div>
          {assets.length === 0 ? (
            <div style={{ padding: '32px 22px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>No assets recorded yet.</div>
          ) : (() => {
            const byCat = assets.reduce((acc, a) => {
              acc[a.category] = (acc[a.category] || 0) + Number(a.value);
              return acc;
            }, {});
            const catIcon = { Property: 'home', Investments: 'trending-up', Cash: 'banknote', Business: 'briefcase', Pension: 'clock', Insurance: 'umbrella', Other: 'box' };
            return Object.entries(byCat).map(([cat, val], i, arr) => {
              const pct = grossEstate > 0 ? Math.round((val / grossEstate) * 100) : 0;
              return (
                <div key={cat} style={{ padding: '14px 22px', borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <Icon name={catIcon[cat] || 'box'} size={15} color="var(--neutral-500)" />
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-strong)', flex: 1 }}>{cat}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{pct}%</span>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)', fontFamily: 'var(--font-mono)' }}>{fmt(val)}</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--surface-sunken)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: pct + '%', background: 'var(--blue-600)', borderRadius: 'var(--radius-pill)' }} />
                  </div>
                </div>
              );
            });
          })()}
        </Card>
      </div>

      {/* Documents row */}
      {docs.length > 0 && (
        <Card padding="0">
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-strong)' }}>Recent Documents</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: '16px 22px' }}>
            {docs.map(d => (
              <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', color: 'var(--text-strong)' }}>
                <Icon name="file-text" size={14} color="var(--neutral-500)" />
                <span>{d.name}</span>
                {d.tag && <Badge tone="neutral">{d.tag}</Badge>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Empty state call-to-action when no data at all */}
      {assets.length === 0 && gifts.length === 0 && executors.length === 0 && (
        <Card padding="var(--space-8)" style={{ textAlign: 'center', marginTop: 24 }}>
          <div style={{ fontSize: 'var(--text-h3)', fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>Welcome to EverLedge</div>
          <p style={{ margin: '0 auto 24px', color: 'var(--text-muted)', maxWidth: 440, lineHeight: 1.6, fontSize: 'var(--text-base)' }}>
            Start by adding your estate assets, recording any lifetime gifts, and naming your executors. Your overview will populate as you go.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Add assets', icon: 'landmark', view: 'estate' },
              { label: 'Record a gift', icon: 'gift', view: 'gifts' },
              { label: 'Add executors', icon: 'users', view: 'executors' },
            ].map(a => (
              <Button key={a.label} variant="secondary" iconLeft={<Icon name={a.icon} size={16} />}>{a.label}</Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
window.OverviewScreen = OverviewScreen;
