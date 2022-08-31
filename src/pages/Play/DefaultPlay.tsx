import React, { useContext, useMemo } from 'react';

import tw, { css } from 'twin.macro';

import AudioPlayer from '@components/AudioPlayer';
import CoverImage from '@components/CoverImage';
import GradientCanvas from '@components/GradientCanvas';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import LyricsList from '@components/Lyrics';
import { playContext } from '@contexts/playContext';
import useWindowDimensions from '@hooks/useWindowDimensions';

const DefaultPlay: React.FC = () => {
  const { width: windowWidth } = useWindowDimensions();

  const {
    musicInfo,
    musicLyrics,
    currentTime,
    showLyrics,
    colors,
    // colorPalette,
    setMusicInfo,
    setMusicLyrics,
    setCurrentTime,
    setShowLyrics,
    setColors,
    handleLyricsClick,
  } = useContext(playContext);

  return (
    <DefaultLayout Css={[tw`flex-row`]}>
      {musicInfo && (
        <>
          <div
            css={[
              tw`m-auto min-w-[35rem] mb-[5rem] inline-block pr-4`,
              showLyrics && tw`ml-[3%] 2xl:ml-[8%]`,
            ]}
          >
            <CoverImage
              src={musicInfo.thumbnail}
              Css={[tw`mb-[3rem]`, showLyrics && tw`w-[40rem]`]}
            />

            <AudioPlayer
              isExplicit={musicInfo.isExplicit}
              lyricsAvilable={Boolean(musicLyrics)}
              playTime={currentTime}
              onTimeUpdate={setCurrentTime}
              onLyricsUpdate={setShowLyrics}
              src={`/music/file/${musicInfo.videoId}`}
              title={musicInfo.title}
              artist={musicInfo.artists.join(', ')}
              album={musicInfo.album}
            />
          </div>
          {showLyrics && musicLyrics && (
            <div css={[tw`w-[50%] h-full flex flex-col`]}>
              <LyricsList
                lyricsList={musicLyrics}
                currentTime={currentTime}
                onLyricsClick={handleLyricsClick}
                Css={tw`w-full overflow-y-scroll max-h-[40%] text-5xl leading-relaxed`}
              />
            </div>
          )}
        </>
      )}
    </DefaultLayout>
  );
};

export default DefaultPlay;
