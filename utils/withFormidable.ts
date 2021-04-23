import formidable, { Fields, Files } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

type NextApiHandlerWithFiles = (req: NextApiRequestWithData, res: NextApiResponse) => void;
export interface NextApiRequestWithData extends NextApiRequest {
  files?: any[];
}

export const withFormidable = (handler: NextApiHandlerWithFiles) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const data = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
      const form = new formidable.IncomingForm({ keepExtensions: true });
      // eslint-disable-next-line consistent-return
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    // Attach parsed data to req
    req.body = data.fields;
    (req as NextApiRequestWithData).files = [data.files];
  } catch (error) {
    res.statusCode = 400;
    res.json({ success: false, message: error.message });
    return;
  }

  // eslint-disable-next-line consistent-return
  return handler(req, res);
};
