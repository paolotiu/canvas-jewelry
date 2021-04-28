/* eslint-disable @typescript-eslint/no-empty-interface */
import mongoose, { Schema, model, Document, Model, Types } from 'mongoose';

export interface ImageInterface extends Types.Embedded {
  url: string;
  /** The cloudinary public id */
  public_id: string;
}

export interface ItemInterface {
  name: string;
  price: number;
  description: string;
  images: ImageInterface[];
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

export interface ItemDocument extends ItemInterface, Document {}
export type ItemModel = Model<ItemDocument>;

export default (mongoose.models?.Item as ItemModel) || model<ItemDocument>('Item', ItemSchema);
