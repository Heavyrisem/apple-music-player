import React, { HTMLAttributes } from 'react';

import tw from 'twin.macro';

import { ComponentBaseProps } from '@src/types/BaseTypes';

interface CoverImageProps extends ComponentBaseProps, HTMLAttributes<HTMLImageElement> {
  src: string;
}

const CoverImage: React.FC<CoverImageProps> = ({ src, ...props }) => {
  return (
    <img
      src={src}
      alt="Music Cover"
      className="aspect-square"
      css={[tw`w-[35rem] rounded-xl border-white border border-opacity-10`]}
      {...props}
    />
  );
};

export default CoverImage;
