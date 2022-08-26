import React, { useCallback, useEffect, useRef, useState } from 'react';

import tw from 'twin.macro';
import { MusicType } from 'types';

import RangeSlider from '@components/RangeSlider';
import { prettySeconds } from '@src/utils/time';
import { textTransparentGray } from '@styles/globalStyles';

import AudioController from './AudioController';

export interface AudioPlayerProps extends MusicType {
  src: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onTimeUpdate?: (currentTime: number) => void;
  onVolumeChange?: (value: number) => void;
  onLyricsUpdate?: (state: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  onPlayStateChange,
  onTimeUpdate,
  onVolumeChange,
  onLyricsUpdate,
  ...rest
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLyric, setShowLyric] = useState(false);
  const [volume, setVolume] = useState(20);

  const updateTime = useCallback(
    (value: number) => {
      setCurrentTime(value);
      onTimeUpdate?.(value);
    },
    [onTimeUpdate],
  );

  const handleLyricClick = useCallback(() => {
    setShowLyric(!showLyric);
    onLyricsUpdate?.(!showLyric);
  }, [onLyricsUpdate, showLyric]);

  const handlePlayClick = useCallback(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }

    setIsPlaying(!isPlaying);
    onPlayStateChange?.(!isPlaying);
  }, [isPlaying, onPlayStateChange, volume]);

  const handleSliderChange = useCallback(
    (value: number) => {
      if (audioRef.current) {
        updateTime(value);
        audioRef.current.currentTime = value;
      }
    },
    [updateTime],
  );

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      updateTime(audioRef.current.currentTime);
    }
  }, [updateTime]);

  const handleMetadataLoaded = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleVolumeChange = useCallback((value: number) => {
    if (audioRef.current) {
      setVolume(value);
      audioRef.current.volume = value / 100;
    }
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
        onTimeUpdateCapture={handleTimeUpdate}
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
        volume={volume}
        onLyricClick={handleLyricClick}
        onPlayClick={handlePlayClick}
        onVolumeChange={handleVolumeChange}
        {...rest}
      />
    </div>
  );
};

export default AudioPlayer;
