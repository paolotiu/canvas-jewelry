import Category from '@models/Category';
import Item from '@models/Item';
import axios from 'axios';
import { CategoryData, ItemData } from 'interfaces';
import mongoose from 'mongoose';
import { cleanMongoData } from './cleanMongoData';

type ItemQuery = (id: string, data?: ItemData | FormData) => Promise<{ item: ItemData }>;

export const getItems = async (): Promise<ItemData[]> => {
  const res = await axios.get('/api/items');

  return res.data;
};

export const getItemById: ItemQuery = async (id) => {
  const res = await axios.get(`/api/items/${id}`);
  return res.data;
};

export const softDeleteItems = async (ids: string[]) => {
  const res = await axios.delete(`/api/items`, { data: { ids } });
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

export const getItemsFromDb = async (): Promise<ItemData[]> => {
  const res = await Item.find({ deleted: false });
  return cleanMongoData(res);
};

export const getCategories = async (): Promise<CategoryData[]> => {
  const res = await axios.get<CategoryData[]>('/api/categories');
  return res.data;
};

export const getCategoriesFromDb = async (): Promise<CategoryData[]> => {
  const categories = await Category.find();
  return cleanMongoData(categories);
};

export const createCategory = async (name: string) => {
  const res = await axios.post('/api/categories', { name });
  return res.data;
};

export const deleteCategories = async (ids: string[]) => {
  const res = await axios.delete('/api/categories', { data: { ids } });
  return res.data;
};

export const getCategoryItems = async (category: string): Promise<ItemData[]> => {
  const res = await axios.get(`/api/categories/${category}`);
  return res.data;
};
