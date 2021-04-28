import Item, { ItemDocument } from '@models/Item';
import { createError } from '@utils/createError';
import { NextApiRequestWithData, withFormidable } from '@utils/withFormidable';
import { withMongoose } from '@utils/withMongoose';
import { NextApiResponse } from 'next';
// See issue: https://github.com/lodash/lodash/issues/4800
// eslint-disable-next-line import/no-named-default
import differenceWith from 'lodash/differenceWith';

import { deleteImages, IncomingImage, uploadNewImages } from '@utils/cloudinary';

interface ReqBody {
  imagePaths: string[];
  name: string;
  description: string;
  price: number;
  images: IncomingImage[];
}

const updateItem = async (
  req: NextApiRequestWithData<ReqBody>,
  res: NextApiResponse,
  item: ItemDocument,
) => {
  const { images, description, name, price } = req.body;

  // Get images to delete
  const imagesToDelete = differenceWith(
    item.images,
    images,
    (image, incomingImage) => image.url === incomingImage.url,
  );

  // Don't await it
  // It won't affect any returns anyway
  deleteImages(imagesToDelete.map((img) => img.public_id));

  // Get new images array
  const newImages = await uploadNewImages(images, item.images);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  item.images = newImages;

  // Update item
  Object.assign(item, { description, name, price });

  const updatedItem = await item.save();
  res.json({ item: updatedItem });
};

const handler = async (req: NextApiRequestWithData<ReqBody>, res: NextApiResponse) => {
  const { method, query } = req;

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
      await updateItem(req, res, item);
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
