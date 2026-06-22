import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Full name — initials are derived from it. */
  name?: string;
  /** Optional image URL. Falls back to initials. */
  src?: string | null;
  /** Diameter in px. @default 40 */
  size?: number;
  /** Tint. @default "navy" */
  tone?: 'navy' | 'blue' | 'gold';
}

/** Circular avatar with derived initials or an image. */
export function Avatar(props: AvatarProps): JSX.Element;
