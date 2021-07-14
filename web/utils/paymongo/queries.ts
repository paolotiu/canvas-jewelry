import { CreatePaymentIntentParams, PaymentIntentResource } from '@paymongo/core';
import axios from 'axios';

export const createPaymentIntent = async (data: CreatePaymentIntentParams) => {
  const res = await axios.post<PaymentIntentResource>('/api/paymongo/payment_intent', data);
  return res.data;
};
