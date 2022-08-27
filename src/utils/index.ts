// eslint-disable-next-line import/prefer-default-export
export const randomRange = (start: number, end: number) => {
  return Math.random() * (start - end) + end;
};
