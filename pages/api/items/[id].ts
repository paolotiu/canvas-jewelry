import Item from '@models/Item';
import { createError } from '@utils/createError';
import { NextApiRequestWithData, withFormidable } from '@utils/withFormidable';
import { withMongoose } from '@utils/withMongoose';
import { NextApiResponse } from 'next';

const handler = async (req: NextApiRequestWithData, res: NextApiResponse) => {
  const { method, query, body } = req;
  const { id } = query;

  const item = await Item.findById(id);
  if (!item) {
    return createError(res, 400, 'Item with that id not found');
  }

  switch (method) {
    case 'GET':
      res.json({ item });

      break;

    case 'PUT':
      Object.assign(item, body);
      const updatedItem = await item.save();
      res.json({ item: updatedItem });

      break;

    case 'DELETE':
      item.deleted = true;
      const savedItem = await item.save();

      res.json({ item: savedItem });
      break;

    default:
      break;
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withFormidable(withMongoose(handler));
