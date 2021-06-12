import { ThemeType } from '@styles/theme';

declare namespace NodeJS {
  import mongoose from 'mongoose';

  interface Global {
    mongoose: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose | null> | null;
    };
  }
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeType {}
}
