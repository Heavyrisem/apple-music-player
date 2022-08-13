import React from 'react';

import { IconBaseProps } from 'types/BaseTypes';

interface FaseForwardIconProps extends IconBaseProps {}

const FastForwardIcon: React.FC<FaseForwardIconProps> = ({ Css, fillColor }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" css={Css}>
      <g id="그룹_3400" data-name="그룹 3400" transform="translate(-233 -81)">
        <rect
          id="사각형_494"
          data-name="사각형 494"
          width="26"
          height="24"
          transform="translate(233 81)"
          fill="none"
          opacity="0.104"
        />
        <g id="그룹_3396" data-name="그룹 3396">
          <path
            id="합치기_1"
            data-name="합치기 1"
            d="M102.458,164.482A1.479,1.479,0,0,1,102,163.4V153.6a1.5,1.5,0,0,1,1.5-1.5,1.478,1.478,0,0,1,.748.2l8.5,4.9a1.534,1.534,0,0,1,.252.182V153.6a1.5,1.5,0,0,1,2.249-1.3l8.5,4.9a1.5,1.5,0,0,1,0,2.6l-8.5,4.9A1.5,1.5,0,0,1,113,163.4v-3.785a1.569,1.569,0,0,1-.252.181l-8.5,4.9a1.478,1.478,0,0,1-.747.2A1.522,1.522,0,0,1,102.458,164.482Z"
            transform="translate(133 -65.5)"
            fill={fillColor}
          />
        </g>
      </g>
    </svg>
  );

  //   return <img src={FastForward} alt="Fast Forward Button" css={[tw`inline-block`, Css]} />;
};

export default FastForwardIcon;