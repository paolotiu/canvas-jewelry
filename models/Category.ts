import mongoose, { Schema, model, Model, Document } from 'mongoose';

export interface CategoryInterface {
  name: string;
}

export const CategorySchema = new Schema({
  name: String,
});

interface CategoryDocument extends CategoryInterface, Document {}
export type CategoryModel = Model<CategoryDocument>;

export default (mongoose.models?.Category as CategoryModel) || model('Category', CategorySchema);
