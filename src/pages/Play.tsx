import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { css } from '@emotion/react';
import { usePalette } from 'color-thief-react';
import { fromVtt } from 'subtitles-parser-vtt';
import tw from 'twin.macro';

import AudioPlayer from '@components/AudioPlayer';
import CoverImage from '@components/CoverImage';
import GradientCanvas, { Color } from '@components/GradientCanvas';
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
  const [colors, setColors] = useState<Color[]>();
  const { data: colorPalette } = usePalette(musicInfo?.thumbnail || '', 10, 'rgbArray', {
    crossOrigin: 'https://lh3.googleusercontent.com',
    quality: 1,
  });

  useEffect(() => {
    if (colorPalette) {
      const tempColors: Color[] = colorPalette.map((color) => {
        return { r: color[0], g: color[1], b: color[2] };
      });

      setColors(tempColors);
    }
  }, [colorPalette]);

  const fetchMusicInfo = useCallback(async (videoId: string) => {
    const info = await getMusicInfo(videoId);
    const lyrics = await getMusicLyrics(info.videoId)
      .then((res) => res && fromVtt(res.lyrics, 's'))
      .then((result) => result?.sort((a, b) => a.startTime - b.startTime))
      .then((result) => result?.map((l, idx) => ({ ...l, id: idx })));
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

  const Grandient = useMemo(() => {
    if (!colors) return null;

    return (
      <GradientCanvas
        colors={colors.slice(1, colors.length)}
        fps={45}
        speed={0.1}
        // particleNumber={1}
        Css={[
          tw`absolute`,
          css`
            background: rgb(${colors[0].r} ${colors[0].g} ${colors[0].b});
            z-index: -1;
          `,
        ]}
      />
    );
  }, [colors]);

  return (
    <DefaultLayout Css={[tw`flex-row`]}>
      {musicInfo && (
        <>
          {Grandient}
          <div
            css={[tw`m-auto min-w-[35rem] mb-[5rem] inline-block`, showLyrics && tw`ml-[12rem]`]}
          >
            <CoverImage
              src={musicInfo.thumbnail}
              Css={[tw`mb-[3rem]`, !showLyrics && tw`w-[40rem]`]}
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
            <div css={tw`w-[50%] h-full flex flex-col mx-auto`}>
              <LyricsList
                lyricsList={musicLyrics}
                currentTime={currentTime}
                onLyricsClick={handleLyricsClick}
                Css={tw`w-full`}
              />
            </div>
          )}
        </>
      )}
    </DefaultLayout>
  );
};

export default Play;
