import mongoose, { Schema, Model } from "mongoose";

export interface IVisitorLogDocument extends mongoose.Document {
  endpoint: string;
  userAgent?: string;
  ip?: string;
  timestamp: Date;
}

const VisitorLogSchema = new Schema<IVisitorLogDocument>(
  {
    endpoint: { type: String, required: true },
    userAgent: { type: String },
    ip: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const VisitorLogModel: Model<IVisitorLogDocument> =
  mongoose.models.VisitorLog || mongoose.model<IVisitorLogDocument>("VisitorLog", VisitorLogSchema);
