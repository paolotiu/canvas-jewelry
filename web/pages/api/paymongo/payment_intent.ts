import { NextApiHandler } from 'next';
import { serverPaymongo } from '@utils/paymongo/serverPaymongo';
import { PaymongoRequestError } from '@paymongo/core';

const handler: NextApiHandler = async (req, res) => {
  const { data } = req.body;
  try {
    const response = await serverPaymongo.paymentIntent.create({ data });

    res.json(response);
  } catch (err) {
    if ((err as PaymongoRequestError).isAxiosError) {
      console.error((err as PaymongoRequestError).response?.data.errors);
      res.status(500).json({ message: 'Error' });
    }
  }
};

export default handler;
