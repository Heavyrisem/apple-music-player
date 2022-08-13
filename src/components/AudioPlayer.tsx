import React, { useRef, useState } from 'react';

import tw from 'twin.macro';

import { textTransparentGray } from '@styles/globalStyles';

import RangeSlider from './RangeSlider';

interface AudioPlayerProps {
  title: string;
  author: string;
  album?: string;
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ title, author, album, src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      css={[tw`w-[35rem]`, textTransparentGray]}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <audio css={[tw`visible`]} ref={audioRef} controls>
        <source src={src} type="audio/mpeg" />
      </audio>

      <div css={[tw`flex justify-between text-xs font-semibold`]}>
        <span>0:00</span>
        <span>3:29</span>
      </div>
      <RangeSlider showCursor={isHover} />
    </div>
  );
};

export default AudioPlayer;
