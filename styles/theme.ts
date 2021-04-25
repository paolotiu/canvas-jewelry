const typography = {
  fontSizes: {
    /** 12px (0.75rem) */
    xs: '0.75rem',
    /** 14px (0.875rem) */
    sm: '0.875rem',
    /** 16px (1rem) */
    md: '1rem',
    /** 18px (1.125rem) */
    lg: '1.125rem',
    /** 20px (1.25rem) */
    xl: '1.25rem',
    /** 24px (1.5rem) */
    '2xl': '1.5rem',
    /** 30px (1.5rem) */
    '3xl': '1.875rem',
    /** 36px (2.25rem) */
    '4xl': '2.25rem',
    /** 48px (3rem) */
    '5xl': '3rem',
    /** 60px (3.75rem) */
    '6xl': '3.75rem',
    /** 72px (4.5rem) */
    '7xl': '4.5rem',
    /** 96px (6rem) */
    '8xl': '6rem',
    /** 128px (8rem) */
    '9xl': '8rem',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
};

const borderRadius = {
  none: '0',
  /** 2px (0.125rem) */
  sm: '0.125rem',
  /** 4px (0.25rem) */
  base: '0.25rem',
  /** 6px (0.375rem) */
  md: '0.375rem',
  /** 8px (0.5rem) */
  lg: '0.5rem',
  /** 12px (0.75rem) */
  xl: '0.75rem',
  /** 16px (1rem) */
  '2xl': '1rem',
  /** 24px (1.5rem) */
  '3xl': '1.5rem',
  /** 9999px */
  full: '9999px',
};

const colors = {
  white: '#FFF',
  black: '#222',
  gray: '#E5E5E5',
  inactive: '#D7D4D4',
  headerText: '#222',
  mainText: '#555',
  secondaryText: '#888',
  success: '#4ADE80',
  danger: '#E53E3E',
  neutral: '#334155',
  inactiveTransparent: 'rgba(145,145,145,0.45)',
  activeTransparent: 'rgba(10,10,10,0.40)',

  carousel: {
    inactiveSlide: '#CCC',
    activeSlide: 'rgba(10,10,10,0.40)',
  },
  whiteAlpha: {
    50: 'rgba(255, 255, 255, 0.04)',
    100: 'rgba(255, 255, 255, 0.06)',
    200: 'rgba(255, 255, 255, 0.08)',
    300: 'rgba(255, 255, 255, 0.16)',
    400: 'rgba(255, 255, 255, 0.24)',
    500: 'rgba(255, 255, 255, 0.36)',
    600: 'rgba(255, 255, 255, 0.48)',
    700: 'rgba(255, 255, 255, 0.64)',
    800: 'rgba(255, 255, 255, 0.80)',
    900: 'rgba(255, 255, 255, 0.92)',
  },

  blackAlpha: {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    200: 'rgba(0, 0, 0, 0.08)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    500: 'rgba(0, 0, 0, 0.36)',
    600: 'rgba(0, 0, 0, 0.48)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.80)',
    900: 'rgba(0, 0, 0, 0.92)',
  },

  coolGray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};
export type ButtonColors = Exclude<
  keyof typeof colors,
  'coolGray' | 'blackAlpha' | 'whiteAlpha' | 'carousel'
>;

export const theme = { typography, colors, borderRadius };
export type ThemeType = typeof theme;
