export const leftpad = (num: number, size: number = 2) => {
  let s = `${num}`;
  while (s.length < size) {
    s = `0${s}`;
  }
  return s;
};

export const replaceAll = (origin: string, filter: string[], target: string) => {
  let result = origin;

  filter.forEach((char) => {
    result = result.split(char).join(target);
  });

  return result;
};
