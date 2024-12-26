import mongoose, { model, Schema } from "mongoose";
import { CategoryDocument } from "../types";

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.models?.db_categories || model<CategoryDocument>("db_categories", CategorySchema);
