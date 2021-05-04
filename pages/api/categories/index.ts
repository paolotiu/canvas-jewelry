import Category from '@models/Category';
import { createError } from '@utils/createError';
import { withMongoose } from '@utils/withMongoose';
import { NextApiHandler } from 'next';

const createCategory: NextApiHandler = async (req, res) => {
  const { body } = req;

  const existingCategory = await Category.findOne({ name: body.name });
  if (existingCategory) {
    return createError(res, 400, 'Category with the same name exists');
  }

  const category = await Category.create({ name: body.name });
  res.json({ category });
};

const getCategories: NextApiHandler = async (_req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'POST':
      await createCategory(req, res);
      break;

    case 'GET':
      await getCategories(req, res);
      break;

    default:
      break;
  }
};
export default withMongoose(handler);
