import { leftpad } from './string';

// eslint-disable-next-line import/prefer-default-export
export const prettySeconds = (sec: number) => {
  const seconds = Math.floor(sec % 60);
  const minutes = Math.floor(sec / 60);
  const hours = Math.floor(minutes / 60);

  const duration = [
    hours > 0 ? `${hours}` : '',
    minutes > 0 ? `${minutes}` : '0',
    seconds > 0 ? `${leftpad(seconds)}` : '00',
  ]
    .filter(Boolean)
    .join(':');

  return duration;
};
