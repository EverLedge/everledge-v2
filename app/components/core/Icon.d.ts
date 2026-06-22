import * as React from 'react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /** Lucide icon name in kebab-case, e.g. "file-text", "shield", "landmark". */
  name: string;
  /** Pixel size (width = height). @default 20 */
  size?: number;
  /** Stroke width. @default 1.75 */
  strokeWidth?: number;
  /** Stroke colour. @default "currentColor" */
  color?: string;
}

/** Lucide stroke-icon wrapper. Requires the Lucide CDN script on the page. */
export function Icon(props: IconProps): JSX.Element;
