import { Document } from 'mongoose';

export const cleanMongoData = <T extends Document>(res: T[] | T) => {
  if (Array.isArray(res)) {
    return JSON.parse(
      JSON.stringify(
        res.map((doc) => {
          const item = doc.toObject();
          // eslint-disable-next-line no-underscore-dangle
          item._id = item._id?.toString();

          return item;
        }),
      ),
    );
  }
  const item = res.toJSON();
  // eslint-disable-next-line no-underscore-dangle
  item._id = item._id?.toString();

  // React-query/Next issue workaround: https://github.com/tannerlinsley/react-query/issues/1458#issuecomment-788447705
  return JSON.parse(JSON.stringify(item));
};
