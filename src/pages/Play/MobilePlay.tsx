import React, { useContext } from 'react';

import tw from 'twin.macro';

import AudioPlayer from '@components/AudioPlayer';
import CoverImage from '@components/CoverImage';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import LyricsList from '@components/Lyrics';
import { playContext } from '@contexts/playContext';

const MobilePlay: React.FC = () => {
  const {
    musicInfo,
    musicLyrics,
    currentTime,
    showLyrics,
    setCurrentTime,
    setShowLyrics,
    handleLyricsClick,
  } = useContext(playContext);

  return (
    <DefaultLayout Css={[tw`h-screen flex-row overflow-hidden`]}>
      {musicInfo && (
        <div
          css={[
            tw`m-auto w-[75%] max-h-screen py-[5%] inline-block mx-auto`,
            //   showLyrics && tw`ml-[5%] sm:m-0 mr-0`,
            //   tw`sm:w-full sm:m-0 sm:px-[15%]`,
          ]}
        >
          <CoverImage src={musicInfo.thumbnail} Css={[tw`w-full`, !showLyrics && tw`mb-8`]} />

          {showLyrics && musicLyrics && (
            <div css={tw`h-[15rem] py-5`}>
              <LyricsList
                lyricsList={musicLyrics}
                currentTime={currentTime}
                onLyricsClick={handleLyricsClick}
                Css={tw`w-full h-full overflow-scroll`}
              />
            </div>
          )}

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
      )}
    </DefaultLayout>
  );
};

export default MobilePlay;
