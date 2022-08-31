import React, { useCallback, useContext, useEffect, useMemo } from 'react';
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
import PlayProvider, { playContext } from '@contexts/playContext';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { Lyrics } from '@src/types';
import { getMusicInfo, getMusicLyrics } from '@utils/api';

import DefaultPlay from './DefaultPlay';
import MobilePlay from './MobilePlay';

// export interface PlayProps {
//   musicInfo: MusicInfo;
//   musicLyrics: Lyrics[];
// }

const Play: React.FC = () => {
  const { videoId: requestedVideoId } = useParams();
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = useMemo(() => windowWidth <= 767, [windowWidth]);

  const { musicInfo, colors, setMusicInfo, setMusicLyrics, setColors } = useContext(playContext);

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
  }, [colorPalette, setColors]);

  const fetchMusicInfo = useCallback(async (videoId: string) => {
    const info = await getMusicInfo(videoId);
    const lyrics = await getMusicLyrics(info.videoId)
      .then((res) => res && fromVtt(res.lyrics, 's'))
      .then((result) => result?.sort((a, b) => a.startTime - b.startTime))
      .then((result) => result?.map((l, idx) => ({ ...l, id: idx })));
    return { info, lyrics };
  }, []);
  useEffect(() => {
    if (requestedVideoId) {
      fetchMusicInfo(requestedVideoId).then(({ info, lyrics }) => {
        setMusicInfo(info);
        if (lyrics) setMusicLyrics(lyrics);
      });
    }
  }, [fetchMusicInfo, requestedVideoId, setMusicInfo, setMusicLyrics]);

  const Gradient = useMemo(() => {
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
    <>
      {Gradient}
      {isMobile ? <MobilePlay /> : <DefaultPlay />}
    </>
  );
};

export default Play;
