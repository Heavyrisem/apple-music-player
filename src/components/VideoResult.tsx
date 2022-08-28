import React, { HTMLAttributes, useCallback } from 'react';

import tw from 'twin.macro';

import { ComponentBaseProps } from '@src/types/BaseTypes';
import { VideoInfo } from '@utils/api/types';

interface VideoResultProps
  extends ComponentBaseProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  info: VideoInfo;
  onClick?: (info: VideoInfo) => void;
}

const VideoResult = React.forwardRef<HTMLDivElement, VideoResultProps>(
  ({ info, onClick, Css, ...rest }, ref) => {
    const handleClickResult = useCallback(() => {
      onClick?.(info);
    }, [info, onClick]);

    return (
      <div
        css={[tw`p-4 h-[7.5rem] flex`, tw`hover:bg-gray-400`, Css]}
        ref={ref}
        {...rest}
        onClick={handleClickResult}
      >
        <img
          src={info.snippet.thumbnails.high.url}
          alt="Video Thumbnail"
          css={tw`h-full rounded`}
        />
        <div css={tw`w-full ml-4`}>
          <div css={tw`font-bold`}>
            {info.snippet.title} [{info.snippet.channelTitle}]
          </div>
          <div css={tw`text-sm`}>{info.snippet.description}</div>
        </div>
      </div>
    );
  },
);

export default VideoResult;
