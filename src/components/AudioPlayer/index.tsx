import React, { useCallback, useEffect, useRef, useState } from 'react';

import tw from 'twin.macro';

import RangeSlider from '@components/RangeSlider';
import { MusicType } from '@src/types';
import { prettySeconds } from '@src/utils/time';
import { textTransparentGray } from '@styles/globalStyles';

import AudioController from './AudioController';

export interface AudioPlayerProps extends MusicType {
  src: string;
  lyricsAvilable: boolean;
  isExplicit: boolean;
  playTime?: number;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onTimeUpdate?: (currentTime: number) => void;
  onVolumeChange?: (value: number) => void;
  onLyricsUpdate?: (state: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  lyricsAvilable,
  isExplicit,
  playTime,
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

  useEffect(() => {
    if (playTime !== undefined && audioRef.current) {
      // ?????? ?????? ?????????????????? ????????? ????????? ????????? ?????? ????????? ??????????????? ????????? 1.5??? ?????? ????????????, ?????? ??????????????? ?????? ??? ?????? ???????????????
      if (Math.abs(audioRef.current.currentTime - playTime) >= 1.5)
        audioRef.current.currentTime = playTime;
      setCurrentTime(playTime);
    }
  }, [playTime]);

  return (
    <div
      css={[tw`w-full`, textTransparentGray]}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <audio
        css={[tw`hidden`]}
        ref={audioRef}
        onLoadedMetadata={handleMetadataLoaded}
        onTimeUpdateCapture={handleTimeUpdate}
        onEnded={handleAudioEnded}
        onError={() => alert('?????? ????????? ??????????????? ??????????????????.')}
        controls
      >
        <source src={src} />
      </audio>

      <div css={tw`flex justify-between text-xs font-semibold`}>
        <span>{prettySeconds(currentTime)}</span>
        {isExplicit && <span css={tw`text-[0.5rem] mb-0`}>Explicit</span>}
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
        showLyrics={showLyric}
        lyricsAvilable={lyricsAvilable}
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
