import mongoose, { Schema, model, Document, Model } from 'mongoose';

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  data: {
    name: string;
    email: string;
    admin: boolean;
  };
}
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  admin: Boolean,
});

// eslint-disable-next-line func-names
UserSchema.virtual('data').get(function (this: UserDocument) {
  return {
    name: this.name,
    email: this.email,
    admin: this.admin,
  };
});

export interface UserDocument extends Document, UserInterface {}
export type UserModel = Model<UserDocument>;
export default (mongoose.models?.User as UserModel) || model<UserDocument>('User', UserSchema);
