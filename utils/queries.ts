import Item, { ItemInterface } from '@models/Item';
import axios from 'axios';
import { cleanMongoData } from './cleanMongoData';

type ItemQuery = (id: string, data?: ItemInterface | FormData) => Promise<{ item: ItemInterface }>;

export const getItems = async () => {
  const res = await axios.get('/api/items');

  return res.data;
};

export const getItemById: ItemQuery = async (id) => {
  const res = await axios.get(`/api/items/${id}`);
  return res.data;
};

export const softDeleteItem: ItemQuery = async (id) => {
  const res = await axios.delete(`/api/items/${id}`);
  return res.data;
};

export const updateItem: ItemQuery = async (id, data) => {
  const res = await axios.put(`/api/items/${id}`, data);
  return res.data;
};

export const getOneItemFromDb = async (id: string) => {
  const res = await Item.findById(id);
  if (!res) {
    throw new Error('Item not found');
  }
  return { item: cleanMongoData(res) };
};

export const getItemsFromDb = async () => {
  const res = await Item.find({ deleted: false });
  return cleanMongoData(res);
};
