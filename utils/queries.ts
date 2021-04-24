import Item from '@models/Item';
import axios from 'axios';
import { cleanMongoData } from './cleanMongoData';

export const getItems = async () => {
  const res = await axios.get('/api/items');

  return res.data;
};

export const getItemById = async (id: string) => {
  const res = await axios.get(`/api/items/${id}`);
  return res.data;
};

export const getOneItemFromDb = async (id: string) => {
  const res = await Item.findById(id);
  if (!res) {
    throw new Error('Item not found');
  }
  return { item: cleanMongoData(res) };
};

export const getItemsFroDb = async () => {
  const res = await Item.find();
  return cleanMongoData(res);
};
