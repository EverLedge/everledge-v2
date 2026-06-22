import * as React from 'react';

export interface PETTimelineProps {
  /** Date the gift was made — ISO string or Date. */
  giftDate: string | Date;
  /** Reference "today" date. @default now */
  asOf?: string | Date;
  /** Render the year milestone ticks (0–7). @default true */
  showMilestones?: boolean;
  style?: React.CSSProperties;
}

/**
 * Signature EverLedge component: visualises a Potentially Exempt Transfer
 * across its seven-year window — gift date, taper-relief milestones, today's
 * position, progress toward exemption, and the estimated exemption date.
 * @startingPoint section="Estate" subtitle="The signature 7-year PET timeline" viewport="700x300"
 */
export function PETTimeline(props: PETTimelineProps): JSX.Element;
