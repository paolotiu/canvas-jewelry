import { Document } from 'mongoose';

export const cleanMongoData = <T extends Document>(res: T[] | T) => {
  if (Array.isArray(res)) {
    return res.map((doc) => {
      const item = doc.toObject();
      // eslint-disable-next-line no-underscore-dangle
      item._id = item._id?.toString();
      return item;
    });
  }
  const item = res.toObject();
  // eslint-disable-next-line no-underscore-dangle
  item._id = item._id?.toString();
  return item;
};
