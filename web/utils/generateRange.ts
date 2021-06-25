// Taken from https://stackoverflow.com/a/49577331/14242400
export const generateRange = (from: number, to: number, step: number) =>
  [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
