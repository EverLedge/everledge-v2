function SettingsScreen() {
  const { Card, Input, Button, Icon, Switch } = window.EverLedgeDesignSystem_de3ce8;
  const [user, setUser] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [pwSaving, setPwSaving] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const [pwMsg, setPwMsg] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [newPw, setNewPw] = React.useState('');
  const [confirmPw, setConfirmPw] = React.useState('');
  const sb = window._supabase;

  React.useEffect(() => {
    sb.auth.getSession().then(({ data }) => {
      if (data.session) {
        const u = data.session.user;
        setUser(u);
        setName(u.user_metadata?.full_name || '');
        setEmail(u.email || '');
      }
    });
  }, []);

  async function saveProfile() {
    setSaving(true); setMsg(null);
    const { error } = await sb.auth.updateUser({
      email: email !== user.email ? email : undefined,
      data: { full_name: name },
    });
    setSaving(false);
    if (error) setMsg({ type: 'error', text: error.message });
    else setMsg({ type: 'success', text: email !== user.email ? 'Profile updated. Check your new email to confirm the change.' : 'Profile saved.' });
  }

  async function changePassword() {
    if (newPw.length < 8) { setPwMsg({ type: 'error', text: 'Password must be at least 8 characters.' }); return; }
    if (newPw !== confirmPw) { setPwMsg({ type: 'error', text: 'Passwords do not match.' }); return; }
    setPwSaving(true); setPwMsg(null);
    const { error } = await sb.auth.updateUser({ password: newPw });
    setPwSaving(false);
    if (error) setPwMsg({ type: 'error', text: error.message });
    else { setPwMsg({ type: 'success', text: 'Password updated successfully.' }); setNewPw(''); setConfirmPw(''); }
  }

  async function signOut() {
    await sb.auth.signOut();
    window.location.replace('/login');
  }

  const alertStyle = (type) => ({
    padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)',
    background: type === 'error' ? 'var(--red-50)' : 'var(--green-50)',
    border: '1px solid ' + (type === 'error' ? '#E9CFCD' : '#CFE6D8'),
    color: type === 'error' ? 'var(--red-600)' : 'var(--green-700)',
    marginBottom: 16,
  });

  return (
    <div style={{ padding: '32px 36px 56px', maxWidth: 680 }}>

      {/* Profile */}
      <Card padding="var(--space-6)" style={{ marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 20px', fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)' }}>Personal details</h3>
        {msg && <div style={alertStyle(msg.type)}>{msg.text}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Full name" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
          <Input label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} hint="You'll receive a confirmation email if you change this." />
        </div>
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" onClick={saveProfile} disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Button>
        </div>
      </Card>

      {/* Password */}
      <Card padding="var(--space-6)" style={{ marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 20px', fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)' }}>Change password</h3>
        {pwMsg && <div style={alertStyle(pwMsg.type)}>{pwMsg.text}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="New password" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="At least 8 characters" />
          <Input label="Confirm new password" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Repeat new password" />
        </div>
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={changePassword} disabled={pwSaving}>{pwSaving ? 'Updating…' : 'Update password'}</Button>
        </div>
      </Card>

      {/* Account */}
      <Card padding="var(--space-6)">
        <h3 style={{ margin: '0 0 6px', fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)' }}>Account</h3>
        <p style={{ margin: '0 0 20px', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Signed in as <strong>{email}</strong></p>
        <Button variant="ghost" iconLeft={<Icon name="log-out" size={16} />} onClick={signOut}>Sign out</Button>
      </Card>
    </div>
  );
}
window.SettingsScreen = SettingsScreen;
