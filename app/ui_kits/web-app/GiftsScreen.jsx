/* Gifts — grid of gift records with PET status, filter tabs, record flow. */
function GiftsScreen() {
  const { Card, GiftCard, Tabs, Button, Icon, Input, Select, Checkbox, Badge } = window.EverLedgeDesignSystem_de3ce8;
  const D = window.EL_DATA;
  const [tab, setTab] = React.useState('all');
  const [recording, setRecording] = React.useState(false);

  const MS = 365.25 * 24 * 3600 * 1000;
  const yrs = (d) => (Date.now() - new Date(d)) / MS;
  const filtered = D.gifts.filter((g) => {
    if (tab === 'exempt') return yrs(g.giftDate) >= 7;
    if (tab === 'active') return yrs(g.giftDate) < 7;
    return true;
  });

  return (
    <div style={{ padding: '28px 36px 56px', maxWidth: 'var(--content-max)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 6 }}>
        <Tabs active={tab} onChange={setTab} tabs={[
          { id: 'all', label: `All gifts · ${D.gifts.length}` },
          { id: 'active', label: 'Active PETs' },
          { id: 'exempt', label: 'Exempt' },
        ]} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 24 }}>
        {filtered.map((g) => (
          <GiftCard key={g.id} recipient={g.recipient} relationship={g.relationship} value={g.value} giftDate={g.giftDate} onClick={() => {}} />
        ))}
        {/* Add-gift tile */}
        <button onClick={() => setRecording(true)} style={{
          border: '1.5px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)', background: 'transparent',
          minHeight: 196, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
          cursor: 'pointer', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)',
        }}>
          <span style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--blue-50)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="plus" size={22} color="var(--blue-600)" />
          </span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>Record a gift</span>
        </button>
      </div>

      {recording && <RecordGiftDialog onClose={() => setRecording(false)} />}
    </div>
  );
}

function RecordGiftDialog({ onClose }) {
  const { Card, Input, Select, Checkbox, Button, Icon } = window.EverLedgeDesignSystem_de3ce8;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(19,29,39,0.42)', backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 520, maxWidth: '100%', background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)', overflow: 'hidden',
      }}>
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
          <Input label="Recipient" placeholder="Full legal name" />
          <Select label="Relationship"><option>Daughter</option><option>Son</option><option>Grandchild</option><option>Spouse</option><option>Trust</option><option>Charity</option></Select>
          <Input label="Gift value" prefix="£" placeholder="0.00" />
          <Input label="Date of gift" type="date" defaultValue="2025-02-01" />
          <div style={{ gridColumn: '1 / -1' }}>
            <Checkbox label="Made from surplus income (exempt from IHT)" />
          </div>
        </div>
        <div style={{ padding: '18px 28px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 12, background: 'var(--neutral-50)' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onClose} iconLeft={<Icon name="check" size={16} />}>Record gift</Button>
        </div>
      </div>
    </div>
  );
}
window.GiftsScreen = GiftsScreen;
