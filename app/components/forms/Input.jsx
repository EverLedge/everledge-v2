import React from 'react';

/**
 * Text input with optional label, hint, leading icon, and error state.
 * Calm, generous, hairline border that warms to the primary blue on focus.
 */
export function Input({
  label = null,
  hint = null,
  error = null,
  iconLeft = null,
  prefix = null,     // e.g. "£" for currency
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `el-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const borderColor = error ? 'var(--status-danger)' : focus ? 'var(--border-focus)' : 'var(--border-strong)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontFamily: 'var(--font-sans)' }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-strong)' }}>
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: 44,
          padding: '0 14px',
          background: 'var(--surface-card)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focus ? 'var(--shadow-focus)' : 'none',
          transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
        }}
      >
        {iconLeft}
        {prefix && <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-base)' }}>{prefix}</span>}
        <input
          id={inputId}
          onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
          onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
          {...rest}
          style={{
            flex: 1,
            minWidth: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            color: 'var(--text-strong)',
            ...style,
          }}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontSize: 'var(--text-xs)', color: error ? 'var(--status-danger)' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
