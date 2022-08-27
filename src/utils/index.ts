export const randomRange = (start: number, end: number) => {
  return Math.random() * (start - end) + end;
};

export const randomBool = (): boolean => {
  return Boolean(Math.round(randomRange(0, 1)));
};
