import React, { useEffect, useState } from 'react';

import tw from 'twin.macro';

import RangeSlider from '@components/RangeSlider';
import FastForwardIcon from '@components/icons/FastForwardIcon';
import FastReverseIcon from '@components/icons/FastReverseIcon';
import PauseIcon from '@components/icons/PauseIcon';
import PlayIcon from '@components/icons/PlayIcon';
import QuoteBubbleIcon from '@components/icons/QuoteBubbleIcon';
import Tooltip from '@components/icons/Tooltip';
import VolumeIcon from '@components/icons/VolumeIcon';
import { MusicType } from '@src/types';
import { variables } from '@styles/globalStyles';

import {
  SmallControlIconStyle,
  ControlIconStyle,
  ActivatedControlIconStyle,
  ActivatedHoverControlIconStyle,
  ControllerAppearAnimation,
} from './styles';

interface AudioControllerProps extends MusicType {
  isHover: boolean;
  isPlaying: boolean;
  showLyrics: boolean;
  lyricsAvilable: boolean;
  volume: number;
  onPlayClick: () => void;
  onLyricClick: () => void;
  onVolumeChange: (value: number) => void;
}

const AudioController: React.FC<AudioControllerProps> = ({
  title,
  artist,
  album,
  isHover,
  isPlaying,
  showLyrics,
  lyricsAvilable,
  volume,
  onPlayClick,
  onLyricClick,
  onVolumeChange,
}) => {
  const [showAudioController, setShowAudioController] = useState(false);

  useEffect(() => {
    if (!isHover) {
      setShowAudioController(false);
    }
  }, [isHover]);

  return (
    <div css={tw`min-h-[3.5rem] flex flex-col`}>
      {isHover ? (
        <div css={tw`flex justify-between my-auto`}>
          <div
            css={[
              SmallControlIconStyle,
              showAudioController && [ActivatedControlIconStyle, ActivatedHoverControlIconStyle],
            ]}
          >
            <Tooltip
              showTooltip={showAudioController}
              content={
                <RangeSlider
                  max={100}
                  value={volume}
                  onChange={onVolumeChange}
                  showCursor
                  Css={tw`w-[5rem]`}
                />
              }
            >
              <VolumeIcon
                onClick={() => setShowAudioController(!showAudioController)}
                fillColor={variables.transparentGray}
                Css={tw`m-auto w-[1.5rem] h-[1.5rem]`}
              />
            </Tooltip>
          </div>

          <span css={tw`flex`}>
            <span css={ControlIconStyle}>
              <FastReverseIcon fillColor={variables.transparentGray} Css={tw`m-auto`} />
            </span>

            <span css={ControlIconStyle} onClick={onPlayClick}>
              {isPlaying ? (
                <PauseIcon
                  fillColor={variables.transparentGray}
                  Css={tw`w-[1.2rem] h-[1.2rem] m-auto`}
                />
              ) : (
                <PlayIcon
                  fillColor={variables.transparentGray}
                  Css={tw`w-[1.2rem] h-[1.2rem] m-auto`}
                />
              )}
            </span>

            <span css={ControlIconStyle}>
              <FastForwardIcon fillColor={variables.transparentGray} Css={tw`m-auto`} />
            </span>
          </span>

          <div
            css={[
              SmallControlIconStyle,
              showLyrics && [ActivatedControlIconStyle, ActivatedHoverControlIconStyle],
              lyricsAvilable === false && tw`invisible`,
            ]}
            onClick={onLyricClick}
          >
            <QuoteBubbleIcon fillColor={variables.transparentGray} Css={tw`m-auto`} />
          </div>
        </div>
      ) : (
        <div css={[tw`text-center duration-200 break-normal`, ControllerAppearAnimation]}>
          <div css={tw`text-xl font-bold text-white`}>{title}</div>
          <div css={tw`text-xl`}>{album ? `${artist} — ${album}` : artist}</div>
        </div>
      )}
    </div>
  );
};

export default AudioController;
