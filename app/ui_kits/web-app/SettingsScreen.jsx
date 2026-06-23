const SUPABASE_URL = 'https://vzanekapmmnjspbbydek.supabase.co';
const PRICE_ID = 'price_1Tlb0WCF1qZcLQjGhTX525A2';
const STRIPE_PK = 'pk_live_51RKHqzCF1qZcLQjGczRmK8tJUVEf0IubBY6vxyxdySnPIvLzpNZfNCA9FR15XOyn6sTPFHEjZHx8UER8TxrM6L6Z00x7zazhSs';

function SettingsScreen({ plan = 'free' }) {
  const { Card, Input, Button, Icon } = window.EverLedgeDesignSystem_de3ce8;
  const [tab, setTab] = React.useState('profile');
  const [user, setUser] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [pwSaving, setPwSaving] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  const [pwMsg, setPwMsg] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [newPw, setNewPw] = React.useState('');
  const [confirmPw, setConfirmPw] = React.useState('');
  const [upgrading, setUpgrading] = React.useState(false);
  const [upgradeMsg, setUpgradeMsg] = React.useState(null);
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
    // Show success/cancelled messages from Stripe redirect
    const params = new URLSearchParams(window.location.search);
    if (params.get('upgrade') === 'success') {
      setTab('billing');
      setUpgradeMsg({ type: 'success', text: 'Welcome to EverLedge Professional! Your account has been upgraded.' });
      window.history.replaceState({}, '', window.location.pathname);
    } else if (params.get('upgrade') === 'cancelled') {
      setTab('billing');
      setUpgradeMsg({ type: 'info', text: 'Upgrade cancelled — you can subscribe any time.' });
      window.history.replaceState({}, '', window.location.pathname);
    }
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

  async function startUpgrade() {
    setUpgrading(true); setUpgradeMsg(null);
    const { data: { session } } = await sb.auth.getSession();
    const res = await fetch(SUPABASE_URL + '/functions/v1/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + session.access_token },
      body: JSON.stringify({ return_url: window.location.origin + '/settings' }),
    });
    const json = await res.json();
    if (json.url) {
      window.location.href = json.url;
    } else {
      setUpgrading(false);
      setUpgradeMsg({ type: 'error', text: json.error || 'Something went wrong. Please try again.' });
    }
  }

  async function signOut() {
    await sb.auth.signOut();
    window.location.replace('/login');
  }

  const alertStyle = (type) => ({
    padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', marginBottom: 16,
    background: type === 'error' ? 'var(--red-50)' : type === 'success' ? 'var(--green-50)' : 'var(--blue-50)',
    border: '1px solid ' + (type === 'error' ? '#E9CFCD' : type === 'success' ? '#CFE6D8' : 'var(--blue-100)'),
    color: type === 'error' ? 'var(--red-600)' : type === 'success' ? 'var(--green-700)' : 'var(--blue-700)',
  });

  const TABS = [
    { id: 'profile', label: 'Profile' },
    { id: 'billing', label: 'Billing' },
  ];

  return (
    <div style={{ padding: '32px 36px 56px', maxWidth: 680 }}>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '8px 18px', background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 'var(--text-sm)', fontWeight: tab === t.id ? 600 : 400,
            color: tab === t.id ? 'var(--color-primary)' : 'var(--text-muted)',
            borderBottom: tab === t.id ? '2px solid var(--color-primary)' : '2px solid transparent',
            marginBottom: -1, fontFamily: 'var(--font-sans)',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Profile */}
          <Card padding="var(--space-6)">
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
          <Card padding="var(--space-6)">
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

          {/* Sign out */}
          <Card padding="var(--space-6)">
            <h3 style={{ margin: '0 0 6px', fontSize: 'var(--text-h4)', fontWeight: 600, color: 'var(--text-strong)' }}>Account</h3>
            <p style={{ margin: '0 0 20px', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Signed in as <strong>{email}</strong></p>
            <Button variant="ghost" iconLeft={<Icon name="log-out" size={16} />} onClick={signOut}>Sign out</Button>
          </Card>
        </div>
      )}

      {tab === 'billing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {upgradeMsg && <div style={alertStyle(upgradeMsg.type)}>{upgradeMsg.text}</div>}

          {plan === 'pro' ? (
            <Card padding="var(--space-6)">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <span style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--gold-50)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="star" size={22} color="var(--gold-600)" />
                </span>
                <div>
                  <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-strong)' }}>EverLedge Professional</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>£6/month · Active</div>
                </div>
              </div>
              <p style={{ margin: '0 0 20px', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                You have full access to all features including Documents, the full IHT report, and the executor portal. To manage your subscription, cancel, or update your payment method, visit the Stripe customer portal.
              </p>
              <Button variant="secondary" iconLeft={<Icon name="external-link" size={16} />} onClick={() => window.open('https://billing.stripe.com/p/login/test_00g00000000000', '_blank')}>Manage subscription</Button>
            </Card>
          ) : (
            <>
              {/* Free plan card */}
              <Card padding="var(--space-6)">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <span style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--neutral-100)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="user" size={22} color="var(--neutral-500)" />
                  </span>
                  <div>
                    <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--text-strong)' }}>Free plan</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Current plan</div>
                  </div>
                </div>
                <p style={{ margin: '0', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Unlimited gifts, assets, and executors. Upgrade for Documents, full IHT reports, and executor portal access.
                </p>
              </Card>

              {/* Upgrade card */}
              <Card padding="var(--space-6)" accent="gold">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--gold-600)', fontWeight: 600, marginBottom: 4 }}>Professional</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.03em' }}>£6</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>/month</span>
                    </div>
                  </div>
                  <span style={{ padding: '4px 10px', background: 'var(--gold-50)', border: '1px solid var(--gold-200)', borderRadius: 'var(--radius-pill)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--gold-700)' }}>Most popular</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {[
                    'Unlimited gifts, assets & executors',
                    'Documents vault — store wills, LPAs & deeds',
                    'Full IHT breakdown with taper relief detail',
                    'Executor portal — share a summary with your executors',
                    'PDF export of your estate summary',
                    'Cancel any time',
                  ].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>
                      <Icon name="check" size={16} color="var(--green-600)" />
                      {f}
                    </div>
                  ))}
                </div>

                <Button variant="primary" onClick={startUpgrade} disabled={upgrading} style={{ width: '100%', justifyContent: 'center' }}
                  iconLeft={<Icon name="star" size={16} />}>
                  {upgrading ? 'Redirecting to Stripe…' : 'Upgrade to Professional · £6/mo'}
                </Button>
                <p style={{ margin: '12px 0 0', textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Secure payment via Stripe. Cancel any time.</p>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
}
window.SettingsScreen = SettingsScreen;
