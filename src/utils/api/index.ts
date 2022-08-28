import axios from 'axios';

import { MusicInfo, MusicLyrics, VideoInfo } from './types';

const instance = axios.create({});

const highResThumbnailUrl = (url: string) => {
  return url.split('=w120').join('=w1000').split('-h120').join('-h1000');
};

export const searchMusic = (q: string, lyrics = false): Promise<MusicInfo> => {
  return instance
    .request<MusicInfo>({
      method: 'GET',
      url: '/music/search',
      params: {
        q,
        lyrics,
      },
    })
    .then((res) => ({ ...res.data, thumbnail: highResThumbnailUrl(res.data.thumbnail) }));
};

export const getMusicLyrics = (videoId: string, lang = ['en', 'en-GB', 'ko']) => {
  return instance
    .request<MusicLyrics>({
      method: 'GET',
      url: `/music/lyrics/${videoId}`,
      params: { lang },
    })
    .then((res) => res.data)
    .catch(() => undefined);
};

export const getMusicData = (videoId: string) => {
  return instance
    .request({
      method: 'GET',
      url: `/music/file/${videoId}`,
    })
    .then((res) => res.data);
};

export const getMusicInfo = (videoId: string): Promise<MusicInfo> => {
  return instance
    .request<MusicInfo>({
      method: 'GET',
      url: `/music/${videoId}`,
    })
    .then((res) => ({ ...res.data, thumbnail: highResThumbnailUrl(res.data.thumbnail) }));
};

export const searchVideos = (q: string, lyrics = false): Promise<VideoInfo[]> => {
  return instance
    .request<VideoInfo[]>({
      method: 'GET',
      url: `/music/video/search`,
      params: { q, lyrics },
    })
    .then((res) => res.data);
};
