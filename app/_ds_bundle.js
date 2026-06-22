/* @ds-bundle: {"format":3,"namespace":"EverLedgeDesignSystem_de3ce8","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"GiftCard","sourcePath":"components/estate/GiftCard.jsx"},{"name":"PETTimeline","sourcePath":"components/estate/PETTimeline.jsx"},{"name":"SummaryCard","sourcePath":"components/estate/SummaryCard.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"SidebarNav","sourcePath":"components/navigation/SidebarNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"ad088bcf0419","components/core/Badge.jsx":"b6ca2c380e99","components/core/Button.jsx":"ede7f967ff04","components/core/Card.jsx":"f586e1018867","components/core/Icon.jsx":"55f1af9915c7","components/estate/GiftCard.jsx":"ec966d64e1a2","components/estate/PETTimeline.jsx":"12fccc4a8d93","components/estate/SummaryCard.jsx":"c7e07736bf86","components/forms/Checkbox.jsx":"7eca80835f59","components/forms/Input.jsx":"f90e53eca510","components/forms/Select.jsx":"a55934046a44","components/forms/Switch.jsx":"f6d5c98015b8","components/navigation/SidebarNav.jsx":"1b2cd699f417","components/navigation/Tabs.jsx":"26bc475a2e21","ui_kits/web-app/GiftsScreen.jsx":"21ac3c30205a","ui_kits/web-app/OverviewScreen.jsx":"a33cd2bdae19","ui_kits/web-app/SecondaryScreens.jsx":"9135fd0a3d69","ui_kits/web-app/Topbar.jsx":"c6dd07b659e1","ui_kits/web-app/data.js":"23b22a69ab66"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EverLedgeDesignSystem_de3ce8 = window.EverLedgeDesignSystem_de3ce8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — initials on a calm tinted ground, or an image.
 * Used for recipients, executors, and family members.
 */
function Avatar({
  name = '',
  src = null,
  size = 40,
  tone = 'navy',
  // navy | blue | gold
  style = {},
  ...rest
}) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('');
  const tones = {
    navy: {
      bg: 'var(--blue-50)',
      fg: 'var(--navy-800)'
    },
    blue: {
      bg: 'var(--blue-100)',
      fg: 'var(--blue-700)'
    },
    gold: {
      bg: 'var(--gold-50)',
      fg: 'var(--gold-700)'
    }
  };
  const t = tones[tone] || tones.navy;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
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
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || '—');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Status badge / pill. Tones map to the semantic colour system.
 * dot=true prepends a small status dot. subtle=true uses tinted background.
 */
function Badge({
  children,
  tone = 'neutral',
  // neutral | primary | success | warning | danger | gold
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      fg: 'var(--neutral-600)',
      bg: 'var(--neutral-100)',
      bd: 'var(--neutral-200)'
    },
    primary: {
      fg: 'var(--blue-700)',
      bg: 'var(--blue-50)',
      bd: 'var(--blue-100)'
    },
    success: {
      fg: 'var(--green-700)',
      bg: 'var(--green-50)',
      bd: '#CFE6D8'
    },
    warning: {
      fg: 'var(--amber-700)',
      bg: 'var(--amber-50)',
      bd: '#EEDCBE'
    },
    danger: {
      fg: 'var(--red-600)',
      bg: 'var(--red-50)',
      bd: '#E9CFCD'
    },
    gold: {
      fg: 'var(--gold-700)',
      bg: 'var(--gold-50)',
      bd: 'var(--gold-100)'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
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
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: t.fg,
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EverLedge primary action button.
 * Variants: primary (blue), secondary (outline), ghost, gold (premium), danger.
 */
function Button({
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
    sm: {
      padding: '0 14px',
      height: 34,
      font: 'var(--text-sm)',
      gap: 7
    },
    md: {
      padding: '0 18px',
      height: 42,
      font: 'var(--text-base)',
      gap: 8
    },
    lg: {
      padding: '0 24px',
      height: 50,
      font: 'var(--text-base)',
      gap: 10
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--text-on-primary)',
      border: '1px solid var(--color-primary)',
      boxShadow: 'var(--shadow-xs)'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent'
    },
    gold: {
      background: 'var(--accent-premium)',
      color: '#fff',
      border: '1px solid var(--gold-700)',
      boxShadow: 'var(--shadow-xs)'
    },
    danger: {
      background: 'var(--surface-card)',
      color: 'var(--status-danger)',
      border: '1px solid var(--status-danger)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
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
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(0.5px)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Elevated content surface — the workhorse container of EverLedge.
 * Clean white, hairline border, soft shadow, gentle lift on hover (interactive).
 */
function Card({
  children,
  padding = 'var(--space-5)',
  interactive = false,
  accent = null,
  // null | 'gold' — a thin top accent rule for premium cards
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
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
      ...style
    }
  }, rest), accent === 'gold' && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: 'linear-gradient(90deg, var(--gold-600), var(--gold-400))'
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* kebab-case -> PascalCase, e.g. "file-text" -> "FileText" */
function pascal(name) {
  return String(name).split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

/**
 * Lucide icon wrapper. Renders a crisp stroke SVG from the globally-loaded
 * Lucide library (window.lucide). Pages must include the Lucide CDN script.
 */
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  color = 'currentColor',
  style = {},
  ...rest
}) {
  const lib = typeof window !== 'undefined' ? window.lucide : null;
  const node = lib && lib.icons ? lib.icons[pascal(name)] : null;
  const base = {
    width: size,
    height: size,
    display: 'inline-block',
    flex: 'none',
    verticalAlign: 'middle',
    color,
    ...style
  };
  if (!node) {
    // Graceful fallback before Lucide loads (or unknown name)
    return /*#__PURE__*/React.createElement("span", _extends({
      "aria-hidden": "true",
      style: {
        ...base,
        borderRadius: 3,
        background: 'transparent'
      }
    }, rest));
  }

  /* Lucide's UMD `icons` map can be either:
     - an array of [tag, attrs] child tuples, or
     - a full [tag, attrs, children] svg node.
     Resolve the child tuples either way. */
  let children = node;
  if (Array.isArray(node) && typeof node[0] === 'string') {
    children = Array.isArray(node[2]) ? node[2] : [];
  }
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: base
  }, rest), children.map((child, i) => {
    const [tag, attrs] = child;
    return React.createElement(tag, {
      key: i,
      ...attrs
    });
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/estate/GiftCard.jsx
try { (() => {
const MS_YEAR = 365.25 * 24 * 60 * 60 * 1000;
function statusFor(years) {
  if (years >= 7) return {
    tone: 'success',
    label: 'Exempt',
    dot: true
  };
  const remaining = 7 - years;
  if (remaining <= 2) return {
    tone: 'warning',
    label: `${remaining.toFixed(1)} yrs left`,
    dot: true
  };
  return {
    tone: 'primary',
    label: `${remaining.toFixed(1)} yrs left`,
    dot: true
  };
}

/**
 * Compact gift record card — recipient, value, date, PET status, mini progress.
 * Readability and confidence over density.
 */
function GiftCard({
  recipient,
  relationship = null,
  value,
  // pre-formatted, e.g. "£250,000"
  giftDate,
  // ISO / Date
  asOf = new Date(),
  onClick,
  style = {}
}) {
  const start = new Date(giftDate);
  const now = asOf instanceof Date ? asOf : new Date(asOf);
  const years = Math.max(0, (now - start) / MS_YEAR);
  const progress = Math.min(1, years / 7);
  const st = statusFor(years);
  const exempt = years >= 7;
  const [hover, setHover] = React.useState(false);
  const dateStr = start.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      transition: 'box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)',
      cursor: onClick ? 'pointer' : 'default',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: recipient,
    size: 42,
    tone: exempt ? 'gold' : 'navy'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-strong)',
      letterSpacing: 'var(--tracking-snug)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, recipient), relationship && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, relationship)), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: st.tone,
    dot: st.dot
  }, st.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-medium)',
      fontSize: '1.6rem',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)'
    }
  }, dateStr)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 6,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-sunken)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: `${progress * 100}%`,
      borderRadius: 'var(--radius-pill)',
      background: exempt ? 'linear-gradient(90deg, var(--gold-400), var(--gold-600))' : 'linear-gradient(90deg, var(--blue-500), var(--color-primary))',
      transition: 'width var(--duration-slow) var(--ease-emphasis)'
    }
  })));
}
Object.assign(__ds_scope, { GiftCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/estate/GiftCard.jsx", error: String((e && e.message) || e) }); }

// components/estate/PETTimeline.jsx
try { (() => {
const MS_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/* UK taper relief: % of the FULL 40% IHT charge that still applies, by years elapsed */
function taperBand(years) {
  if (years >= 7) return {
    label: 'Fully exempt',
    taxPct: 0,
    tone: 'success'
  };
  if (years >= 6) return {
    label: '20% of charge',
    taxPct: 20,
    tone: 'success'
  };
  if (years >= 5) return {
    label: '40% of charge',
    taxPct: 40,
    tone: 'warning'
  };
  if (years >= 4) return {
    label: '60% of charge',
    taxPct: 60,
    tone: 'warning'
  };
  if (years >= 3) return {
    label: '80% of charge',
    taxPct: 80,
    tone: 'warning'
  };
  return {
    label: 'Full charge',
    taxPct: 100,
    tone: 'danger'
  };
}
function fmtDate(d) {
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Signature PET (Potentially Exempt Transfer) Timeline.
 * Shows the gift date, the seven-year period, taper-relief milestones,
 * a "today" position, and progress toward full exemption.
 */
function PETTimeline({
  giftDate,
  // ISO string or Date
  asOf = new Date(),
  showMilestones = true,
  height = 'auto',
  style = {}
}) {
  const start = new Date(giftDate);
  const now = asOf instanceof Date ? asOf : new Date(asOf);
  const exemptDate = new Date(start.getTime() + 7 * MS_YEAR);
  const yearsElapsed = Math.max(0, (now - start) / MS_YEAR);
  const progress = Math.min(1, yearsElapsed / 7);
  const exempt = yearsElapsed >= 7;
  const band = taperBand(yearsElapsed);
  const toneColor = {
    success: 'var(--status-success)',
    warning: 'var(--status-warning)',
    danger: 'var(--status-danger)'
  }[band.tone];
  const fillColor = exempt ? 'var(--gold-600)' : 'var(--color-primary)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 600,
      marginBottom: 6
    }
  }, exempt ? 'Exemption status' : 'Time to exemption'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-h3)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-strong)',
      letterSpacing: 'var(--tracking-snug)'
    }
  }, exempt ? 'Fully exempt' : `${(7 - yearsElapsed).toFixed(1)} years remaining`)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 11px',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      color: exempt ? 'var(--gold-700)' : toneColor,
      background: exempt ? 'var(--gold-50)' : 'var(--surface-sunken)',
      border: `1px solid ${exempt ? 'var(--gold-100)' : 'var(--border-subtle)'}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: exempt ? 'var(--gold-600)' : toneColor
    }
  }), band.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '0 2px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 12,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-subtle)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: `${progress * 100}%`,
      background: exempt ? 'linear-gradient(90deg, var(--gold-400), var(--gold-600))' : 'linear-gradient(90deg, var(--blue-500), var(--color-primary))',
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--duration-slow) var(--ease-emphasis)'
    }
  })), !exempt && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -5,
      left: `${progress * 100}%`,
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 2,
      height: 22,
      background: 'var(--navy-800)',
      borderRadius: 2,
      margin: '0 auto'
    }
  })), showMilestones && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 12,
      height: 36
    }
  }, [0, 1, 2, 3, 4, 5, 6, 7].map(yr => {
    const reached = yearsElapsed >= yr;
    const isExemptTick = yr === 7;
    return /*#__PURE__*/React.createElement("div", {
      key: yr,
      style: {
        position: 'absolute',
        left: `${yr / 7 * 100}%`,
        transform: 'translateX(-50%)',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: isExemptTick ? 9 : 6,
        height: isExemptTick ? 9 : 6,
        borderRadius: '50%',
        margin: '0 auto 7px',
        background: isExemptTick ? 'var(--gold-600)' : reached ? fillColor : 'var(--border-strong)',
        boxShadow: isExemptTick ? '0 0 0 3px var(--gold-100)' : 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 500,
        color: reached ? 'var(--text-body)' : 'var(--text-muted)',
        fontFamily: 'var(--font-mono)'
      }
    }, yr === 0 ? 'Gift' : `Yr ${yr}`));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 'var(--space-4)',
      paddingTop: 'var(--space-4)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, "Gift made"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-mono)',
      marginTop: 3
    }
  }, fmtDate(start))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, "Exempt from"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: exempt ? 'var(--gold-700)' : 'var(--text-strong)',
      fontFamily: 'var(--font-mono)',
      marginTop: 3
    }
  }, fmtDate(exemptDate)))));
}
Object.assign(__ds_scope, { PETTimeline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/estate/PETTimeline.jsx", error: String((e && e.message) || e) }); }

// components/estate/SummaryCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Top-level summary metric card for the dashboard.
 * Quiet icon chip, large mono figure, optional delta + caption.
 */
function SummaryCard({
  label,
  value,
  icon = null,
  caption = null,
  delta = null,
  // { value: '+£12,000', direction: 'up' | 'down' | 'flat' }
  accent = false,
  // gold treatment for premium/milestone metrics
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const deltaColor = delta ? delta.direction === 'down' ? 'var(--status-danger)' : delta.direction === 'up' ? 'var(--status-success)' : 'var(--text-muted)' : null;
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-5)',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      transition: 'box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
      ...style
    }
  }, rest), accent && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: 'linear-gradient(90deg, var(--gold-600), var(--gold-400))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-muted)'
    }
  }, label), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-md)',
      flex: 'none',
      background: accent ? 'var(--gold-50)' : 'var(--blue-50)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 19,
    color: accent ? 'var(--gold-700)' : 'var(--blue-600)'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'clamp(1.5rem, 2.1vw, 2rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap'
    }
  }, value), (caption || delta) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 'var(--space-3)'
    }
  }, delta && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      color: deltaColor
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: delta.direction === 'down' ? 'trending-down' : delta.direction === 'flat' ? 'minus' : 'trending-up',
    size: 14,
    color: deltaColor
  }), delta.value), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, caption)));
}
Object.assign(__ds_scope, { SummaryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/estate/SummaryCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox with label. Controlled or uncontrolled. */
function Checkbox({
  label = null,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style = {},
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on, e);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    onClick: toggle,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: 'none',
      borderRadius: 'var(--radius-xs)',
      border: `1.5px solid ${on ? 'var(--color-primary)' : 'var(--border-strong)'}`,
      background: on ? 'var(--color-primary)' : 'var(--surface-card)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)'
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with optional label, hint, leading icon, and error state.
 * Calm, generous, hairline border that warms to the primary blue on focus.
 */
function Input({
  label = null,
  hint = null,
  error = null,
  iconLeft = null,
  prefix = null,
  // e.g. "£" for currency
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `el-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const borderColor = error ? 'var(--status-danger)' : focus ? 'var(--border-focus)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 44,
      padding: '0 14px',
      background: 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)'
    }
  }, iconLeft, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 'var(--text-base)'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-strong)',
      ...style
    }
  }))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--status-danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native-backed select styled to match EverLedge inputs. */
function Select({
  label = null,
  hint = null,
  children,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const selectId = id || (label ? `el-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      fontFamily: 'var(--font-sans)'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 44,
      background: 'var(--surface-card)',
      border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selectId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
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
      ...style
    }
  }), children), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-muted)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: 'absolute',
      right: 13,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch. Controlled or uncontrolled. */
function Switch({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label = null,
  style = {},
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on, e);
  };
  const track = /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    style: {
      width: 42,
      height: 24,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      background: on ? 'var(--color-primary)' : 'var(--neutral-300)',
      position: 'relative',
      transition: 'background var(--duration-base) var(--ease-standard)',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: on ? 20 : 2,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--duration-base) var(--ease-emphasis)'
    }
  }));
  if (!label) return track;
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, rest), track, label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNav.jsx
try { (() => {
/**
 * Left-hand primary navigation for the EverLedge web app.
 * Wordmark at top, icon+label items, active item marked with a left rule
 * and tinted ground. Optional footer slot (account).
 */
function SidebarNav({
  items = [],
  // [{ id, label, icon, badge }]
  active,
  onSelect = () => {},
  footer = null,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 'var(--sidebar-width)',
      flex: 'none',
      height: '100%',
      background: 'var(--surface-card)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6) var(--space-5) var(--space-5)',
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/app/assets/everledge-mark.png",
    alt: "EverLedge",
    width: 32,
    height: 32,
    style: {
      flex: 'none',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.18rem',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: '-0.02em',
      color: 'var(--navy-800)'
    }
  }, "EverLedge")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '0 var(--space-3)',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      overflowY: 'auto'
    }
  }, items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onSelect(it.id),
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '10px 12px',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        background: on ? 'var(--blue-50)' : 'transparent',
        color: on ? 'var(--blue-700)' : 'var(--text-body)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-medium)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = 'var(--neutral-50)';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 19,
      color: on ? 'var(--blue-600)' : 'var(--neutral-500)'
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label), it.badge != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--neutral-0)',
        background: 'var(--neutral-500)',
        borderRadius: 'var(--radius-pill)',
        padding: '1px 7px'
      }
    }, it.badge));
  })), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, footer));
}
Object.assign(__ds_scope, { SidebarNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Underline tab bar. Controlled or uncontrolled. */
function Tabs({
  tabs = [],
  active,
  defaultActive,
  onChange,
  style = {}
}) {
  const isControlled = active !== undefined;
  const [internal, setInternal] = React.useState(defaultActive ?? (tabs[0] && tabs[0].id));
  const current = isControlled ? active : internal;
  const select = id => {
    if (!isControlled) setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, tabs.map(t => {
    const on = t.id === current;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => select(t.id),
      style: {
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
        transition: 'color var(--duration-fast) var(--ease-standard)'
      }
    }, t.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 2,
        borderRadius: 2,
        background: on ? 'var(--color-primary)' : 'transparent',
        transition: 'background var(--duration-fast) var(--ease-standard)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/GiftsScreen.jsx
try { (() => {
/* Gifts — grid of gift records with PET status, filter tabs, record flow. */
function GiftsScreen() {
  const {
    Card,
    GiftCard,
    Tabs,
    Button,
    Icon,
    Input,
    Select,
    Checkbox,
    Badge
  } = window.EverLedgeDesignSystem_de3ce8;
  const D = window.EL_DATA;
  const [tab, setTab] = React.useState('all');
  const [recording, setRecording] = React.useState(false);
  const MS = 365.25 * 24 * 3600 * 1000;
  const yrs = d => (Date.now() - new Date(d)) / MS;
  const filtered = D.gifts.filter(g => {
    if (tab === 'exempt') return yrs(g.giftDate) >= 7;
    if (tab === 'active') return yrs(g.giftDate) < 7;
    return true;
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 36px 56px',
      maxWidth: 'var(--content-max)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    active: tab,
    onChange: setTab,
    tabs: [{
      id: 'all',
      label: `All gifts · ${D.gifts.length}`
    }, {
      id: 'active',
      label: 'Active PETs'
    }, {
      id: 'exempt',
      label: 'Exempt'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 18,
      marginTop: 24
    }
  }, filtered.map(g => /*#__PURE__*/React.createElement(GiftCard, {
    key: g.id,
    recipient: g.recipient,
    relationship: g.relationship,
    value: g.value,
    giftDate: g.giftDate,
    onClick: () => {}
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setRecording(true),
    style: {
      border: '1.5px dashed var(--border-strong)',
      borderRadius: 'var(--radius-lg)',
      background: 'transparent',
      minHeight: 196,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      cursor: 'pointer',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      borderRadius: '50%',
      background: 'var(--blue-50)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 22,
    color: "var(--blue-600)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Record a gift"))), recording && /*#__PURE__*/React.createElement(RecordGiftDialog, {
    onClose: () => setRecording(false)
  }));
}
function RecordGiftDialog({
  onClose
}) {
  const {
    Card,
    Input,
    Select,
    Checkbox,
    Button,
    Icon
  } = window.EverLedgeDesignSystem_de3ce8;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(19,29,39,0.42)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 520,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 28px',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, "New record"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '5px 0 0',
      fontSize: 'var(--text-h3)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Record a lifetime gift")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)',
      background: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18,
    color: "var(--neutral-500)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 28px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Recipient",
    placeholder: "Full legal name"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Relationship"
  }, /*#__PURE__*/React.createElement("option", null, "Daughter"), /*#__PURE__*/React.createElement("option", null, "Son"), /*#__PURE__*/React.createElement("option", null, "Grandchild"), /*#__PURE__*/React.createElement("option", null, "Spouse"), /*#__PURE__*/React.createElement("option", null, "Trust"), /*#__PURE__*/React.createElement("option", null, "Charity")), /*#__PURE__*/React.createElement(Input, {
    label: "Gift value",
    prefix: "\xA3",
    placeholder: "0.00"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Date of gift",
    type: "date",
    defaultValue: "2025-02-01"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Made from surplus income (exempt from IHT)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 28px',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      background: 'var(--neutral-50)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onClose,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16
    })
  }, "Record gift"))));
}
window.GiftsScreen = GiftsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/GiftsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/OverviewScreen.jsx
try { (() => {
/* Overview / dashboard — clarity and reassurance. */
function OverviewScreen() {
  const {
    SummaryCard,
    Card,
    PETTimeline,
    Icon,
    Button,
    Badge
  } = window.EverLedgeDesignSystem_de3ce8;
  const D = window.EL_DATA;
  const actionTone = {
    warning: {
      bg: 'var(--status-warning-bg)',
      fg: 'var(--status-warning)'
    },
    primary: {
      bg: 'var(--blue-50)',
      fg: 'var(--blue-600)'
    },
    neutral: {
      bg: 'var(--neutral-100)',
      fg: 'var(--neutral-600)'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '32px 36px 56px',
      maxWidth: 'var(--content-max)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 18,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Net Estate Value",
    value: D.summary.netEstate,
    icon: "landmark",
    delta: D.summary.netEstateDelta,
    caption: "vs last valuation"
  }), /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Lifetime Gifts",
    value: D.summary.lifetimeGifts,
    icon: "gift",
    caption: "6 recorded"
  }), /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Estimated IHT Exposure",
    value: D.summary.ihtExposure,
    icon: "shield",
    caption: "after reliefs"
  }), /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Executors Recorded",
    value: D.summary.executors,
    icon: "users",
    caption: "1 pending"
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)",
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 600,
      marginBottom: 6
    }
  }, "Next exemption milestone"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h3)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Gift to Eleanor \u2014 \xA3250,000")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 16
    })
  }, "View all PETs")), /*#__PURE__*/React.createElement(PETTimeline, {
    giftDate: "2021-04-02"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 18px',
      fontSize: 'var(--text-h4)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Recent activity"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, D.activity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '13px 0',
      borderBottom: i < D.activity.length - 1 ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--blue-50)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.icon,
    size: 17,
    color: "var(--blue-600)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, a.text), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)',
      marginTop: 2
    }
  }, a.who)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, a.when))))), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 18px',
      fontSize: 'var(--text-h4)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Action centre"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, D.actions.map((a, i) => {
    const t = actionTone[a.tone];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 13,
        padding: 14,
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        flex: 'none',
        borderRadius: 'var(--radius-sm)',
        background: t.bg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.icon,
      size: 16,
      color: t.fg
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, a.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
        marginTop: 3,
        lineHeight: 1.4
      }
    }, a.detail)), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 16,
      color: "var(--neutral-400)"
    }));
  })))));
}
window.OverviewScreen = OverviewScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/OverviewScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/SecondaryScreens.jsx
try { (() => {
/* Executors & Documents screens. */
function ExecutorsScreen() {
  const {
    Card,
    Avatar,
    Badge,
    Button,
    Icon
  } = window.EverLedgeDesignSystem_de3ce8;
  const D = window.EL_DATA;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '32px 36px 56px',
      maxWidth: 'var(--content-max)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-base)',
      color: 'var(--text-muted)',
      maxWidth: 560,
      lineHeight: 1.55
    }
  }, "The people entrusted to administer your estate. Keep their details current so your affairs can be settled without delay."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 16
    })
  }, "Add executor")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 18
    }
  }, D.executors.map((e, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    accent: e.tone === 'gold' ? 'gold' : null,
    padding: "var(--space-6)"
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: e.name,
    size: 52,
    tone: e.tone,
    style: {
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-h4)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, e.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginTop: 4,
      marginBottom: 16
    }
  }, e.relationship), /*#__PURE__*/React.createElement(Badge, {
    tone: e.tone === 'gold' ? 'gold' : 'primary'
  }, e.role)))));
}
window.ExecutorsScreen = ExecutorsScreen;
function DocumentsScreen() {
  const {
    Card,
    Badge,
    Icon,
    Button
  } = window.EverLedgeDesignSystem_de3ce8;
  const D = window.EL_DATA;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '32px 36px 56px',
      maxWidth: 'var(--content-max)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-base)',
      color: 'var(--text-muted)'
    }
  }, "Securely stored estate documents, available to your executors when needed."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 16
    })
  }, "Upload document")), /*#__PURE__*/React.createElement(Card, {
    padding: "0"
  }, D.documents.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '18px 22px',
      borderBottom: i < D.documents.length - 1 ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--neutral-100)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: d.icon,
    size: 20,
    color: "var(--navy-700)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, d.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)',
      marginTop: 3
    }
  }, d.meta)), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, d.tag), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)',
      background: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 17,
    color: "var(--neutral-500)"
  }))))));
}
window.DocumentsScreen = DocumentsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/SecondaryScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/Topbar.jsx
try { (() => {
/* Top bar: page title, search, notifications, account. */
function Topbar({
  title,
  subtitle,
  action
}) {
  const {
    Icon,
    Avatar
  } = window.EverLedgeDesignSystem_de3ce8;
  const D = window.EL_DATA;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '20px 36px',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '0 14px',
      background: 'var(--neutral-50)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      width: 220,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 17,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)'
    }
  }, "Search estate\u2026")), action, /*#__PURE__*/React.createElement("button", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 19,
    color: "var(--neutral-600)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 9,
      right: 9,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--status-warning)',
      border: '1.5px solid #fff'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      paddingLeft: 6
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: D.user.name,
    tone: "navy",
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.25
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, D.user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--gold-700)',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 11,
    color: "var(--gold-600)"
  }), " ", D.user.plan))));
}
window.Topbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web-app/data.js
try { (() => {
/* Sample data for the EverLedge web-app UI kit. Illustrative only. */
window.EL_DATA = {
  user: {
    name: 'Charles Whitcombe',
    initials: 'CW',
    plan: 'Private Office'
  },
  summary: {
    netEstate: '£4.28M',
    netEstateDelta: {
      value: '+£86,000',
      direction: 'up'
    },
    lifetimeGifts: '£840,000',
    ihtExposure: '£612,000',
    executors: '3'
  },
  gifts: [{
    id: 'g1',
    recipient: 'Eleanor Whitcombe',
    relationship: 'Daughter',
    value: '£250,000',
    raw: 250000,
    giftDate: '2021-04-02'
  }, {
    id: 'g2',
    recipient: 'Thomas Whitcombe',
    relationship: 'Son',
    value: '£180,000',
    raw: 180000,
    giftDate: '2016-02-20'
  }, {
    id: 'g3',
    recipient: 'Margaret Holloway',
    relationship: 'Sister',
    value: '£60,000',
    raw: 60000,
    giftDate: '2023-11-08'
  }, {
    id: 'g4',
    recipient: 'The Whitcombe Trust',
    relationship: 'Family trust',
    value: '£200,000',
    raw: 200000,
    giftDate: '2019-06-30'
  }, {
    id: 'g5',
    recipient: 'James Ashworth',
    relationship: 'Grandchild',
    value: '£90,000',
    raw: 90000,
    giftDate: '2024-01-15'
  }, {
    id: 'g6',
    recipient: 'St. Aldate\u2019s Foundation',
    relationship: 'Charity',
    value: '£60,000',
    raw: 60000,
    giftDate: '2022-09-14'
  }],
  executors: [{
    name: 'Eleanor Whitcombe',
    relationship: 'Daughter',
    role: 'Primary executor',
    tone: 'gold'
  }, {
    name: 'Geoffrey Sandbourne',
    relationship: 'Family solicitor · Sandbourne LLP',
    role: 'Professional executor',
    tone: 'navy'
  }, {
    name: 'Thomas Whitcombe',
    relationship: 'Son',
    role: 'Reserve executor',
    tone: 'navy'
  }],
  documents: [{
    name: 'Last Will & Testament',
    meta: 'Signed · 12 Mar 2024',
    icon: 'file-text',
    tag: 'Will'
  }, {
    name: 'Lasting Power of Attorney',
    meta: 'Registered · 04 Jan 2023',
    icon: 'shield',
    tag: 'LPA'
  }, {
    name: 'Estate valuation 2025',
    meta: 'Updated · 02 Feb 2025',
    icon: 'landmark',
    tag: 'Valuation'
  }, {
    name: 'Whitcombe Trust deed',
    meta: 'Executed · 30 Jun 2019',
    icon: 'archive',
    tag: 'Trust'
  }, {
    name: 'Property deeds — Ashcroft House',
    meta: 'Stored · 18 Aug 2020',
    icon: 'home',
    tag: 'Property'
  }],
  activity: [{
    icon: 'gift',
    text: 'Gift to James Ashworth recorded',
    who: '£90,000',
    when: '2 days ago'
  }, {
    icon: 'check',
    text: 'Estate valuation updated',
    who: 'Net £4.28M',
    when: '1 week ago'
  }, {
    icon: 'users',
    text: 'Geoffrey Sandbourne added as executor',
    who: 'Professional',
    when: '3 weeks ago'
  }, {
    icon: 'file-text',
    text: 'Will uploaded and verified',
    who: 'Signed',
    when: '1 month ago'
  }],
  actions: [{
    icon: 'calendar',
    title: 'Review 2 PETs nearing exemption',
    detail: 'Thomas & the Whitcombe Trust pass 7 years this year',
    tone: 'warning'
  }, {
    icon: 'landmark',
    title: 'Refresh estate valuation',
    detail: 'Last updated 4 months ago',
    tone: 'primary'
  }, {
    icon: 'users',
    title: 'Confirm reserve executor',
    detail: 'Thomas Whitcombe has not yet accepted',
    tone: 'neutral'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.GiftCard = __ds_scope.GiftCard;

__ds_ns.PETTimeline = __ds_scope.PETTimeline;

__ds_ns.SummaryCard = __ds_scope.SummaryCard;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.SidebarNav = __ds_scope.SidebarNav;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
