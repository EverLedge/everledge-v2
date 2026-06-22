import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Top-level summary metric card for the dashboard.
 * Quiet icon chip, large mono figure, optional delta + caption.
 */
export function SummaryCard({
  label,
  value,
  icon = null,
  caption = null,
  delta = null,           // { value: '+£12,000', direction: 'up' | 'down' | 'flat' }
  accent = false,         // gold treatment for premium/milestone metrics
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const deltaColor = delta
    ? (delta.direction === 'down' ? 'var(--status-danger)' : delta.direction === 'up' ? 'var(--status-success)' : 'var(--text-muted)')
    : null;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)',
        fontFamily: 'var(--font-sans)',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {accent && <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--gold-600), var(--gold-400))' }} />}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-muted)' }}>{label}</span>
        {icon && (
          <span style={{
            width: 36, height: 36, borderRadius: 'var(--radius-md)', flex: 'none',
            background: accent ? 'var(--gold-50)' : 'var(--blue-50)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={icon} size={19} color={accent ? 'var(--gold-700)' : 'var(--blue-600)'} />
          </span>
        )}
      </div>

      <div style={{
        fontFamily: 'var(--font-mono)', fontWeight: 'var(--weight-medium)',
        fontSize: 'clamp(1.5rem, 2.1vw, 2rem)', lineHeight: 1.05, letterSpacing: '-0.03em',
        color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
      }}>
        {value}
      </div>

      {(caption || delta) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'var(--space-3)' }}>
          {delta && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 'var(--text-xs)', fontWeight: 600, color: deltaColor }}>
              <Icon name={delta.direction === 'down' ? 'trending-down' : delta.direction === 'flat' ? 'minus' : 'trending-up'} size={14} color={deltaColor} />
              {delta.value}
            </span>
          )}
          {caption && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{caption}</span>}
        </div>
      )}
    </div>
  );
}
