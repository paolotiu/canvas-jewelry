import Category from '@models/Category';
import Item from '@models/Item';
import { protectedRoute } from '@utils/apiUtils/protectedRoute';
import { withMongoose } from '@utils/withMongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { Types } from 'mongoose';

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await Category.deleteOne({ _id: id });

  res.json('ok');
};

const getCategoryItems = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string };

  const items = await Item.aggregate()
    .unwind('categories')
    .lookup({ from: 'categories', localField: 'categories', foreignField: '_id', as: 'cat' })
    .match({ 'cat._id': Types.ObjectId(id) });

  res.json(items);
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'DELETE':
      await protectedRoute(req, res, deleteCategory);

      break;
    case 'GET':
      await getCategoryItems(req, res);
      break;

    default:
      break;
  }
};

export default withMongoose(handler);
