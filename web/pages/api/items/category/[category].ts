import Item from '@models/Item';
import { createError } from '@utils/createError';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Types } from 'mongoose';

const getItems: NextApiHandler = async (req, res) => {
  const { category } = req.query as { category: string };

  const isObjectId = (str: string) => /^[a-fA-F0-9]{24}$/.test(str);

  if (!category) {
    return createError(res, 400, 'No categories given');
  }

  if (isObjectId(category)) {
    // Query is a objectid
    const items = await Item.aggregate()
      .unwind('categories')
      .lookup({ from: 'categories', localField: 'categories', foreignField: '_id', as: 'cat' })
      .match({ 'cat._id': Types.ObjectId(category) });

    res.json(items);
    return;
  }

  // Query is a name
  const items = await Item.aggregate()
    .unwind('categories')
    .lookup({ from: 'categories', localField: 'categories', foreignField: '_id', as: 'cat' })
    .match({ 'cat.name': { $regex: new RegExp(`\\b^${category}$\\b`, 'i') } });
  // ----------------------------Regex matches exact insensitive name-----------------

  res.json(items);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      await getItems(req, res);
      break;
    default:
      break;
  }
};

export default handler;
