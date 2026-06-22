import * as React from 'react';

export interface GiftCardProps {
  /** Recipient full name. */
  recipient: string;
  /** Relationship, e.g. "Daughter". */
  relationship?: string | null;
  /** Pre-formatted gift value, e.g. "£250,000". */
  value: string;
  /** Date the gift was made — ISO string or Date. */
  giftDate: string | Date;
  /** Reference "today" date. @default now */
  asOf?: string | Date;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * Compact gift record card: recipient, value, date, PET status badge and a
 * mini seven-year progress bar. Turns gold once fully exempt.
 * @startingPoint section="Estate" subtitle="Gift record card with PET status" viewport="360x220"
 */
export function GiftCard(props: GiftCardProps): JSX.Element;
