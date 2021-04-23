import mongoose, { Schema, model, Document, Model } from 'mongoose';

export interface Item {
  name: string;
  price: number;
  description: string;
  images: string[];
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
});

interface ItemDocument extends Item, Document {}
export type ItemModel = Model<ItemDocument>;

export default (mongoose.models.Item as ItemModel) || model<ItemDocument>('Item', ItemSchema);
