export interface MusicType {
  title: string;
  artist: string;
  album?: string;
}

export interface Lyrics {
  startTime: number;
  endTime: number;
  text: string;
}
