/* eslint-disable @typescript-eslint/no-empty-interface */
import mongoose, { Schema, model, Document, Model } from 'mongoose';

export interface ImageInterface {
  _id: string;
  url: string;
  /** The cloudinary public id */
  public_id: string;
}

export interface ItemInterface {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: {
    url: string;
    public_id: string;
  }[];
  imagePublicIds: string[];
  imageUrls: string[];
  deleted: boolean;
}

const ImageSchema = new Schema({
  url: String,
  public_id: String,
});

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
  images: { type: [ImageSchema], default: () => [] },
  imageIds: [String],
  deleted: { type: Boolean, default: false },
});

// eslint-disable-next-line prefer-arrow-callback
ItemSchema.virtual('imagePublicIds').get(function getImagePublicIds(this: ItemInterface) {
  return this.images.map((image) => image.public_id);
});

// eslint-disable-next-line prefer-arrow-callback
ItemSchema.virtual('imageUrls').get(function getImageUrls(this: ItemInterface) {
  return this.images.map((image) => image.url);
});

// Populate virtuals
ItemSchema.set('toJSON', { virtuals: true });
ItemSchema.set('toObject', { virtuals: true });

interface ItemNoId extends Omit<ItemInterface, '_id'> {}
interface ItemDocument extends ItemNoId, Document {}
export type ItemModel = Model<ItemDocument>;

export default (mongoose.models?.Item as ItemModel) || model<ItemDocument>('Item', ItemSchema);
