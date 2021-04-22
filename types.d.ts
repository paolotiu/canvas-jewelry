declare namespace NodeJS {
  import mongoose from 'mongoose';

  interface Global {
    mongoose: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose | null> | null;
    };
  }
}
