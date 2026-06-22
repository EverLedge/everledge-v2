import React from 'react';

/** Underline tab bar. Controlled or uncontrolled. */
export function Tabs({ tabs = [], active, defaultActive, onChange, style = {} }) {
  const isControlled = active !== undefined;
  const [internal, setInternal] = React.useState(defaultActive ?? (tabs[0] && tabs[0].id));
  const current = isControlled ? active : internal;

  const select = (id) => {
    if (!isControlled) setInternal(id);
    onChange && onChange(id);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        borderBottom: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-sans)',
        ...style,
      }}
    >
      {tabs.map((t) => {
        const on = t.id === current;
        return (
          <button
            key={t.id}
            onClick={() => select(t.id)}
            style={{
              position: 'relative',
              padding: '11px 4px',
              marginBottom: -1,
              border: 'none',
              background: 'transparent',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-medium)',
              color: on ? 'var(--text-strong)' : 'var(--text-muted)',
              cursor: 'pointer',
              marginRight: 20,
              transition: 'color var(--duration-fast) var(--ease-standard)',
            }}
          >
            {t.label}
            <span style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: 2,
              borderRadius: 2,
              background: on ? 'var(--color-primary)' : 'transparent',
              transition: 'background var(--duration-fast) var(--ease-standard)',
            }} />
          </button>
        );
      })}
    </div>
  );
}
