import * as React from 'react';

export interface SummaryDelta {
  value: string;
  direction: 'up' | 'down' | 'flat';
}

export interface SummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric label, e.g. "Net Estate Value". */
  label: string;
  /** Pre-formatted figure, e.g. "£4.28M". */
  value: string;
  /** Lucide icon name for the corner chip. */
  icon?: string | null;
  /** Small muted caption beneath the figure. */
  caption?: string | null;
  /** Optional trend indicator. */
  delta?: SummaryDelta | null;
  /** Gold treatment for premium/milestone metrics. @default false */
  accent?: boolean;
}

/**
 * Dashboard summary metric card (Net Estate Value, IHT Exposure, …).
 * @startingPoint section="Estate" subtitle="Dashboard summary metric cards" viewport="320x180"
 */
export function SummaryCard(props: SummaryCardProps): JSX.Element;
