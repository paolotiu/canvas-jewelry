import Category from '@models/Category';
import { protectedRoute } from '@utils/apiUtils/protectedRoute';
import { withMongoose } from '@utils/withMongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const deleteCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await Category.deleteOne({ _id: id });

  res.json('ok');
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'DELETE':
      await protectedRoute(req, res, deleteCategory);

      break;

    default:
      break;
  }
};

export default withMongoose(handler);
