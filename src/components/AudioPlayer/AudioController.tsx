import React from 'react';

import { css } from '@emotion/react';
import tw from 'twin.macro';

import FastForwardIcon from '@components/icons/FastForwardIcon';
import FastReverseIcon from '@components/icons/FastReverseIcon';
import PauseIcon from '@components/icons/PauseIcon';
import PlayIcon from '@components/icons/PlayIcon';
import { variables } from '@styles/globalStyles';
import { MusicType } from '@types';

interface AudioControllerProps extends MusicType {
  isHover: boolean;
  isPlaying: boolean;
  onPlayClick: () => void;
}

const ControlIconStyle = tw`flex w-[2rem] h-[1.75rem] mx-[1px] rounded-[0.3rem] duration-75 hover:bg-white hover:bg-opacity-5`;
const ControllerAppearAnimation = css`
  @keyframes appear {
    0% {
      ${tw`opacity-0`}
    }
    100% {
      ${tw`opacity-100`}
    }
  }
  animation: appear 0.25s linear;
`;

const AudioController: React.FC<AudioControllerProps> = ({
  title,
  artist,
  album,
  isHover,
  isPlaying,
  onPlayClick,
}) => {
  return (
    <div css={tw`min-h-[3.5rem] flex flex-col`}>
      {isHover ? (
        <div css={tw`flex justify-center my-auto`}>
          <span css={ControlIconStyle}>
            <FastReverseIcon fillColor={variables.transparentGray} Css={tw`m-auto text-gray-300`} />
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
