import { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const UserSchema = new Schema<IUserDocument>({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});
