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

CategorySchema.pre('remove', function removeMiddleware(this: CategoryDocument, next) {
  // Remove the delete category from affected items
  this.model('Item').updateMany(
    { categories: { $in: this._id } },
    { $pull: { categories: this._id } },
    { multi: true },
    next,
  );
});

CategorySchema.pre('deleteMany', function deleteManyMiddleware(next) {
  const ids = this.getQuery()._id.$in;

  // Remove the delete categories from affected items
  mongoose
    .model('Item')
    .updateMany(
      { categories: { $in: ids } },
      { $pull: { categories: { $in: ids } } },
      { multi: true },
      next,
    );
});

CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });

interface CategoryDocument extends CategoryInterface, Document {}
export type CategoryModel = Model<CategoryDocument>;

export default (mongoose.models?.Category as CategoryModel) || model('Category', CategorySchema);
