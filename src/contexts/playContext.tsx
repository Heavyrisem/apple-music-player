import React, { Dispatch, PropsWithChildren, SetStateAction, useCallback, useState } from 'react';

import { Color } from '@components/GradientCanvas';
import { Lyrics } from '@src/types';
import { MusicInfo } from '@utils/api/types';

interface PlayContextType {
  musicInfo?: MusicInfo;
  setMusicInfo: Dispatch<SetStateAction<MusicInfo | undefined>>;
  musicLyrics?: Lyrics[];
  setMusicLyrics: Dispatch<SetStateAction<Lyrics[] | undefined>>;
  currentTime: number;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  showLyrics: boolean;
  setShowLyrics: Dispatch<SetStateAction<boolean>>;
  colors?: Color[];
  setColors: Dispatch<SetStateAction<Color[] | undefined>>;
  //   colorPalette?: ArrayRGB[];
  handleLyricsClick: (lyrics: Lyrics) => void;
}

export const playContext = React.createContext<PlayContextType>({
  musicInfo: undefined,
  setMusicInfo: () => {},
  musicLyrics: undefined,
  setMusicLyrics: () => {},
  currentTime: 0,
  setCurrentTime: () => {},
  showLyrics: false,
  setShowLyrics: () => {},
  colors: undefined,
  setColors: () => {},
  //   colorPalette: undefined,
  handleLyricsClick: () => {},
});

const PlayProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [musicInfo, setMusicInfo] = useState<MusicInfo>();
  const [musicLyrics, setMusicLyrics] = useState<Lyrics[]>();

  const [currentTime, setCurrentTime] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const [colors, setColors] = useState<Color[]>();

  const handleLyricsClick = useCallback((lyrics: Lyrics) => {
    setCurrentTime(lyrics.startTime);
  }, []);

  return (
    <playContext.Provider
      value={{
        musicInfo,
        musicLyrics,
        currentTime,
        showLyrics,
        colors,
        setMusicInfo,
        setMusicLyrics,
        setCurrentTime,
        setShowLyrics,
        setColors,
        handleLyricsClick,
      }}
    >
      {children}
    </playContext.Provider>
  );
};

export default PlayProvider;
