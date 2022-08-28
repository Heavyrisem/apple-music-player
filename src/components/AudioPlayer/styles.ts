import { css } from '@emotion/react';
import tw from 'twin.macro';

const IconStyle = [
  tw`flex rounded-[0.3rem]`,
  css`
    transition-property: 'opacity';
    transition-duration: '0.5s';
  `,
];
const HoverTransParentStyle = tw`hover:bg-white hover:bg-opacity-20`;

const ControlIconStyle = [tw`w-[2rem] h-[1.75rem] mx-[1px]`, IconStyle, HoverTransParentStyle];
const SmallControlIconStyle = [
  tw`w-[1.5rem] h-[1.5rem] mx-[1px]`,
  IconStyle,
  HoverTransParentStyle,
];

const ActivatedControlIconStyle = tw`bg-white bg-opacity-30`;
const ActivatedHoverControlIconStyle = tw`hover:bg-opacity-40`;

const ControllerAppearAnimation = css`
  @keyframes appear {
    0% {
      ${tw`opacity-0`}
    }
    100% {
      ${tw`opacity-100`}
    }
  }
  animation: appear 0.25s linear;
`;

export {
  IconStyle,
  HoverTransParentStyle,
  ControlIconStyle,
  SmallControlIconStyle,
  ActivatedControlIconStyle,
  ActivatedHoverControlIconStyle,
  ControllerAppearAnimation,
};
