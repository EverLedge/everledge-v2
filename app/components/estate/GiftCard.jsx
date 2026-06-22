import React from 'react';
import { Avatar } from '../core/Avatar.jsx';
import { Badge } from '../core/Badge.jsx';

const MS_YEAR = 365.25 * 24 * 60 * 60 * 1000;

function statusFor(years) {
  if (years >= 7) return { tone: 'success', label: 'Exempt', dot: true };
  const remaining = 7 - years;
  if (remaining <= 2) return { tone: 'warning', label: `${remaining.toFixed(1)} yrs left`, dot: true };
  return { tone: 'primary', label: `${remaining.toFixed(1)} yrs left`, dot: true };
}

/**
 * Compact gift record card — recipient, value, date, PET status, mini progress.
 * Readability and confidence over density.
 */
export function GiftCard({
  recipient,
  relationship = null,
  value,                 // pre-formatted, e.g. "£250,000"
  giftDate,              // ISO / Date
  asOf = new Date(),
  onClick,
  style = {},
}) {
  const start = new Date(giftDate);
  const now = asOf instanceof Date ? asOf : new Date(asOf);
  const years = Math.max(0, (now - start) / MS_YEAR);
  const progress = Math.min(1, years / 7);
  const st = statusFor(years);
  const exempt = years >= 7;

  const [hover, setHover] = React.useState(false);
  const dateStr = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)',
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 'var(--space-5)' }}>
        <Avatar name={recipient} size={42} tone={exempt ? 'gold' : 'navy'} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-snug)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {recipient}
          </div>
          {relationship && <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{relationship}</div>}
        </div>
        <Badge tone={st.tone} dot={st.dot}>{st.label}</Badge>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--weight-medium)', fontSize: '1.6rem', letterSpacing: '-0.02em', color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </span>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{dateStr}</span>
      </div>

      <div style={{ position: 'relative', height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--surface-sunken)', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, width: `${progress * 100}%`,
          borderRadius: 'var(--radius-pill)',
          background: exempt ? 'linear-gradient(90deg, var(--gold-400), var(--gold-600))' : 'linear-gradient(90deg, var(--blue-500), var(--color-primary))',
          transition: 'width var(--duration-slow) var(--ease-emphasis)',
        }} />
      </div>
    </div>
  );
}
