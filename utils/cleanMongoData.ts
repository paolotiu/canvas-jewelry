import { Document } from 'mongoose';

export const cleanMongoData = <T extends Document[]>(res: T) =>
  res.map((doc) => {
    const item = doc.toObject();
    // eslint-disable-next-line no-underscore-dangle
    item._id = item._id.toString();
    return item;
  });
