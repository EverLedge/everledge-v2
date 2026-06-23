function EstateScreen({ search }) {
  const { Card, Button, Icon, Input, Select, Badge } = window.EverLedgeDesignSystem_de3ce8;
  const [assets, setAssets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [adding, setAdding] = React.useState(false);
  const sb = window._supabase;

  async function load() {
    setLoading(true);
    const { data } = await sb.from('assets').select('*').order('category').order('created_at');
    setAssets(data || []);
    setLoading(false);
  }
  React.useEffect(() => { load(); }, []);

  let displayed = assets;
  if (search) {
    const q = search.toLowerCase();
    displayed = assets.filter(a => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
  }

  async function deleteAsset(id) {
    if (!confirm('Delete this asset?')) return;
    await sb.from('assets').delete().eq('id', id);
    setAssets(prev => prev.filter(a => a.id !== id));
  }

  const total = assets.reduce((s, a) => s + Number(a.value), 0);
  const fmt = (n) => '£' + Number(n).toLocaleString('en-GB', { minimumFractionDigits: 0 });

  const catColor = {
    Property: { fg: 'var(--blue-700)', bg: 'var(--blue-50)' },
    Investments: { fg: 'var(--green-700)', bg: 'var(--green-50)' },
    Cash: { fg: 'var(--neutral-700)', bg: 'var(--neutral-100)' },
    Business: { fg: 'var(--gold-700)', bg: 'var(--gold-50)' },
    Insurance: { fg: 'var(--amber-700)', bg: 'var(--amber-50)' },
    Pension: { fg: 'var(--navy-700)', bg: 'var(--blue-50)' },
    Other: { fg: 'var(--neutral-600)', bg: 'var(--neutral-100)' },
  };
  const catIcon = { Property: 'home', Investments: 'trending-up', Cash: 'banknote', Business: 'briefcase', Insurance: 'umbrella', Pension: 'clock', Other: 'box' };

  const byCategory = displayed.reduce((acc, a) => {
    if (!acc[a.category]) acc[a.category] = [];
    acc[a.category].push(a);
    return acc;
  }, {});

  return (
    <div style={{ padding: '32px 36px 56px', maxWidth: 'var(--content-max)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>Gross estate value</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 3vw, 2.6rem)', fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--text-strong)' }}>{fmt(total)}</div>
        </div>
        <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} onClick={() => setAdding(true)}>Add asset</Button>
      </div>

      {loading ? (
        <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Loading assets…</div>
      ) : assets.length === 0 ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>No assets added yet</div>
          <p style={{ margin: '0 0 20px', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Add your property, investments, cash and other assets to calculate your estate value.</p>
          <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} onClick={() => setAdding(true)}>Add your first asset</Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {Object.entries(byCategory).map(([cat, items]) => {
            const catTotal = items.reduce((s, a) => s + Number(a.value), 0);
            const c = catColor[cat] || catColor.Other;
            const pct = total > 0 ? Math.round((catTotal / total) * 100) : 0;
            return (
              <div key={cat}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ width: 30, height: 30, borderRadius: 'var(--radius-sm)', background: c.bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                    <Icon name={catIcon[cat] || 'box'} size={16} color={c.fg} />
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--text-strong)', flex: 1 }}>{cat}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{pct}%</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-strong)' }}>{fmt(catTotal)}</span>
                </div>
                <div style={{ height: 4, borderRadius: 'var(--radius-pill)', background: 'var(--surface-sunken)', marginBottom: 12, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: pct + '%', background: c.fg, borderRadius: 'var(--radius-pill)', transition: 'width 0.4s ease' }} />
                </div>
                <Card padding="0">
                  {items.map((a, i) => (
                    <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderBottom: i < items.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{a.name}</div>
                        {a.notes && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2 }}>{a.notes}</div>}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>{fmt(a.value)}</div>
                      <button onClick={() => deleteAsset(a.id)} title="Delete" style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="trash-2" size={13} color="var(--status-danger)" />
                      </button>
                    </div>
                  ))}
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {adding && <AddAssetDialog onClose={() => setAdding(false)} onSaved={(a) => { setAssets(prev => [...prev, a]); setAdding(false); }} />}
    </div>
  );
}

function AddAssetDialog({ onClose, onSaved }) {
  const { Input, Select, Button, Icon } = window.EverLedgeDesignSystem_de3ce8;
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', category: 'Property', value: '', notes: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function save() {
    if (!form.name.trim() || !form.value) { setError('Please enter a name and value.'); return; }
    setSaving(true); setError(null);
    const sb = window._supabase;
    const { data: { session } } = await sb.auth.getSession();
    const { data, error: err } = await sb.from('assets').insert({
      user_id: session.user.id,
      name: form.name.trim(),
      category: form.category,
      value: parseFloat(String(form.value).replace(/[^0-9.]/g, '')),
      notes: form.notes.trim() || null,
    }).select().single();
    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved(data);
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(19,29,39,0.42)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 480, maxWidth: '100%', background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden' }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>New asset</div>
            <h3 style={{ margin: '5px 0 0', fontSize: 'var(--text-h3)', fontWeight: 600, color: 'var(--text-strong)' }}>Add an estate asset</h3>
          </div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={18} color="var(--neutral-500)" />
          </button>
        </div>
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {error && <div style={{ padding: '10px 14px', background: 'var(--red-50)', border: '1px solid #E9CFCD', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--red-600)' }}>{error}</div>}
          <Input label="Asset name" placeholder="e.g. 27 Chazey Road, Caversham" value={form.name} onChange={e => set('name', e.target.value)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <Select label="Category" value={form.category} onChange={e => set('category', e.target.value)}>
              <option>Property</option><option>Investments</option><option>Cash</option>
              <option>Business</option><option>Pension</option><option>Insurance</option><option>Other</option>
            </Select>
            <Input label="Current value" prefix="£" placeholder="0.00" value={form.value} onChange={e => set('value', e.target.value)} />
          </div>
          <Input label="Notes (optional)" placeholder="e.g. Jointly owned, ISA, provider name" value={form.notes} onChange={e => set('notes', e.target.value)} />
        </div>
        <div style={{ padding: '18px 28px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 12, background: 'var(--neutral-50)' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={save} disabled={saving} iconLeft={<Icon name="check" size={16} />}>
            {saving ? 'Saving…' : 'Add asset'}
          </Button>
        </div>
      </div>
    </div>
  );
}
window.EstateScreen = EstateScreen;
