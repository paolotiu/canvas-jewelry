/* eslint-disable no-case-declarations */
import { withMongoose } from '@utils/withMongoose';
import Item from '@models/Item';
import { NextApiResponse } from 'next';
import { createError } from '@utils/createError';
import { NextApiRequestWithData, withFormidable } from '@utils/withFormidable';

const handler = async (req: NextApiRequestWithData, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      const existingItem = await Item.findOne({ name: body.name });

      if (existingItem) return createError(res, 401, 'Item with that name already exists');

      const item = await Item.create(body);
      res.status(201).json({ success: true, data: item });
      break;
    case 'GET':
      const items = await Item.find();
      res.status(201).json(items);
      break;
    default:
      createError(res, 404, 'HTTP verb not used');
      break;
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
export default withFormidable(withMongoose(handler));
