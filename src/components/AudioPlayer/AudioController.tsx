import React, { useState } from 'react';

import { css } from '@emotion/react';
import tw from 'twin.macro';

import RangeSlider from '@components/RangeSlider';
import FastForwardIcon from '@components/icons/FastForwardIcon';
import FastReverseIcon from '@components/icons/FastReverseIcon';
import PauseIcon from '@components/icons/PauseIcon';
import PlayIcon from '@components/icons/PlayIcon';
import QuoteBubbleIcon from '@components/icons/QuoteBubbleIcon';
import Tooltip from '@components/icons/Tooltip';
import VolumeIcon from '@components/icons/VolumeIcon';
import { variables } from '@styles/globalStyles';
import { MusicType } from '@types';

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
  showLyric: boolean;
  onPlayClick: () => void;
  onLyricClick: () => void;
}

const AudioController: React.FC<AudioControllerProps> = ({
  title,
  artist,
  album,
  isHover,
  isPlaying,
  showLyric,
  onPlayClick,
  onLyricClick,
}) => {
  const [audioLevel, setAudioLevel] = useState(10);
  const [showAudioController, setShowAudioController] = useState(false);

  return (
    <div css={tw`min-h-[3.5rem] flex flex-col`}>
      {true ? (
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
                  value={audioLevel}
                  onChange={setAudioLevel}
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
              <FastReverseIcon
                fillColor={variables.transparentGray}
                Css={tw`m-auto text-gray-300`}
              />
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
              showLyric && [ActivatedControlIconStyle, ActivatedHoverControlIconStyle],
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
