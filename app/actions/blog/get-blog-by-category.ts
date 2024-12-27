import { connectDB } from "@/app/lib/mongodb";
import { Blogs } from "@/app/models/Post";

export const getBlogByCategory = async (id: string) => {
  try {
    await connectDB();

    const blogs = await Blogs.find({
      category: id,
    })
      .populate("category")
      .populate({
        path: "author",
        select: "-password -role -createdAt -updatedAt -phone -email", 
      });
    return {
      success: blogs,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong!",
    };
  }
};
