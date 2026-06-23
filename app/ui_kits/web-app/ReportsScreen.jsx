function ReportsScreen() {
  const { Card, Badge, Icon } = window.EverLedgeDesignSystem_de3ce8;
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const sb = window._supabase;

  React.useEffect(() => {
    async function load() {
      const [{ data: assets }, { data: gifts }, { data: executors }] = await Promise.all([
        sb.from('assets').select('*'),
        sb.from('gifts').select('*'),
        sb.from('executors').select('id'),
      ]);
      setData({ assets: assets || [], gifts: gifts || [], executors: executors || [] });
      setLoading(false);
    }
    load();
  }, []);

  const fmt = (n) => '£' + Number(n).toLocaleString('en-GB', { minimumFractionDigits: 0 });
  const MS_YEAR = 365.25 * 24 * 3600 * 1000;

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Calculating your IHT position…</div>;

  const { assets, gifts } = data;

  const grossEstate = assets.reduce((s, a) => s + Number(a.value), 0);
  const hasProperty = assets.some(a => a.category === 'Property');
  const NRB = 325000;
  const RNRB = hasProperty ? 175000 : 0;
  const MS7 = 7 * MS_YEAR;
  const activeGifts = gifts.filter(g => Date.now() - new Date(g.gift_date) < MS7 && !g.from_surplus_income);
  const activeGiftsTotal = activeGifts.reduce((s, g) => s + Number(g.value), 0);
  const nrbUsedByGifts = Math.min(NRB, activeGiftsTotal);
  const nrbForEstate = NRB - nrbUsedByGifts;
  const taxable = Math.max(0, grossEstate - nrbForEstate - RNRB);
  const ihtLiability = taxable * 0.4;
  const netLegacy = grossEstate - ihtLiability;

  const pctTaxable = grossEstate > 0 ? (taxable / grossEstate) : 0;
  const pctNRB = grossEstate > 0 ? (Math.min(nrbForEstate, grossEstate) / grossEstate) : 0;
  const pctRNRB = grossEstate > 0 ? (Math.min(RNRB, Math.max(0, grossEstate - nrbForEstate)) / grossEstate) : 0;

  const taperRows = [
    { years: '0–3', pct: 40, tone: 'danger' },
    { years: '3–4', pct: 32, tone: 'warning' },
    { years: '4–5', pct: 24, tone: 'warning' },
    { years: '5–6', pct: 16, tone: 'warning' },
    { years: '6–7', pct: 8, tone: 'primary' },
    { years: '7+',  pct: 0,  tone: 'success' },
  ];

  return (
    <div style={{ padding: '32px 36px 56px', maxWidth: 'var(--content-max)' }}>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 24 }}>
        {[
          { label: 'Gross Estate Value', value: fmt(grossEstate), sub: 'Sum of all assets', color: 'var(--text-strong)' },
          { label: 'Estimated IHT Liability', value: fmt(ihtLiability), sub: 'At current 40% rate', color: ihtLiability > 0 ? 'var(--amber-600)' : 'var(--green-600)' },
          { label: 'Net Legacy to Beneficiaries', value: fmt(netLegacy), sub: 'After estimated IHT', color: 'var(--blue-700)' },
        ].map((m, i) => (
          <Card key={i} padding="var(--space-5)">
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-muted)', marginBottom: 10 }}>{m.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.4rem, 2vw, 1.75rem)', fontWeight: 500, letterSpacing: '-0.03em', color: m.color }}>{m.value}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 6 }}>{m.sub}</div>
          </Card>
        ))}
      </div>

      {/* Tax breakdown bar */}
      <Card padding="var(--space-6)" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 6 }}>IHT Allocation Breakdown</div>
        <h3 style={{ margin: '0 0 20px', fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)' }}>How your estate is taxed</h3>
        <div style={{ height: 14, borderRadius: 'var(--radius-pill)', overflow: 'hidden', background: 'var(--surface-sunken)', display: 'flex', marginBottom: 16 }}>
          <div style={{ width: (pctNRB * 100) + '%', background: 'var(--blue-600)', transition: 'width 0.6s ease' }} />
          <div style={{ width: (pctRNRB * 100) + '%', background: 'var(--blue-300)', transition: 'width 0.6s ease' }} />
          <div style={{ width: (pctTaxable * 100) + '%', background: 'var(--amber-600)', transition: 'width 0.6s ease' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { color: 'var(--blue-600)', label: 'Nil Rate Band', value: fmt(Math.min(nrbForEstate, grossEstate)) },
            { color: 'var(--blue-300)', label: 'Residence Nil Rate Band', value: hasProperty ? fmt(Math.min(RNRB, Math.max(0, grossEstate - nrbForEstate))) : 'Not applicable' },
            { color: 'var(--amber-600)', label: 'Taxable at 40%', value: fmt(taxable) },
          ].map((l, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: l.color, flex: 'none' }} />
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{l.label}</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)', fontFamily: 'var(--font-mono)' }}>{l.value}</div>
              </div>
            </div>
          ))}
        </div>
        {!hasProperty && (
          <div style={{ marginTop: 16, padding: '10px 14px', background: 'var(--amber-50)', border: '1px solid #EEDCBE', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', color: 'var(--amber-700)' }}>
            No property assets recorded — the £175,000 Residence Nil Rate Band is not being applied. Add a property in Estate to see if it applies.
          </div>
        )}
        {nrbUsedByGifts > 0 && (
          <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--blue-50)', border: '1px solid var(--blue-100)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', color: 'var(--blue-700)' }}>
            £{nrbUsedByGifts.toLocaleString('en-GB')} of your Nil Rate Band is being used by gifts made within the last 7 years, reducing the allowance available to your estate.
          </div>
        )}
      </Card>

      {/* Two col: PETs + taper table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
        <Card padding="var(--space-6)">
          <h3 style={{ margin: '0 0 18px', fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)' }}>Active Lifetime Gifts (PETs)</h3>
          {activeGifts.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>No gifts made within the last 7 years.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {activeGifts.map((g, i) => {
                const yearsElapsed = (Date.now() - new Date(g.gift_date)) / MS_YEAR;
                const yearsLeft = Math.max(0, 7 - yearsElapsed);
                const exemptDate = new Date(new Date(g.gift_date).getTime() + 7 * MS_YEAR);
                return (
                  <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < activeGifts.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{g.recipient}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>Exempt {exemptDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{'£' + Number(g.value).toLocaleString('en-GB')}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: yearsLeft <= 2 ? 'var(--status-warning)' : 'var(--text-muted)', marginTop: 2 }}>{yearsLeft.toFixed(1)} yrs left</div>
                    </div>
                  </div>
                );
              })}
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '2px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-muted)' }}>Total active PETs</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-strong)' }}>{fmt(activeGiftsTotal)}</span>
              </div>
            </div>
          )}
        </Card>

        <Card padding="var(--space-6)">
          <h3 style={{ margin: '0 0 18px', fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)' }}>Taper Relief Schedule</h3>
          <p style={{ margin: '0 0 16px', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5 }}>IHT charge on gifts that fall above the nil rate band, by years since the gift was made.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {taperRows.map((r) => (
              <div key={r.years} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--surface-sunken)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', width: 36, flex: 'none' }}>{r.years}</span>
                <div style={{ flex: 1, height: 4, background: 'var(--neutral-200)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: r.pct + '%', background: r.pct === 0 ? 'var(--green-600)' : r.tone === 'danger' ? 'var(--red-600)' : r.tone === 'warning' ? 'var(--amber-600)' : 'var(--blue-500)', borderRadius: 'var(--radius-pill)' }} />
                </div>
                <Badge tone={r.tone}>{r.pct === 0 ? 'Exempt' : r.pct + '%'}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ marginTop: 24, padding: '14px 18px', background: 'var(--neutral-50)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
        <strong>Important:</strong> This is an illustrative estimate only and does not constitute tax advice. Actual IHT liability depends on many factors including business relief, agricultural relief, spouse exemptions, charitable bequests and current HMRC rules. Please consult a qualified tax adviser.
      </div>
    </div>
  );
}
window.ReportsScreen = ReportsScreen;
