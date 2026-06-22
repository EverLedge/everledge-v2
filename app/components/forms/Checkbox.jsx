import React from 'react';

/** Checkbox with label. Controlled or uncontrolled. */
export function Checkbox({ label = null, checked, defaultChecked, onChange, disabled = false, style = {}, ...rest }) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;

  const toggle = (e) => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on, e);
  };

  return (
    <label
      onClick={toggle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-base)',
        color: 'var(--text-body)',
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          width: 20,
          height: 20,
          flex: 'none',
          borderRadius: 'var(--radius-xs)',
          border: `1.5px solid ${on ? 'var(--color-primary)' : 'var(--border-strong)'}`,
          background: on ? 'var(--color-primary)' : 'var(--surface-card)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
        }}
      >
        {on && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}
