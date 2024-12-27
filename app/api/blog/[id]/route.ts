import { Blogs } from "@/app/models/Post";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: any }) {
  try {
    const { id } = await params;

    const post = await Blogs.findOne({ _id: id });

    if (!post) {
      return NextResponse.json({ error: "Post not found!" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
