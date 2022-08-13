import React, { useRef, useState } from 'react';

import tw from 'twin.macro';
import { MusicType } from 'types';

import RangeSlider from '@components/RangeSlider';
import FastForwardIcon from '@components/icons/FastForwardIcon';
import FastReverseIcon from '@components/icons/FastReverseIcon';
import PauseIcon from '@components/icons/PauseIcon';
import PlayIcon from '@components/icons/PlayIcon';
import { textTransparentGray, variables } from '@styles/globalStyles';

import AudioController from './AudioController';

export interface AudioPlayerProps extends MusicType {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = (props) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // create virtual audio element
  //   const createAudio = () => {
  //     const audio = new Audio();
  //     audio.src = src;
  //     audio.controls = false;
  //     audio.autoplay = false;
  //     audio.loop = false;
  //     audio.preload = 'metadata';
  //     audio.volume = 0.5;
  //     return audio;
  //   };

  return (
    <div
      css={[tw`w-[35rem]`, textTransparentGray]}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* <audio css={[tw`visible`]} ref={audioRef} controls>
        <source src={src} type="audio/mpeg" />
      </audio> */}

      <div css={tw`flex justify-between text-xs font-semibold`}>
        <span>0:00</span>
        <span>3:29</span>
      </div>

      <div css={tw`w-[99%] mx-auto`}>
        <RangeSlider showCursor={isHover} />
      </div>

      <AudioController isHover={isHover} isPlaying={isPlaying} {...props} />
    </div>
  );
};

export default AudioPlayer;
