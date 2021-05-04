import Item from '@models/Item';
import { createError } from '@utils/createError';
import { NextApiRequestWithData, withFormidable } from '@utils/withFormidable';
import { withMongoose } from '@utils/withMongoose';
import { NextApiResponse } from 'next';
// See issue: https://github.com/lodash/lodash/issues/4800
// eslint-disable-next-line import/no-named-default
import differenceWith from 'lodash/differenceWith';

import { deleteImages, IncomingImage, uploadNewImages } from '@utils/cloudinary';
import { protectedRoute } from '@utils/apiUtils/protectedRoute';

interface ReqBody {
  imagePaths: string[];
  name: string;
  description: string;
  price: number;
  images: IncomingImage[];
  categories: string[];
}

const updateItem = async (req: NextApiRequestWithData<ReqBody>, res: NextApiResponse) => {
  const { images, description, name, price, categories } = req.body;
  const { id } = req.query;

  const item = await Item.findById(id).populate('categories');

  if (!item) {
    return createError(res, 400, 'Item with that id not found');
  }

  // Get images to delete
  const imagesToDelete = differenceWith(
    item.images,
    images,
    (image, incomingImage) => image.url === incomingImage.url,
  );

  // Don't await it
  // It won't affect any returns anyway
  if (imagesToDelete.length) {
    deleteImages(imagesToDelete.map((img) => img.public_id));
  }

  // Get new images array
  const newImages = await uploadNewImages(images, item.images);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  item.images = newImages;

  // Update item
  Object.assign(item, { description, name, price, categories });

  const updatedItem = await item.save();
  res.json({ item: updatedItem });
};

const deleteItem = async (req: NextApiRequestWithData<ReqBody>, res: NextApiResponse) => {
  const { id } = req.query;

  const item = await Item.findById(id).populate('categories');

  if (!item) {
    return createError(res, 400, 'Item with that id not found');
  }

  item.deleted = true;
  const savedItem = await item.save();

  res.json({ item: savedItem });
};

const handler = async (req: NextApiRequestWithData<ReqBody>, res: NextApiResponse) => {
  const { method, query } = req;

  const { id } = query;

  const item = await Item.findById(id).populate('categories');

  if (!item) {
    return createError(res, 400, 'Item with that id not found');
  }

  switch (method) {
    case 'GET':
      res.json({ item });

      break;

    case 'PUT':
      await protectedRoute(req, res, updateItem);

      break;

    case 'DELETE':
      await protectedRoute(req, res, deleteItem);
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
