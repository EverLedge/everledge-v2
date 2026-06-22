import * as React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Field label above the control. */
  label?: string | null;
  /** Helper text below the field. */
  hint?: string | null;
}

/** Styled native select with custom chevron, matching the Input field. */
export function Select(props: SelectProps): JSX.Element;
