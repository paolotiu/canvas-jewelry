import { createError } from '@utils/createError';
import { UserJWTPayload } from 'interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'next-auth/jwt';

const secret = process.env.SECRET;
export const protectedRoute = async <ReqType extends NextApiRequest>(
  req: ReqType,
  res: NextApiResponse,
  cb: (req: ReqType, res: NextApiResponse) => void,
) => {
  const token = (await jwt.getToken({ req, secret })) as UserJWTPayload | undefined;

  if (!token || !token.admin) {
    return createError(res, 401, 'Not authorized');
  }

  cb(req, res);
};
