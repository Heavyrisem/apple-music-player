import { CSSInterpolation } from '@emotion/serialize';

export interface ComponentBaseProps {
  Css?: CSSInterpolation;
}

export interface IconBaseProps extends ComponentBaseProps {
  fillColor?: string;
}
