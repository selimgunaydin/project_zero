import { Category } from "@/app/models/Category";
import { Blogs } from "@/app/models/Post";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const posts = await Blogs.find();
    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, image, category, author, tags } = body;

    if (!title || !content || !category || !author) {
      return NextResponse.json(
        { error: "Please fill all the fields!" },
        { status: 400 }
      );
    }

    const userExists = await User.findById(author);
    if (!userExists) {
      return NextResponse.json({ error: "Author not found!" }, { status: 404 });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return NextResponse.json(
        { error: "Category not found!" },
        { status: 404 }
      );
    }

    let finalImageUrl = "";
    if (image) {
      try {
        const uploadResult = await cloudinary.uploader.upload(image, {
          folder: "blog-app",
        });
        finalImageUrl = uploadResult.secure_url;
      } catch (error: any) {
        console.error("Image upload error:", error);
        return NextResponse.json(
          { error: "Image upload failed" },
          { status: 500 }
        );
      }
    }

    const post = new Blogs({
      title,
      content,
      category,
      author,
      tags,
      image: finalImageUrl,
    });
    await post.save();

    return NextResponse.json({ success: "Post created!" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
