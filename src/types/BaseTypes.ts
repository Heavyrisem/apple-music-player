import { HTMLAttributes } from 'react';

export interface ComponentBaseProps {}

export interface IconBaseProps extends ComponentBaseProps, HTMLAttributes<SVGElement> {
  fillColor?: string;
}
