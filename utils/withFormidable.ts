import { ImageInterface } from '@models/Item';
import formidable, { Fields, Files, File } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

type NextApiHandlerWithFiles = (req: NextApiRequestWithData, res: NextApiResponse) => void;
export interface NextApiRequestWithData<T = any> extends NextApiRequest {
  files?: File[];
  body: T;
}

interface ExpectedData {
  name: string;
  price: number;
  description: string;
  file: File[] | File;
  imagePaths: string[] | string;
  images?: ImageInterface;
}

export function fieldToArray<ReturnType, T extends Record<string, any>>(
  field: string,
  formidableData: T,
): ReturnType[] | undefined {
  // No data in field
  if (!formidableData[field]) {
    return undefined;
  }

  if (Array.isArray(formidableData[field])) {
    return formidableData[field];
  }
  return [formidableData[field]];
}

export const withFormidable = (handler: NextApiHandlerWithFiles) => async (
  req: NextApiRequestWithData,
  res: NextApiResponse,
) => {
  try {
    const data = await new Promise<{
      fields: Fields;
      files: Files;
    }>((resolve, reject) => {
      const form = new formidable.IncomingForm({ multiples: true });
      // eslint-disable-next-line consistent-return
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    // Attach parsed data to req
    req.body = data.fields;

    req.body.categories = fieldToArray('categories', data.fields);

    // Temporary solution
    const typedData = (data as unknown) as { fields: ExpectedData; files: Files };
    if (Array.isArray(typedData.fields.imagePaths) && Array.isArray(data.files.file)) {
      // If array map it into an array of imageobjects
      const imageObjects = typedData.fields.imagePaths.map((path, i) => ({
        url: path,
        file: (data.files.file as File[])[i],
      }));
      req.body.images = imageObjects;
    } else {
      // Not an array
      req.body.images = [
        {
          url: typedData.fields.imagePaths,
          file: data.files.file,
        },
      ];
    }

    req.files = fieldToArray('file', data.files);
  } catch (error) {
    res.statusCode = 400;
    res.json({ success: false, message: error.message });
    return;
  }

  // eslint-disable-next-line consistent-return
  return handler(req, res);
};
