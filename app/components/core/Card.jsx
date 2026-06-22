import React from 'react';

/**
 * Elevated content surface — the workhorse container of EverLedge.
 * Clean white, hairline border, soft shadow, gentle lift on hover (interactive).
 */
export function Card({
  children,
  padding = 'var(--space-5)',
  interactive = false,
  accent = null,        // null | 'gold' — a thin top accent rule for premium cards
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)',
        padding,
        cursor: interactive ? 'pointer' : 'default',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {accent === 'gold' && (
        <span style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, var(--gold-600), var(--gold-400))',
        }} />
      )}
      {children}
    </div>
  );
}
