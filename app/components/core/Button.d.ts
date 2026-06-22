import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Icon node rendered before the label */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label */
  iconRight?: React.ReactNode;
  /** Stretch to container width. @default false */
  fullWidth?: boolean;
}

/**
 * Primary action control for EverLedge.
 * @startingPoint section="Core" subtitle="Buttons in every variant & size" viewport="700x180"
 */
export function Button(props: ButtonProps): JSX.Element;
