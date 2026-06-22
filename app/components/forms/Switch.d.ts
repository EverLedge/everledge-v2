import * as React from 'react';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, e: React.MouseEvent) => void;
  disabled?: boolean;
  /** Optional label to the right. */
  label?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Pill toggle switch, fills primary blue when on. */
export function Switch(props: SwitchProps): JSX.Element;
