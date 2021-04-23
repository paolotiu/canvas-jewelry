const points = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
};

export const breakpoints = Object.fromEntries<string>(
  Object.entries(points).map(([key, val]) => [key, `@media (min-width: ${val}px)`]),
) as { [K in keyof typeof points]: string };
export const createBreakpoint = (bp: number) => `@media (min-width: ${bp}px)`;
