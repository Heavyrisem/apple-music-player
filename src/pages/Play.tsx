import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fromVtt } from 'subtitles-parser-vtt';

import AudioPlayer from '@components/AudioPlayer';
import CoverImage from '@components/CoverImage';
import DefaultLayout from '@components/Layouts/DefaultLayout';
import LyricsList from '@components/Lyrics';
import { Lyrics } from '@types';
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
    const lyrics = await getMusicLyrics(info.videoId).then((res) => fromVtt(res.lyrics, 's'));
    return { info, lyrics };
  }, []);

  useEffect(() => {
    if (requestedVideoId) {
      fetchMusicInfo(requestedVideoId).then(({ info, lyrics }) => {
        setMusicInfo(info);
        setMusicLyrics(lyrics);
      });
    }
  }, [fetchMusicInfo, requestedVideoId]);

  return (
    <DefaultLayout>
      {musicInfo && musicLyrics && (
        <>
          <CoverImage src={musicInfo.thumbnail} />
          <AudioPlayer
            onTimeUpdate={setCurrentTime}
            onLyricsUpdate={setShowLyrics}
            src={`/music/file/${musicInfo.videoId}`}
            title={musicInfo.title}
            artist={musicInfo.artists.join(', ')}
            album={musicInfo.album}
          />
          {showLyrics && (
            <div>
              <LyricsList lyrics={musicLyrics} currentTime={currentTime} />
            </div>
          )}
        </>
      )}
    </DefaultLayout>
  );
};

export default Play;
