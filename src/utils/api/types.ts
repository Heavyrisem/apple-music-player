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

export interface VideoInfo {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
}
