import * as React from 'react';

export interface TabItem { id: string; label: string; }

export interface TabsProps {
  tabs: TabItem[];
  active?: string;
  defaultActive?: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}

/** Underline tab bar for in-page section switching. */
export function Tabs(props: TabsProps): JSX.Element;
