import React from 'react';

/** Native-backed select styled to match EverLedge inputs. */
export function Select({ label = null, hint = null, children, id, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const selectId = id || (label ? `el-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontFamily: 'var(--font-sans)' }}>
      {label && (
        <label htmlFor={selectId} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-strong)' }}>
          {label}
        </label>
      )}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: 44,
          background: 'var(--surface-card)',
          border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-strong)'}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focus ? 'var(--shadow-focus)' : 'none',
          transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
        }}
      >
        <select
          id={selectId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...rest}
          style={{
            appearance: 'none',
            WebkitAppearance: 'none',
            flex: 1,
            height: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            padding: '0 38px 0 14px',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            color: 'var(--text-strong)',
            cursor: 'pointer',
            ...style,
          }}
        >
          {children}
        </select>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', right: 13, pointerEvents: 'none' }}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {hint && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{hint}</span>}
    </div>
  );
}
