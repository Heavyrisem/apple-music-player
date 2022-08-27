import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { css } from '@emotion/react';
import { fromVtt } from 'subtitles-parser-vtt';
import tw from 'twin.macro';

import AudioPlayer from '@components/AudioPlayer';
import CoverImage from '@components/CoverImage';
import GradientCanvas from '@components/GradientCanvas';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import LyricsList from '@components/Lyrics';
import { Lyrics } from '@src/types';
import { getMusicInfo, getMusicLyrics } from '@utils/api';
import { MusicInfo } from '@utils/api/types';

const Play: React.FC = () => {
  const { videoId: requestedVideoId } = useParams();
  const [musicInfo, setMusicInfo] = useState<MusicInfo | null>(null);
  const [musicLyrics, setMusicLyrics] = useState<Lyrics[] | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);

  const fetchMusicInfo = useCallback(async (videoId: string) => {
    const info = await getMusicInfo(videoId);
    const lyrics = await getMusicLyrics(info.videoId).then(
      (res) => res && fromVtt(res.lyrics, 's'),
    );
    return { info, lyrics };
  }, []);

  const handleLyricsClick = useCallback((lyrics: Lyrics) => {
    setCurrentTime(lyrics.startTime);
  }, []);

  useEffect(() => {
    if (requestedVideoId) {
      fetchMusicInfo(requestedVideoId).then(({ info, lyrics }) => {
        setMusicInfo(info);
        if (lyrics) setMusicLyrics(lyrics);
      });
    }
  }, [fetchMusicInfo, requestedVideoId]);

  return (
    <DefaultLayout Css={[tw`flex-row`]}>
      <GradientCanvas
        colors={[
          { r: 99, g: 227, b: 214 },
          { r: 242, g: 69, b: 167 },
          { r: 252, g: 118, b: 74 },
        ]}
        fps={144}
        Css={[
          tw`absolute`,
          css`
            background: rgb(172, 225, 241);
            z-index: -1;
          `,
        ]}
      />
      {musicInfo && (
        <div css={[tw`m-auto mb-[5rem] inline-block`, showLyrics && tw`ml-[12%]`]}>
          <CoverImage src={musicInfo.thumbnail} Css={tw`mb-[3rem]`} />
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

      {showLyrics && musicLyrics && (
        <div css={tw`w-[50%] h-full flex flex-col mx-auto`}>
          <LyricsList
            lyricsList={musicLyrics}
            currentTime={currentTime}
            onLyricsClick={handleLyricsClick}
          />
        </div>
      )}
    </DefaultLayout>
  );
};

export default Play;
