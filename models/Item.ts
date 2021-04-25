/* eslint-disable @typescript-eslint/no-empty-interface */
import mongoose, { Schema, model, Document, Model } from 'mongoose';

export interface ItemInterface {
  name: string;
  price: number;
  description: string;
  images: string[];
  imageIds: string[];
  _id: string;
}

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  images: [String],
  imageIds: [String],
});

interface ItemNoId extends Omit<ItemInterface, '_id'> {}
interface ItemDocument extends ItemNoId, Document {}
export type ItemModel = Model<ItemDocument>;

export default (mongoose.models?.Item as ItemModel) || model<ItemDocument>('Item', ItemSchema);
