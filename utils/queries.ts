import Item, { ItemDocument, ItemInterface } from '@models/Item';
import axios from 'axios';
import { CategoriesReturn } from 'interfaces';
import mongoose from 'mongoose';
import { cleanMongoData } from './cleanMongoData';

type ItemQuery = (id: string, data?: ItemInterface | FormData) => Promise<{ item: ItemDocument }>;

export const getItems = async (): Promise<ItemInterface[]> => {
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
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return null;
  }
  const res = await Item.findById(id).populate('categories');
  if (!res) {
    return null;
  }
  return { item: cleanMongoData(res) };
};

export const getItemsFromDb = async () => {
  const res = await Item.find({ deleted: false });
  return cleanMongoData(res);
};

export const getCategories = async (): Promise<CategoriesReturn> => {
  const res = await axios.get('/api/categories');
  return res.data;
};
