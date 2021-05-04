/* eslint-disable prefer-arrow-callback */
import mongoose, { Schema, model, Model, Document } from 'mongoose';

export interface CategoryInterface {
  name: string;
  getItemCount: (cb: (err: any, count: number) => void) => void;
  itemCount: number;
}

export const CategorySchema = new Schema({
  name: { unique: true, type: String },
});

CategorySchema.methods.getItemCount = function getItemCount(cb) {
  mongoose.model('Item').find({ categories: this._id }, (err, docs) => {
    cb(err, docs.length);
  });
};

CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });

interface CategoryDocument extends CategoryInterface, Document {}
export type CategoryModel = Model<CategoryDocument>;

export default (mongoose.models?.Category as CategoryModel) || model('Category', CategorySchema);
