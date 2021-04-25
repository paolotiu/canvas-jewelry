/* eslint-disable no-case-declarations */
import { withMongoose } from '@utils/withMongoose';
import Item from '@models/Item';
import { NextApiResponse } from 'next';
import { createError } from '@utils/createError';
import { NextApiRequestWithData, withFormidable } from '@utils/withFormidable';
import { UploadApiOptions, UploadApiResponse, v2 as cloudinary } from 'cloudinary';

const uploadAsync = (path: string, options: UploadApiOptions) =>
  new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader.upload(path, options, (err, result) => {
      if (err) reject(err);
      if (!result) reject(result);
      resolve(result as UploadApiResponse);
    });
  });

const handler = async (req: NextApiRequestWithData, res: NextApiResponse) => {
  const { method, body, files } = req;
  switch (method) {
    case 'POST':
      try {
        const existingItem = await Item.findOne({ name: body.name });

        if (existingItem) return createError(res, 401, 'Item with that name already exists');

        const imageInfo: { urls: string[]; ids: string[] } = { urls: [], ids: [] };
        if (files) {
          const result = (
            await Promise.all(
              files.map((file) =>
                uploadAsync(file.path, {
                  folder: 'canvas',
                  public_id: file.name?.replace('.jpg', '') || undefined,
                }),
              ),
            )
          ).reduce(
            (prev, curr) => ({
              urls: [...prev.urls, curr.url],
              ids: [...prev.ids, curr.public_id],
            }),
            imageInfo,
          );
          imageInfo.urls = result.urls;
          imageInfo.ids = result.ids;
        }

        const item = await Item.create({ ...body, ...imageInfo });
        res.status(201).json({ success: true, data: item });
      } catch (e) {
        return createError(res, 400, e.message);
      }
      break;
    case 'GET':
      const items = await Item.find();
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
