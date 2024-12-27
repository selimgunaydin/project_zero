import { connectDB } from "@/app/lib/mongodb";
import { Blogs } from "@/app/models/Post";
import { PostDocument } from "@/app/types";

export const addNewBlog = async (values: PostDocument) => {
  try{
    await connectDB();
    const { title, content, image, category, author, tags } = values;
    if (!title || !content || !image || !category || !author) {
      return {
        error: "Please fill all the fields!",
      };
    }
    const post = new Blogs({
      title,
      content,
      image,
      category,
      author,
      tags,
    });

    await post.save();

    return {
      success: "Post created!",
    };
  } catch {}
};