import { connectDB } from "@/app/lib/mongodb";
import { Blogs } from "@/app/models/Post";

export const getBlogByAuthor = async (authorId: string) => {
  try {
    await connectDB();
    const blogs = await Blogs.find({
      author: authorId,
    })
      .populate("category")
      .populate({
        path: "author",
        select: "-password -role -createdAt -updatedAt -phone -email",
      })
      .exec();
    return {
      success: blogs,
    };
  } catch {
    return {
      error: "Something went wrong!",
    };
  }
};
