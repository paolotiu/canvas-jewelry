import { Order } from '@chec/commerce.js/types/order';
import axios from 'axios';
import { NextApiHandler } from 'next';

const axiosInstance = axios.create({
  headers: {
    'X-Authorization': process.env.COMMERCE_SECRET_TOKEN,
  },
  baseURL: 'https://api.chec.io/v1',
});

const handler: NextApiHandler = async (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    res.status(400).json({ message: 'Not enough params' });
    return;
  }

  const { data: order } = await axiosInstance.get<Order | null>(`/orders/${orderId}`);

  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }

  const transactionId = order.transactions[0].id;

  const { status: resStatus } = await axiosInstance.put(
    `orders/${orderId}/transactions/${transactionId}`,
    { status },
  );

  if (resStatus === 200) {
    res.json({ message: 'success' });
    return;
  }

  res.status(400).json({ message: 'Something went wrong' });
};

export default handler;
