import * as React from 'react';

export interface SidebarNavItem {
  id: string;
  label: string;
  /** Lucide icon name. */
  icon: string;
  /** Optional count/badge shown at the right. */
  badge?: string | number;
}

export interface SidebarNavProps {
  items: SidebarNavItem[];
  /** id of the active item. */
  active?: string;
  onSelect?: (id: string) => void;
  /** Footer content, e.g. an account row. */
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * EverLedge left-hand primary navigation with wordmark and active marker.
 * @startingPoint section="Navigation" subtitle="App sidebar navigation" viewport="280x560"
 */
export function SidebarNav(props: SidebarNavProps): JSX.Element;
