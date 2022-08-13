import React from 'react';

import { IconBaseProps } from 'types/BaseTypes';

interface FastReverseIconProps extends IconBaseProps {}

const FastReverseIcon: React.FC<FastReverseIconProps> = ({ Css, fillColor }) => {
  return (
    <svg
      id="그룹_3400"
      data-name="그룹 3400"
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="24"
      viewBox="0 0 26 24"
      css={Css}
    >
      <rect
        id="사각형_494"
        data-name="사각형 494"
        width="26"
        height="24"
        fill="none"
        opacity="0.104"
      />
      <g id="그룹_3396" data-name="그룹 3396" transform="translate(0 4.5)">
        <path
          id="다각형_3"
          data-name="다각형 3"
          d="M6.2,2.252a1.5,1.5,0,0,1,2.6,0l4.9,8.5A1.5,1.5,0,0,1,12.4,13H2.6a1.5,1.5,0,0,1-1.3-2.25Z"
          transform="translate(0 15) rotate(-90)"
          fill={fillColor}
        />
        <path
          id="빼기_1"
          data-name="빼기 1"
          d="M1.5,12.81a1.5,1.5,0,0,1-1.5-1.5V1.5A1.5,1.5,0,0,1,1.5,0,1.479,1.479,0,0,1,2.25.2l8.5,4.9A1.543,1.543,0,0,1,11,5.287V7.522a1.541,1.541,0,0,1-.253.182l-8.5,4.9A1.478,1.478,0,0,1,1.5,12.81Z"
          transform="translate(24 13.905) rotate(180)"
          fill={fillColor}
        />
      </g>
    </svg>

    // <img
    //   src={FastReverse}
    //   className="fill-black"
    //   alt="Fast Reverse Button"
    //   css={[tw`inline-block`, Css]}
    // />
  );
};

export default FastReverseIcon;
