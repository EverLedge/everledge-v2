import * as React from 'react';

export interface CheckboxProps {
  /** Label text to the right of the box. */
  label?: React.ReactNode;
  /** Controlled checked state. */
  checked?: boolean;
  /** Uncontrolled initial state. */
  defaultChecked?: boolean;
  /** (checked: boolean, event) => void */
  onChange?: (checked: boolean, e: React.MouseEvent) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Square checkbox with check glyph, fills primary blue when on. */
export function Checkbox(props: CheckboxProps): JSX.Element;
