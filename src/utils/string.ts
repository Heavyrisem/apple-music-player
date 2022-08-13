// eslint-disable-next-line import/prefer-default-export
export const leftpad = (num: number, size: number = 2) => {
  let s = `${num}`;
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
};
