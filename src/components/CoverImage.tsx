import React from 'react';

import tw from 'twin.macro';

interface CoverImageProps {
  src: string;
}

const CoverImage: React.FC<CoverImageProps> = ({ src }) => {
  return (
    <img src={src} alt="Music Cover" className="aspect-square" css={tw`w-[35rem] rounded-xl`} />
  );
};

export default CoverImage;
