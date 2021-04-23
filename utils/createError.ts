import { NextApiResponse } from 'next';

export const createError = (res: NextApiResponse, code: number, message: string) => {
  res.statusCode = code;
  res.json({ status: code, message });
};
