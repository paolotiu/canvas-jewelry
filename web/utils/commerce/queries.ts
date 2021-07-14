import axios from 'axios';

export const updateOrderTransaction = (data: { orderId: string; status: string }) => {
  return axios.put(`/api/commerce/updateTransaction`, data);
};

export const retrieveCart = () => {
  return axios.get('https://api.chec.io/v1/carts');
};
