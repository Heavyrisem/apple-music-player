import React, { useCallback, useRef, useState } from 'react';

import tw from 'twin.macro';
import { MusicType } from 'types';

import RangeSlider from '@components/RangeSlider';
import useEffectOnce from '@hooks/useEffectOnce';
import { prettySeconds } from '@src/utils/time';
import { textTransparentGray } from '@styles/globalStyles';

import AudioController from './AudioController';

export interface AudioPlayerProps extends MusicType {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, ...rest }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLyric, setShowLyric] = useState(false);

  const handleLyricClick = useCallback(() => {
    setShowLyric(!showLyric);
  }, [showLyric]);

  const handlePlayClick = useCallback(() => {
    if (audioRef.current) audioRef.current.volume = 0.1;

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleSliderChange = useCallback((value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      console.log('currentTime', audioRef.current.currentTime);
    }
  }, []);

  const handleMetadataLoaded = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const updateCurrentTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      //   console.log('currentTime', audioRef.current.currentTime);
    }
  };

  //   useEffectOnce(() => {
  //     console.log('asdf');
  //   });
  //   requestAnimationFrame(updateCurrentTime);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <div
      css={[tw`w-[35rem]`, textTransparentGray]}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <audio
        css={[tw`hidden`]}
        ref={audioRef}
        onLoadedMetadata={handleMetadataLoaded}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
        controls
      >
        <source src={src} />
      </audio>

      <div css={tw`flex justify-between text-xs font-semibold`}>
        <span>{prettySeconds(currentTime)}</span>
        <span>{prettySeconds(duration)}</span>
      </div>

      <div css={tw`w-[99%] mx-auto overflow-hidden`}>
        <RangeSlider
          showCursor={isHover}
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
        />
      </div>

      <AudioController
        isHover={isHover}
        isPlaying={isPlaying}
        showLyric={showLyric}
        onLyricClick={handleLyricClick}
        onPlayClick={handlePlayClick}
        {...rest}
      />
    </div>
  );
};

export default AudioPlayer;
