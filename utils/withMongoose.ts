import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const withMongoose = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.MONGODB_URI as string, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
  return handler(req, res);
};

export const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return mongoose;
  }
  // Use new db connection
  await mongoose.connect(process.env.MONGODB_URI as string, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
  return mongoose;
};
