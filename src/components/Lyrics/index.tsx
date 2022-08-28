import React, { useCallback, useEffect, useRef, useState } from 'react';

import tw from 'twin.macro';

import { Lyrics } from '@src/types';
import { hideScrollbar } from '@styles/globalStyles';
import { replaceAll } from '@utils/string';

import { FILTER_CHARACTERS } from './constant';

interface LyricsProps {
  currentTime: number;
  lyricsList: Lyrics[];
  onLyricsClick?: (lryics: Lyrics) => void;
}

const ActiveLyricsStyle = tw`text-white`;

const LyricsList: React.FC<LyricsProps> = ({ currentTime, lyricsList, onLyricsClick }) => {
  const activeElement = useRef<HTMLDivElement>(null);
  const [prevLyrics, setPrevLyrics] = useState<Lyrics>();

  const isActiveLyrics = useCallback(
    (lyrics: Lyrics) => currentTime >= lyrics.startTime && currentTime <= lyrics.endTime,
    [currentTime],
  );

  useEffect(() => {
    const currentLyrics = lyricsList.find(isActiveLyrics);
    if (currentLyrics && activeElement.current) {
      if (prevLyrics?.startTime !== currentLyrics.startTime) {
        activeElement.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setPrevLyrics(currentLyrics);
  }, [currentTime, isActiveLyrics, lyricsList, prevLyrics]);

  return (
    <div
      css={[
        tw`text-[#ffffff72] max-h-[40%] font-bold text-5xl overflow-y-scroll leading-relaxed m-auto`,
        hideScrollbar,
      ]}
    >
      {lyricsList.map((lyrics) => {
        const activeLyrics = lyricsList.filter(isActiveLyrics);
        const isActive = lyricsList.filter(isActiveLyrics)[0]?.id === lyrics.id;

        return (
          <div
            key={lyrics.id}
            css={[
              tw`duration-200 cursor-pointer hover:text-[#ffffffa8] whitespace-pre-wrap`,
              activeLyrics.filter((aLyrics) => aLyrics.id === lyrics.id).length && [
                ActiveLyricsStyle,
                tw`hover:text-white`,
              ],
            ]}
            onClick={() => onLyricsClick?.(lyrics)}
            ref={isActive ? activeElement : undefined}
          >
            {replaceAll(lyrics.text, FILTER_CHARACTERS, '')}
          </div>
        );
      })}
    </div>
  );
};

export default LyricsList;
