import React, { useCallback, useMemo, useState } from 'react';

import tw, { css } from 'twin.macro';

import { HoverTransParentStyle } from '@components/AudioPlayer/styles';
import GradientCanvas from '@components/GradientCanvas';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import SearchBar from '@components/SearchBar';
import VideoResult from '@components/VideoResult';
import ViteIcon from '@components/icons/ViteIcon';
import { bgTransparentGray } from '@styles/globalStyles';
import { searchVideos } from '@utils/api';
import { VideoInfo } from '@utils/api/types';

const Home: React.FC = () => {
  const [videoList, setVideoList] = useState<VideoInfo[]>([]);

  const handleSearch = useCallback((q: string) => {
    searchVideos(q).then(setVideoList);
  }, []);

  const handleClickResult = useCallback((video: VideoInfo) => {
    window.location.href = `/play/${video.id.videoId}`;
  }, []);

  const Gradient = useMemo(() => {
    return (
      <GradientCanvas
        colors={[
          { r: 255, g: 0, b: 255 },
          { r: 255, g: 225, b: 55 },
          { r: 255, g: 33, b: 33 },
        ]}
        fps={60}
        speed={0.1}
        css={[
          tw`absolute bg-[rgb(191, 0, 255)]`,
          css`
            z-index: -1;
          `,
        ]}
      />
    );
  }, []);

  return (
    <DefaultLayout css={tw`w-screen mt-0 overflow-hidden`}>
      {Gradient}

      <div css={[tw`w-[85%] h-[30rem] m-auto mt-[30%]`, tw`md:max-w-[65rem] md:mt-[15rem]`]}>
        <div css={[tw`flex`]}>
          <div css={[tw`m-auto p-4 flex`]}>
            <ViteIcon css={[tw`inline-block my-auto mr-4`]} />
            <div css={tw`inline text-2xl text-white font-bold md:text-4xl`}>React Music Player</div>
          </div>
        </div>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search Video From Youtube"
          css={[
            tw`text-white placeholder:text-black placeholder:text-opacity-30`,
            bgTransparentGray,
          ]}
        />
        {Boolean(videoList.length) && (
          <div
            css={[
              tw`w-full h-full mt-4 rounded-lg overflow-x-hidden overflow-y-scroll`,
              bgTransparentGray,
            ]}
          >
            {videoList.map((video) => (
              <VideoResult
                key={video.id.videoId}
                info={video}
                onClick={handleClickResult}
                css={[tw`md:h-[7.5rem] md:flex hover:bg-gray-400 p-4`, HoverTransParentStyle]}
              />
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Home;
