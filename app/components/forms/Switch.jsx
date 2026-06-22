import React from 'react';

/** Toggle switch. Controlled or uncontrolled. */
export function Switch({ checked, defaultChecked, onChange, disabled = false, label = null, style = {}, ...rest }) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;

  const toggle = (e) => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on, e);
  };

  const track = (
    <span
      onClick={toggle}
      style={{
        width: 42,
        height: 24,
        flex: 'none',
        borderRadius: 'var(--radius-pill)',
        background: on ? 'var(--color-primary)' : 'var(--neutral-300)',
        position: 'relative',
        transition: 'background var(--duration-base) var(--ease-standard)',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: on ? 20 : 2,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: 'var(--shadow-sm)',
          transition: 'left var(--duration-base) var(--ease-emphasis)',
        }}
      />
    </span>
  );

  if (!label) return track;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--text-body)', opacity: disabled ? 0.5 : 1, ...style }} {...rest}>
      {track}
      {label}
    </label>
  );
}
