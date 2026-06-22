import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the control. */
  label?: string | null;
  /** Helper text below the field. */
  hint?: string | null;
  /** Error message — turns the field red and replaces the hint. */
  error?: string | null;
  /** Icon node inside the field, leading edge. */
  iconLeft?: React.ReactNode;
  /** Static prefix string, e.g. "£". */
  prefix?: string | null;
}

/** Labelled text input with focus glow, hint, error, prefix and leading-icon support. */
export function Input(props: InputProps): JSX.Element;
