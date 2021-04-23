import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { initMiddleware } from './initMiddleware';

const upload = multer({});

const multerAny = initMiddleware(upload.any());

type NextApiHandlerWithFiles = (req: NextApiRequestWithData, res: NextApiResponse) => void;
export interface NextApiRequestWithData extends NextApiRequest {
  files?: any[];
}

export const withMulter = (handler: NextApiHandlerWithFiles) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await multerAny(req, res);

  return handler(req, res);
};
