import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Left-hand primary navigation for the EverLedge web app.
 * Wordmark at top, icon+label items, active item marked with a left rule
 * and tinted ground. Optional footer slot (account).
 */
export function SidebarNav({
  items = [],          // [{ id, label, icon, badge }]
  active,
  onSelect = () => {},
  footer = null,
  style = {},
}) {
  return (
    <nav
      style={{
        width: 'var(--sidebar-width)',
        flex: 'none',
        height: '100%',
        background: 'var(--surface-card)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-sans)',
        ...style,
      }}
    >
      <div style={{ padding: 'var(--space-6) var(--space-5) var(--space-5)', display: 'flex', alignItems: 'center', gap: 11 }}>
        <img
          src="../../assets/everledge-mark.png"
          alt="EverLedge"
          width={32}
          height={32}
          style={{ flex: 'none', display: 'block' }}
        />
        <span style={{ fontSize: '1.18rem', fontWeight: 'var(--weight-semibold)', letterSpacing: '-0.02em', color: 'var(--navy-800)' }}>
          EverLedge
        </span>
      </div>

      <div style={{ flex: 1, padding: '0 var(--space-3)', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {items.map((it) => {
          const on = it.id === active;
          return (
            <button
              key={it.id}
              onClick={() => onSelect(it.id)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '10px 12px',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                background: on ? 'var(--blue-50)' : 'transparent',
                color: on ? 'var(--blue-700)' : 'var(--text-body)',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-medium)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)',
              }}
              onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = 'var(--neutral-50)'; }}
              onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon name={it.icon} size={19} color={on ? 'var(--blue-600)' : 'var(--neutral-500)'} />
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.badge != null && (
                <span style={{
                  fontSize: 11, fontWeight: 600, color: 'var(--neutral-0)',
                  background: 'var(--neutral-500)', borderRadius: 'var(--radius-pill)', padding: '1px 7px',
                }}>{it.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {footer && <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>{footer}</div>}
    </nav>
  );
}
