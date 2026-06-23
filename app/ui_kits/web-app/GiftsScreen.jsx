function GiftsScreen({ search }) {
  const { GiftCard, Tabs, Button, Icon, Input, Select, Checkbox } = window.EverLedgeDesignSystem_de3ce8;
  const [tab, setTab] = React.useState('all');
  const [recording, setRecording] = React.useState(false);
  const [gifts, setGifts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const sb = window._supabase;

  async function load() {
    setLoading(true);
    const { data } = await sb.from('gifts').select('*').order('gift_date', { ascending: false });
    setGifts(data || []);
    setLoading(false);
  }
  React.useEffect(() => { load(); }, []);

  const MS = 365.25 * 24 * 3600 * 1000;
  const yrs = (d) => (Date.now() - new Date(d)) / MS;
  const SPOUSE_RELS = ['spouse', 'partner', 'civil partner'];
  const isExempt = (g) => g.from_surplus_income || SPOUSE_RELS.includes((g.relationship || '').toLowerCase());
  const isPET = (g) => !isExempt(g) && yrs(g.gift_date) < 7;

  let filtered = gifts.filter((g) => {
    if (tab === 'exempt') return isExempt(g) || yrs(g.gift_date) >= 7;
    if (tab === 'active') return isPET(g);
    return true;
  });
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(g =>
      g.recipient.toLowerCase().includes(q) || (g.relationship || '').toLowerCase().includes(q)
    );
  }

  async function deleteGift(id) {
    if (!confirm('Delete this gift record?')) return;
    await sb.from('gifts').delete().eq('id', id);
    setGifts(prev => prev.filter(g => g.id !== id));
  }

  return (
    <div style={{ padding: '28px 36px 56px', maxWidth: 'var(--content-max)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 6 }}>
        <Tabs active={tab} onChange={setTab} tabs={[
          { id: 'all', label: 'All gifts · ' + gifts.length },
          { id: 'active', label: 'Active PETs · ' + gifts.filter(isPET).length },
          { id: 'exempt', label: 'Exempt' },
        ]} />
      </div>

      {loading ? (
        <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Loading gifts…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 24 }}>
          {filtered.map((g) => (
            <div key={g.id} style={{ position: 'relative' }}>
              <GiftCard
                recipient={g.recipient}
                relationship={g.relationship}
                value={'£' + Number(g.value).toLocaleString('en-GB')}
                giftDate={g.gift_date}
                onClick={() => {}}
              />
              <button
                onClick={() => deleteGift(g.id)}
                title="Delete gift"
                style={{ position: 'absolute', top: 12, right: 12, width: 28, height: 28, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--surface-card)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon name="trash-2" size={13} color="var(--status-danger)" />
              </button>
            </div>
          ))}

          {filtered.length === 0 && gifts.length > 0 && (
            <div style={{ gridColumn: '1/-1', padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>No gifts match this filter.</div>
          )}

          <button onClick={() => setRecording(true)} style={{
            border: '1.5px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)', background: 'transparent',
            minHeight: 196, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
            cursor: 'pointer', fontFamily: 'var(--font-sans)',
          }}>
            <span style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--blue-50)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="plus" size={22} color="var(--blue-600)" />
            </span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>Record a gift</span>
          </button>
        </div>
      )}

      {recording && (
        <RecordGiftDialog
          onClose={() => setRecording(false)}
          onSaved={(g) => { setGifts(prev => [g, ...prev]); setRecording(false); }}
        />
      )}
    </div>
  );
}

function RecordGiftDialog({ onClose, onSaved }) {
  const { Input, Select, Checkbox, Button, Icon } = window.EverLedgeDesignSystem_de3ce8;
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [surplus, setSurplus] = React.useState(false);
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = React.useState({ recipient: '', relationship: 'Spouse', value: '', gift_date: today });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function save() {
    if (!form.recipient.trim() || !form.value || !form.gift_date) {
      setError('Please fill in recipient, value and date.'); return;
    }
    setSaving(true); setError(null);
    const sb = window._supabase;
    const { data: { session } } = await sb.auth.getSession();
    const { data, error: err } = await sb.from('gifts').insert({
      user_id: session.user.id,
      recipient: form.recipient.trim(),
      relationship: form.relationship,
      value: parseFloat(String(form.value).replace(/[^0-9.]/g, '')),
      gift_date: form.gift_date,
      from_surplus_income: surplus,
    }).select().single();
    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved(data);
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(19,29,39,0.42)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 520, maxWidth: '100%', background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden' }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>New record</div>
            <h3 style={{ margin: '5px 0 0', fontSize: 'var(--text-h3)', fontWeight: 600, color: 'var(--text-strong)' }}>Record a lifetime gift</h3>
          </div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={18} color="var(--neutral-500)" />
          </button>
        </div>
        <div style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {error && <div style={{ gridColumn: '1/-1', padding: '10px 14px', background: 'var(--red-50)', border: '1px solid #E9CFCD', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--red-600)' }}>{error}</div>}
          <Input label="Recipient" placeholder="Full legal name" value={form.recipient} onChange={e => set('recipient', e.target.value)} />
          <Select label="Relationship" value={form.relationship} onChange={e => set('relationship', e.target.value)}>
            <option>Spouse</option><option>Partner</option><option>Son</option><option>Daughter</option>
            <option>Grandchild</option><option>Sibling</option><option>Parent</option>
            <option>Family trust</option><option>Charity</option><option>Other</option>
          </Select>
          <Input label="Gift value" prefix="£" placeholder="0.00" value={form.value} onChange={e => set('value', e.target.value)} />
          <Input label="Date of gift" type="date" value={form.gift_date} onChange={e => set('gift_date', e.target.value)} />
          <div style={{ gridColumn: '1/-1' }}>
            <Checkbox label="Made from surplus income (exempt from IHT)" checked={surplus} onChange={v => setSurplus(v)} />
          </div>
        </div>
        <div style={{ padding: '18px 28px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 12, background: 'var(--neutral-50)' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={save} disabled={saving} iconLeft={<Icon name="check" size={16} />}>
            {saving ? 'Saving…' : 'Record gift'}
          </Button>
        </div>
      </div>
    </div>
  );
}
window.GiftsScreen = GiftsScreen;
