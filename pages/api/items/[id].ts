import Item from '@models/Item';
import { createError } from '@utils/createError';
import { NextApiRequestWithData, withFormidable } from '@utils/withFormidable';
import { withMongoose } from '@utils/withMongoose';
import { NextApiResponse } from 'next';

const handler = async (req: NextApiRequestWithData, res: NextApiResponse) => {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      const item = await Item.findById(id);
      if (!item) {
        return createError(res, 400, 'Item with that id not found');
      }
      res.json({ item });

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
