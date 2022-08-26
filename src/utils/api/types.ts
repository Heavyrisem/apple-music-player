interface BaseType {
  id: number;
  createdAt: Date;
}

export interface MusicInfo extends BaseType {
  videoId: string;
  musicId: string;
  title: string;
  album: string;
  artists: string[];
  thumbnail: string;
  isExplicit: boolean;
}

export interface MusicLyrics extends BaseType {
  videoId: string;
  lyrics: string;
}
