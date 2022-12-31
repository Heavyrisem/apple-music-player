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

const VideoResult: React.FC<VideoResultProps> = ({ info, onClick, ...props }) => {
  const handleClickResult = useCallback(() => {
    onClick?.(info);
  }, [info, onClick]);

  return (
    <div css={[tw`w-full block`]} {...props} onClick={handleClickResult}>
      <img
        src={info.snippet.thumbnails.high.url}
        alt="Video Thumbnail"
        css={[tw`w-full rounded my-2`, tw`md:h-full md:w-auto md:my-auto`]}
      />
      <div css={[tw`w-full m-auto`, tw`md:ml-4`]}>
        <div css={tw`font-bold text-base overflow-hidden`} className="text-ellipsis">
          {info.snippet.title} [{info.snippet.channelTitle}]
        </div>
        <div className="text-ellipsis" css={tw`whitespace-nowrap overflow-hidden text-sm`}>
          {info.snippet.description}
        </div>
      </div>
    </div>
  );
};

export default VideoResult;
