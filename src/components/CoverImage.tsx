import React from 'react';

import tw from 'twin.macro';

import { ComponentBaseProps } from '@src/types/BaseTypes';

interface CoverImageProps extends ComponentBaseProps {
  src: string;
}

const CoverImage: React.FC<CoverImageProps> = ({ src, Css }) => {
  return (
    <img
      src={src}
      alt="Music Cover"
      className="aspect-square"
      css={[tw`w-[35rem] rounded-xl`, Css]}
    />
  );
};

export default CoverImage;
