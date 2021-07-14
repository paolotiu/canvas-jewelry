import { Order } from '@chec/commerce.js/types/order';
import { serverPaymongo } from '@utils/paymongo/serverPaymongo';
import axios from 'axios';
import { NextApiHandler } from 'next';

const axiosInstance = axios.create({
  headers: {
    'X-Authorization': process.env.COMMERCE_SECRET_TOKEN,
  },
  baseURL: 'https://api.chec.io/v1',
});

const handler: NextApiHandler = async (req, res) => {
  const { body } = req;

  // Step 1: Get the paymentIntent ID from the body
  const id = body?.data?.attributes?.data?.attributes?.payment_intent_id || null;
  if (!id) {
    console.error('No ID');
    return;
  }

  // Step 2: Get the paymentIntent Resource
  const paymentIntent = await serverPaymongo.paymentIntent.retrieve<{ orderId: string }>({ id });

  // Step 3: Get the orderId from the resource metadata
  const {
    metadata: { orderId },
  } = paymentIntent.attributes;

  // Step 4: Get the order from commercejs
  const { data: order } = await axiosInstance.get<Order | null>(`/orders/${orderId}`);

  if (!order) {
    console.error('Order not found');
    res.status(404).json({ message: 'Order not found' });
    return;
  }

  // Step 5: Get the transaction ID
  const transactionId = order.transactions[0].id;

  // Step 6: ????

  // Step 7: PROFIT $$$$
  await axiosInstance.put(`orders/${orderId}/transactions/${transactionId}`, {
    status: 'complete',
  });

  return res.json({ message: 'OK' });
};

export default handler;
