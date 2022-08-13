import React from 'react';

import { IconBaseProps } from 'types/BaseTypes';

interface PlayIconProps extends IconBaseProps {}

const PlayIcon: React.FC<PlayIconProps> = ({ Css, fillColor }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" css={Css}>
      <g id="그룹_3399" data-name="그룹 3399" transform="translate(-14 -43)">
        <rect
          id="사각형_497"
          data-name="사각형 497"
          width="20"
          height="19"
          transform="translate(14 43)"
          fill="none"
          opacity="0.561"
        />
        <path
          id="패스_4457"
          data-name="패스 4457"
          d="M8.493,2.514a1.6,1.6,0,0,1,2.771,0L18.589,15.8A1.5,1.5,0,0,1,17.2,18H2.555a1.5,1.5,0,0,1-1.386-2.2Z"
          transform="translate(34 42.621) rotate(90)"
          fill={fillColor}
        />
      </g>
    </svg>
  );

  //   return <img src={Play} alt="Play Button" css={[tw`inline-block`, Css]} />;
};

export default PlayIcon;
