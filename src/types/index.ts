export interface MusicType {
  title: string;
  artist: string;
  album?: string;
}

export interface Lyrics {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
}
