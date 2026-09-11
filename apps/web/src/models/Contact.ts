import mongoose, { Schema, Model } from "mongoose";
import type { IContactSubmission } from "@portfolio/shared";

export interface IContactDocument extends Omit<IContactSubmission, "id" | "createdAt">, mongoose.Document {
  createdAt: Date;
}

const ContactSchema = new Schema<IContactDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const ContactModel: Model<IContactDocument> =
  mongoose.models.Contact || mongoose.model<IContactDocument>("Contact", ContactSchema);
