import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inner padding (any CSS length / token). @default "var(--space-5)" */
  padding?: string;
  /** Adds hover lift + pointer for clickable cards. @default false */
  interactive?: boolean;
  /** Optional top accent rule. `"gold"` marks a premium/milestone card. */
  accent?: 'gold' | null;
}

/**
 * Elevated white surface — the primary container throughout EverLedge.
 * @startingPoint section="Core" subtitle="Elevated card surfaces" viewport="700x220"
 */
export function Card(props: CardProps): JSX.Element;
