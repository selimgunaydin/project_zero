import mongoose, { model, Schema } from "mongoose";
import { PostDocument } from "../types";

const BlogSchema = new Schema<PostDocument>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "db_categories",
    required: [true, "Category is required"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "db_users",
    required: [true, "User is required"],
  },
  tags: {
    type: [String],
    required: false,
  },
});

export const Blogs = mongoose.models?.db_blogs || model("db_blogs", BlogSchema);
