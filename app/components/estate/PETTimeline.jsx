import React from 'react';

const MS_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/* UK taper relief: % of the FULL 40% IHT charge that still applies, by years elapsed */
function taperBand(years) {
  if (years >= 7) return { label: 'Fully exempt', taxPct: 0, tone: 'success' };
  if (years >= 6) return { label: '20% of charge', taxPct: 20, tone: 'success' };
  if (years >= 5) return { label: '40% of charge', taxPct: 40, tone: 'warning' };
  if (years >= 4) return { label: '60% of charge', taxPct: 60, tone: 'warning' };
  if (years >= 3) return { label: '80% of charge', taxPct: 80, tone: 'warning' };
  return { label: 'Full charge', taxPct: 100, tone: 'danger' };
}

function fmtDate(d) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Signature PET (Potentially Exempt Transfer) Timeline.
 * Shows the gift date, the seven-year period, taper-relief milestones,
 * a "today" position, and progress toward full exemption.
 */
export function PETTimeline({
  giftDate,            // ISO string or Date
  asOf = new Date(),
  showMilestones = true,
  height = 'auto',
  style = {},
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
    danger: 'var(--status-danger)',
  }[band.tone];

  const fillColor = exempt ? 'var(--gold-600)' : 'var(--color-primary)';

  return (
    <div style={{ fontFamily: 'var(--font-sans)', ...style }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-5)' }}>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 6 }}>
            {exempt ? 'Exemption status' : 'Time to exemption'}
          </div>
          <div style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-strong)', letterSpacing: 'var(--tracking-snug)' }}>
            {exempt ? 'Fully exempt' : `${(7 - yearsElapsed).toFixed(1)} years remaining`}
          </div>
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 11px', borderRadius: 'var(--radius-pill)',
          fontSize: 'var(--text-xs)', fontWeight: 600,
          color: exempt ? 'var(--gold-700)' : toneColor,
          background: exempt ? 'var(--gold-50)' : 'var(--surface-sunken)',
          border: `1px solid ${exempt ? 'var(--gold-100)' : 'var(--border-subtle)'}`,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: exempt ? 'var(--gold-600)' : toneColor }} />
          {band.label}
        </span>
      </div>

      {/* Track */}
      <div style={{ position: 'relative', padding: '0 2px' }}>
        <div style={{
          position: 'relative', height: 12, borderRadius: 'var(--radius-pill)',
          background: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            width: `${progress * 100}%`,
            background: exempt
              ? 'linear-gradient(90deg, var(--gold-400), var(--gold-600))'
              : 'linear-gradient(90deg, var(--blue-500), var(--color-primary))',
            borderRadius: 'var(--radius-pill)',
            transition: 'width var(--duration-slow) var(--ease-emphasis)',
          }} />
        </div>

        {/* Today marker */}
        {!exempt && (
          <div style={{ position: 'absolute', top: -5, left: `${progress * 100}%`, transform: 'translateX(-50%)' }}>
            <div style={{ width: 2, height: 22, background: 'var(--navy-800)', borderRadius: 2, margin: '0 auto' }} />
          </div>
        )}

        {/* Year milestone ticks */}
        {showMilestones && (
          <div style={{ position: 'relative', marginTop: 12, height: 36 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((yr) => {
              const reached = yearsElapsed >= yr;
              const isExemptTick = yr === 7;
              return (
                <div key={yr} style={{ position: 'absolute', left: `${(yr / 7) * 100}%`, transform: 'translateX(-50%)', textAlign: 'center' }}>
                  <div style={{
                    width: isExemptTick ? 9 : 6, height: isExemptTick ? 9 : 6, borderRadius: '50%',
                    margin: '0 auto 7px',
                    background: isExemptTick ? 'var(--gold-600)' : reached ? fillColor : 'var(--border-strong)',
                    boxShadow: isExemptTick ? '0 0 0 3px var(--gold-100)' : 'none',
                  }} />
                  <div style={{ fontSize: 11, fontWeight: 500, color: reached ? 'var(--text-body)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {yr === 0 ? 'Gift' : `Yr ${yr}`}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer endpoints */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Gift made</div>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>{fmtDate(start)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Exempt from</div>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: exempt ? 'var(--gold-700)' : 'var(--text-strong)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>{fmtDate(exemptDate)}</div>
        </div>
      </div>
    </div>
  );
}
