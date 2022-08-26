import React, { useEffect, useState } from 'react';

import { Lyrics } from '@types';

interface LyricsProps {
  currentTime: number;
  lyrics: Lyrics[];
}

const LyricsList: React.FC<LyricsProps> = ({ currentTime, lyrics }) => {
  const [currentLyrics, setCurrentLyrics] = useState<Lyrics[] | undefined>(undefined);

  useEffect(() => {
    const time = currentTime;
    const temp = lyrics.filter((lyric) => time >= lyric.startTime && time <= lyric.endTime);
    console.log('time', time, temp);
    setCurrentLyrics(temp);
  }, [currentTime, lyrics]);

  return currentLyrics ? (
    <div className="lyrics">
      {currentLyrics.map((lyric, index) => (
        <div key={lyric.text}>{lyric.text}</div>
      ))}
    </div>
  ) : null;
};

export default LyricsList;
