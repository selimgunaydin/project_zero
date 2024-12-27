import { Category } from "@/app/models/Category";
import { Post } from "@/app/models/Post";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await Post.find();
    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { title, content, image, category, author, tags } = body;
    if (!title || !content || !image || !category || !author) {
      return NextResponse.json(
        { error: "Please fill all the fields!" },
        { status: 400 }
      );
    }

    const authorValidate = await User.find({ _id: author });
    const categoryValidate = await Category.find({ _id: category });
    console.log(authorValidate, categoryValidate);

    if (authorValidate.length === 0 || categoryValidate.length === 0) {
      return NextResponse.json(
        { error: "Author or Category not found!" },
        { status: 404 }
      );
    }

    const post = new Post({
      title,
      content,
      image,
      category,
      author,
      tags,
    });

    await post.save();

    return NextResponse.json({ success: "Post created!" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
