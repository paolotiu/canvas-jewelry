/* eslint-disable no-case-declarations */
import { withMongoose } from '@utils/withMongoose';
import Item from '@models/Item';
import { NextApiResponse } from 'next';
import { createError } from '@utils/createError';
import { NextApiRequestWithData, withFormidable } from '@utils/withFormidable';
import { uploadImages } from '@utils/cloudinary';

const handler = async (req: NextApiRequestWithData, res: NextApiResponse) => {
  const { method, body, files } = req;
  switch (method) {
    case 'POST':
      try {
        const existingItem = await Item.findOne({ name: body.name });

        if (existingItem) return createError(res, 401, 'Item with that name already exists');

        let images: { url: string; public_id: string }[] = [];
        if (files?.length) {
          // result should have the shape of imageInfo

          images = await uploadImages(files);
        }

        const item = await Item.create({ ...body, images });
        res.status(201).json({ success: true, data: item });
      } catch (e) {
        return createError(res, 400, e.message);
      }
      break;
    case 'GET':
      const items = await Item.find({ deleted: false });
      res.status(200).json(items);
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
