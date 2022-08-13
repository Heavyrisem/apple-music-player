import React from 'react';

import { IconBaseProps } from 'types/BaseTypes';

interface PauseIconProps extends IconBaseProps {}

const PauseIcon: React.FC<PauseIconProps> = ({ Css, fillColor }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" css={Css}>
      <g id="그룹_3397" data-name="그룹 3397" transform="translate(-203 -139)">
        <rect
          id="사각형_495"
          data-name="사각형 495"
          width="5"
          height="16"
          rx="1.5"
          transform="translate(203 139)"
          fill={fillColor}
        />
        <rect
          id="사각형_496"
          data-name="사각형 496"
          width="5"
          height="16"
          rx="1.5"
          transform="translate(210 139)"
          fill={fillColor}
        />
      </g>
    </svg>
  );

  //   return <img src={Pause} alt="Pause Button" css={[tw`inline-block`, Css]} />;
};

export default PauseIcon;
