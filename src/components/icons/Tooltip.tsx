import React, { ReactNode } from 'react';

import { css } from '@emotion/react';
import tw from 'twin.macro';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  showTooltip: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, showTooltip, ...props }) => {
  return (
    <div className="group" css={tw`relative flex flex-col items-center`} {...props}>
      {children}
      <div
        css={[
          tw`absolute top-0 mt-6 flex flex-col items-center`,
          css`
            ${showTooltip ? tw`visible` : tw`hidden`}
          `,
        ]}
      >
        <div className="rotate-45" css={tw`-mb-2 h-3 w-3 bg-gray-600`} />
        <span
          className="whitespace-no-wrap"
          css={tw`relative z-10 rounded-md bg-gray-600 p-2 text-xs leading-none text-white shadow-lg`}
        >
          {content}
        </span>
      </div>
    </div>
  );
};

export default Tooltip;
