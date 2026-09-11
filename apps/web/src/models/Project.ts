import mongoose, { Schema, Model } from "mongoose";
import type { IProject } from "@portfolio/shared";

export interface IProjectDocument extends Omit<IProject, "id">, mongoose.Document {
  id: string;
}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["observability", "ai", "fullstack", "infrastructure"],
      required: true,
    },
    tags: [{ type: String }],
    architecture: [{ type: String }],
    highlights: [{ type: String }],
    metrics: { type: Map, of: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = ret._id ? String(ret._id) : ret.slug;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const ProjectModel: Model<IProjectDocument> =
  mongoose.models.Project || mongoose.model<IProjectDocument>("Project", ProjectSchema);
