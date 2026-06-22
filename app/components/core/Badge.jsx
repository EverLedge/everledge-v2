import React from 'react';

/**
 * Status badge / pill. Tones map to the semantic colour system.
 * dot=true prepends a small status dot. subtle=true uses tinted background.
 */
export function Badge({
  children,
  tone = 'neutral',  // neutral | primary | success | warning | danger | gold
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: { fg: 'var(--neutral-600)', bg: 'var(--neutral-100)', bd: 'var(--neutral-200)' },
    primary: { fg: 'var(--blue-700)', bg: 'var(--blue-50)', bd: 'var(--blue-100)' },
    success: { fg: 'var(--green-700)', bg: 'var(--green-50)', bd: '#CFE6D8' },
    warning: { fg: 'var(--amber-700)', bg: 'var(--amber-50)', bd: '#EEDCBE' },
    danger:  { fg: 'var(--red-600)', bg: 'var(--red-50)', bd: '#E9CFCD' },
    gold:    { fg: 'var(--gold-700)', bg: 'var(--gold-50)', bd: 'var(--gold-100)' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 10px',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-medium)',
        letterSpacing: 'var(--tracking-snug)',
        color: t.fg,
        background: t.bg,
        border: `1px solid ${t.bd}`,
        borderRadius: 'var(--radius-pill)',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.fg, flex: 'none' }} />}
      {children}
    </span>
  );
}
