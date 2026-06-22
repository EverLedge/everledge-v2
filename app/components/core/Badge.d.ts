import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic tone. @default "neutral" */
  tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'gold';
  /** Prepend a small status dot. @default false */
  dot?: boolean;
}

/** Compact status pill mapped to the semantic colour system. */
export function Badge(props: BadgeProps): JSX.Element;
