import React from 'react';

import { IconBaseProps } from 'types/BaseTypes';

interface VolumeIconProps extends IconBaseProps {
  onClick?: () => void;
}

const VolumeIcon: React.FC<VolumeIconProps> = ({ Css, fillColor, onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="19"
      viewBox="0 0 20 19"
      css={Css}
    >
      <g id="그룹_3414" data-name="그룹 3414" transform="translate(-495 -42)">
        <g id="그룹_3412" data-name="그룹 3412" transform="translate(156 -34)">
          <g id="그룹_3402" data-name="그룹 3402" transform="translate(326 33)">
            <rect
              id="사각형_497"
              data-name="사각형 497"
              width="20"
              height="19"
              transform="translate(13 43)"
              fill="none"
              opacity="0.561"
            />
          </g>
          <path
            id="패스_4469"
            data-name="패스 4469"
            d="M.732-.318H2.056S5.242-3.662,5.242-1.832V5.589c0,1.291-3.185-1.907-3.185-1.907H.732a1,1,0,0,1-1-1v-2A1,1,0,0,1,.732-.318Z"
            transform="translate(343 84)"
            fill={fillColor}
          />
        </g>
        <g id="그룹_3413" data-name="그룹 3413">
          <path
            id="패스_4470"
            data-name="패스 4470"
            d="M-.365-2.544A4.028,4.028,0,0,1,.164-.78,3.868,3.868,0,0,1-.365.96"
            transform="translate(506.5 52.5)"
            fill="none"
            stroke={fillColor}
            strokeLinecap="round"
            strokeWidth="0.8"
          />
          <path
            id="패스_4473"
            data-name="패스 4473"
            d="M-.365-2.544A6.605,6.605,0,0,1,.5.349,6.343,6.343,0,0,1-.365,3.2"
            transform="translate(508.331 51.379)"
            fill="none"
            stroke={fillColor}
            strokeLinecap="round"
            strokeWidth="0.8"
          />
          <path
            id="패스_4474"
            data-name="패스 4474"
            d="M-.365-2.544A9.777,9.777,0,0,1,.919,1.738,9.389,9.389,0,0,1-.365,5.96"
            transform="translate(510.122 50)"
            fill="none"
            stroke={fillColor}
            strokeLinecap="round"
            strokeWidth="0.8"
          />
        </g>
      </g>
    </svg>
  );
};

export default VolumeIcon;
