import React from 'react';

/**
 * Avatar — initials on a calm tinted ground, or an image.
 * Used for recipients, executors, and family members.
 */
export function Avatar({
  name = '',
  src = null,
  size = 40,
  tone = 'navy',   // navy | blue | gold
  style = {},
  ...rest
}) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');

  const tones = {
    navy: { bg: 'var(--blue-50)', fg: 'var(--navy-800)' },
    blue: { bg: 'var(--blue-100)', fg: 'var(--blue-700)' },
    gold: { bg: 'var(--gold-50)', fg: 'var(--gold-700)' },
  };
  const t = tones[tone] || tones.navy;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        flex: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: t.bg,
        color: t.fg,
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--weight-semibold)',
        fontSize: Math.round(size * 0.38),
        letterSpacing: '0.01em',
        border: '1px solid rgba(26,39,52,0.06)',
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initials || '—'
      )}
    </div>
  );
}
