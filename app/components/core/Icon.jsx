import React from 'react';

/* kebab-case -> PascalCase, e.g. "file-text" -> "FileText" */
function pascal(name) {
  return String(name)
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

/**
 * Lucide icon wrapper. Renders a crisp stroke SVG from the globally-loaded
 * Lucide library (window.lucide). Pages must include the Lucide CDN script.
 */
export function Icon({ name, size = 20, strokeWidth = 1.75, color = 'currentColor', style = {}, ...rest }) {
  const lib = typeof window !== 'undefined' ? window.lucide : null;
  const node = lib && lib.icons ? lib.icons[pascal(name)] : null;

  const base = {
    width: size,
    height: size,
    display: 'inline-block',
    flex: 'none',
    verticalAlign: 'middle',
    color,
    ...style,
  };

  if (!node) {
    // Graceful fallback before Lucide loads (or unknown name)
    return <span aria-hidden="true" style={{ ...base, borderRadius: 3, background: 'transparent' }} {...rest} />;
  }

  /* Lucide's UMD `icons` map can be either:
     - an array of [tag, attrs] child tuples, or
     - a full [tag, attrs, children] svg node.
     Resolve the child tuples either way. */
  let children = node;
  if (Array.isArray(node) && typeof node[0] === 'string') {
    children = Array.isArray(node[2]) ? node[2] : [];
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={base}
      {...rest}
    >
      {children.map((child, i) => {
        const [tag, attrs] = child;
        return React.createElement(tag, { key: i, ...attrs });
      })}
    </svg>
  );
}
