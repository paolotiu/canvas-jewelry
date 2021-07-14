import { NextApiHandler } from 'next';
import { serverPaymongo } from '@utils/paymongo/serverPaymongo';

const handler: NextApiHandler = async (req, res) => {
  const { data } = req.body;

  const response = await serverPaymongo.paymentIntent.create({ data });

  res.json(response);
};

export default handler;
