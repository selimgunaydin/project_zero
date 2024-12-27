import mongoose, { model, Schema } from "mongoose";
import { PostDocument } from "../types";

const PostSchema = new Schema<PostDocument>({
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

export const Post = mongoose.models?.db_posts || model("db_posts", PostSchema);
