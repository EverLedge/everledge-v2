import React from 'react';

/**
 * EverLedge primary action button.
 * Variants: primary (blue), secondary (outline), ghost, gold (premium), danger.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '0 14px', height: 34, font: 'var(--text-sm)', gap: 7 },
    md: { padding: '0 18px', height: 42, font: 'var(--text-base)', gap: 8 },
    lg: { padding: '0 24px', height: 50, font: 'var(--text-base)', gap: 10 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--text-on-primary)',
      border: '1px solid var(--color-primary)',
      boxShadow: 'var(--shadow-xs)',
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent',
    },
    gold: {
      background: 'var(--accent-premium)',
      color: '#fff',
      border: '1px solid var(--gold-700)',
      boxShadow: 'var(--shadow-xs)',
    },
    danger: {
      background: 'var(--surface-card)',
      color: 'var(--status-danger)',
      border: '1px solid var(--status-danger)',
    },
  };

  return (
    <button
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-sans)',
        fontSize: s.font,
        fontWeight: 'var(--weight-medium)',
        letterSpacing: 'var(--tracking-snug)',
        borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
        whiteSpace: 'nowrap',
        ...variants[variant],
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(0.5px)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
