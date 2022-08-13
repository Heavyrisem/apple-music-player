import React from 'react';

import tw from 'twin.macro';
import { MusicType } from 'types';

import FastForwardIcon from '@components/icons/FastForwardIcon';
import FastReverseIcon from '@components/icons/FastReverseIcon';
import PauseIcon from '@components/icons/PauseIcon';
import PlayIcon from '@components/icons/PlayIcon';
import { variables } from '@styles/globalStyles';

interface AudioControllerProps extends MusicType {
  isHover: boolean;
  isPlaying: boolean;
}

const ControlIconStyle = tw`flex w-[2rem] h-[1.75rem] mx-[1px] rounded-[0.3rem] duration-75 hover:bg-white hover:bg-opacity-5`;

const AudioController: React.FC<AudioControllerProps> = ({
  title,
  artist,
  album,
  isHover,
  isPlaying,
}) => {
  return (
    <div css={tw`min-h-[3.5rem] flex flex-col`}>
      {isHover ? (
        <div css={tw`flex justify-center my-auto`}>
          <span css={ControlIconStyle}>
            <FastReverseIcon fillColor={variables.transparentGray} Css={tw`m-auto text-gray-300`} />
          </span>

          <span css={ControlIconStyle}>
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
        <div css={tw`text-center duration-200 break-normal`}>
          <div css={tw`text-xl font-bold text-white`}>{title}</div>
          <div css={tw`text-xl`}>{album ? `${artist} — ${album}` : artist}</div>
        </div>
      )}
    </div>
  );
};

export default AudioController;
