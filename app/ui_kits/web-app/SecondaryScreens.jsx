/* Executors & Documents screens — full Supabase CRUD */

function ExecutorsScreen({ search }) {
  const { Card, Avatar, Badge, Button, Icon, Input, Select } = window.EverLedgeDesignSystem_de3ce8;
  const [executors, setExecutors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [adding, setAdding] = React.useState(false);
  const sb = window._supabase;

  async function load() {
    setLoading(true);
    const { data } = await sb.from('executors').select('*').order('is_primary', { ascending: false }).order('created_at');
    setExecutors(data || []);
    setLoading(false);
  }
  React.useEffect(() => { load(); }, []);

  let displayed = executors;
  if (search) {
    const q = search.toLowerCase();
    displayed = executors.filter(e => e.name.toLowerCase().includes(q) || (e.relationship || '').toLowerCase().includes(q));
  }

  async function deleteExecutor(id) {
    if (!confirm('Remove this executor?')) return;
    await sb.from('executors').delete().eq('id', id);
    setExecutors(prev => prev.filter(e => e.id !== id));
  }

  return (
    <div style={{ padding: '32px 36px 56px', maxWidth: 'var(--content-max)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <p style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.55 }}>
          The people entrusted to administer your estate. Keep their details current so your affairs can be settled without delay.
        </p>
        <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} onClick={() => setAdding(true)}>Add executor</Button>
      </div>

      {loading ? (
        <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Loading executors…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {displayed.map((e) => (
            <Card key={e.id} accent={e.is_primary ? 'gold' : null} padding="var(--space-6)" style={{ position: 'relative' }}>
              <button onClick={() => deleteExecutor(e.id)} title="Remove executor" style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="x" size={13} color="var(--neutral-400)" />
              </button>
              <Avatar name={e.name} size={52} tone={e.is_primary ? 'gold' : 'navy'} style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)', paddingRight: 32 }}>{e.name}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 4, marginBottom: 16 }}>{e.relationship}</div>
              <Badge tone={e.is_primary ? 'gold' : 'primary'}>{e.role}</Badge>
              {e.email && (
                <div style={{ marginTop: 14, fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="mail" size={13} color="var(--neutral-400)" />{e.email}
                </div>
              )}
            </Card>
          ))}

          {displayed.length === 0 && !loading && (
            <div style={{ gridColumn: '1/-1', padding: '60px 20px', textAlign: 'center', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>No executors added yet</div>
              <p style={{ margin: '0 0 20px', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Add the people who will administer your estate.</p>
              <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} onClick={() => setAdding(true)}>Add executor</Button>
            </div>
          )}
        </div>
      )}

      {adding && <AddExecutorDialog onClose={() => setAdding(false)} onSaved={(e) => { setExecutors(prev => [...prev, e]); setAdding(false); }} />}
    </div>
  );
}

function AddExecutorDialog({ onClose, onSaved }) {
  const { Input, Select, Checkbox, Button, Icon } = window.EverLedgeDesignSystem_de3ce8;
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isPrimary, setIsPrimary] = React.useState(false);
  const [consented, setConsented] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', relationship: '', role: 'Executor', email: '', phone: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function save() {
    if (!form.name.trim()) { setError('Please enter the executor\'s full name.'); return; }
    if (!consented) { setError('You must confirm the executor has given their permission before saving.'); return; }
    setSaving(true); setError(null);
    const sb = window._supabase;
    const { data: { session } } = await sb.auth.getSession();
    const { data, error: err } = await sb.from('executors').insert({
      user_id: session.user.id,
      name: form.name.trim(),
      relationship: form.relationship.trim(),
      role: form.role,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      is_primary: isPrimary,
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
            <div style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>New executor</div>
            <h3 style={{ margin: '5px 0 0', fontSize: 'var(--text-h3)', fontWeight: 600, color: 'var(--text-strong)' }}>Add an executor</h3>
          </div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={18} color="var(--neutral-500)" />
          </button>
        </div>
        <div style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {error && <div style={{ gridColumn: '1/-1', padding: '10px 14px', background: 'var(--red-50)', border: '1px solid #E9CFCD', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--red-600)' }}>{error}</div>}
          <div style={{ gridColumn: '1/-1' }}>
            <Input label="Full name" placeholder="e.g. Natasha Beasant" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <Input label="Relationship" placeholder="e.g. Spouse, Brother" value={form.relationship} onChange={e => set('relationship', e.target.value)} />
          <Select label="Role" value={form.role} onChange={e => set('role', e.target.value)}>
            <option>Executor</option><option>Primary executor</option><option>Reserve executor</option><option>Professional executor</option>
          </Select>
          <Input label="Email (optional)" type="email" placeholder="email@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
          <Input label="Phone (optional)" type="tel" placeholder="+44 7700 000000" value={form.phone} onChange={e => set('phone', e.target.value)} />
          <div style={{ gridColumn: '1/-1' }}>
            <Checkbox label="This is the primary executor" checked={isPrimary} onChange={v => setIsPrimary(v)} />
          </div>
          <div style={{ gridColumn: '1/-1', padding: '14px 16px', background: 'var(--blue-50)', border: '1px solid var(--blue-100)', borderRadius: 'var(--radius-md)' }}>
            <Checkbox
              checked={consented}
              onChange={v => setConsented(v)}
              label="I confirm that the person named above has given their explicit permission for their personal details to be recorded on EverLedge for the purpose of estate administration."
            />
          </div>
        </div>
        <div style={{ padding: '18px 28px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 12, background: 'var(--neutral-50)' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={save} disabled={saving} iconLeft={<Icon name="check" size={16} />}>
            {saving ? 'Saving…' : 'Add executor'}
          </Button>
        </div>
      </div>
    </div>
  );
}
window.ExecutorsScreen = ExecutorsScreen;

/* ── Documents ── */

function ProGate({ onUpgrade }) {
  const { Button, Icon } = window.EverLedgeDesignSystem_de3ce8;
  return (
    <div style={{ padding: '64px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20, maxWidth: 520, margin: '0 auto' }}>
      <span style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: 'var(--gold-50)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="star" size={26} color="var(--gold-600)" />
      </span>
      <div>
        <h3 style={{ margin: '0 0 8px', fontSize: 'var(--text-h3)', fontWeight: 600, color: 'var(--text-strong)' }}>Professional feature</h3>
        <p style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          This feature is included in EverLedge Professional. Upgrade for £6/month to unlock Documents, full IHT reports, and the executor portal.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="primary" iconLeft={<Icon name="star" size={16} />} onClick={onUpgrade}>Upgrade to Professional</Button>
      </div>
      <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Secure payment via Stripe · Cancel any time</p>
    </div>
  );
}
window.ProGate = ProGate;

function DocumentsScreen({ search, plan = 'free', onUpgrade }) {
  const { Card, Badge, Icon, Button } = window.EverLedgeDesignSystem_de3ce8;

  if (plan !== 'pro') return <ProGate onUpgrade={onUpgrade} />;

  const [docs, setDocs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const sb = window._supabase;

  async function load() {
    setLoading(true);
    const { data } = await sb.from('documents').select('*').order('created_at', { ascending: false });
    setDocs(data || []);
    setLoading(false);
  }
  React.useEffect(() => { load(); }, []);

  let displayed = docs;
  if (search) {
    const q = search.toLowerCase();
    displayed = docs.filter(d => d.name.toLowerCase().includes(q) || (d.tag || '').toLowerCase().includes(q));
  }

  async function uploadFile(file) {
    setUploading(true);
    const { data: { session } } = await sb.auth.getSession();
    const userId = session.user.id;
    const path = userId + '/' + Date.now() + '-' + file.name;
    const { error: uploadErr } = await sb.storage.from('documents').upload(path, file);
    if (uploadErr) { alert('Upload failed: ' + uploadErr.message); setUploading(false); return; }
    const tag = guessTag(file.name);
    const { data, error: dbErr } = await sb.from('documents').insert({
      user_id: userId,
      name: file.name.replace(/\.[^.]+$/, ''),
      tag,
      storage_path: path,
      file_size: file.size,
      mime_type: file.type,
    }).select().single();
    setUploading(false);
    if (!dbErr) setDocs(prev => [data, ...prev]);
  }

  function guessTag(name) {
    const n = name.toLowerCase();
    if (n.includes('will')) return 'Will';
    if (n.includes('lpa') || n.includes('power')) return 'LPA';
    if (n.includes('valuation') || n.includes('value')) return 'Valuation';
    if (n.includes('trust') || n.includes('deed')) return 'Trust';
    if (n.includes('property') || n.includes('deed') || n.includes('title')) return 'Property';
    if (n.includes('mortgage')) return 'Mortgage';
    if (n.includes('insurance') || n.includes('policy')) return 'Insurance';
    return 'Document';
  }

  async function download(doc) {
    const { data, error } = await sb.storage.from('documents').createSignedUrl(doc.storage_path, 3600);
    if (error) { alert('Could not generate download link.'); return; }
    window.open(data.signedUrl, '_blank');
  }

  async function deleteDoc(doc) {
    if (!confirm('Delete "' + doc.name + '"?')) return;
    if (doc.storage_path) await sb.storage.from('documents').remove([doc.storage_path]);
    await sb.from('documents').delete().eq('id', doc.id);
    setDocs(prev => prev.filter(d => d.id !== doc.id));
  }

  const iconForTag = { Will: 'file-text', LPA: 'shield', Valuation: 'landmark', Trust: 'archive', Property: 'home', Mortgage: 'building', Insurance: 'umbrella', Document: 'file' };

  function fmt(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  return (
    <div style={{ padding: '32px 36px 56px', maxWidth: 'var(--content-max)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
        <p style={{ margin: 0, fontSize: 'var(--text-base)', color: 'var(--text-muted)' }}>Securely stored estate documents, available to your executors when needed.</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) uploadFile(e.target.files[0]); e.target.value = ''; }} />
          <Button variant="secondary" iconLeft={<Icon name="upload" size={16} />} onClick={() => fileInputRef.current.click()} disabled={uploading}>
            {uploading ? 'Uploading…' : 'Upload document'}
          </Button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Loading documents…</div>
      ) : displayed.length === 0 ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)', marginBottom: 8 }}>{docs.length === 0 ? 'No documents yet' : 'No documents match your search'}</div>
          <p style={{ margin: '0 0 20px', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Upload wills, LPAs, deeds and valuations.</p>
          {docs.length === 0 && <Button variant="secondary" iconLeft={<Icon name="upload" size={16} />} onClick={() => fileInputRef.current.click()}>Upload your first document</Button>}
        </div>
      ) : (
        <Card padding="0">
          {displayed.map((d, i) => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', borderBottom: i < displayed.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <span style={{ width: 42, height: 42, flex: 'none', borderRadius: 'var(--radius-md)', background: 'var(--neutral-100)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={iconForTag[d.tag] || 'file'} size={20} color="var(--navy-700)" />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>
                  {new Date(d.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  {d.file_size ? ' · ' + fmt(d.file_size) : ''}
                </div>
              </div>
              <Badge tone="neutral">{d.tag || 'Document'}</Badge>
              {d.storage_path && (
                <button onClick={() => download(d)} title="Download" style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="download" size={17} color="var(--neutral-500)" />
                </button>
              )}
              <button onClick={() => deleteDoc(d)} title="Delete" style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="trash-2" size={16} color="var(--status-danger)" />
              </button>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
window.DocumentsScreen = DocumentsScreen;
