import { getBlogByAuthor } from "@/app/actions/blog/get-blog-by-author";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: any }) {
  const { id: authorId } = await params;

  if (!authorId) {
    return NextResponse.json({ error: "Author ID is required" }, { status: 400 });
  }

  try {
    const result = await getBlogByAuthor(authorId);

    if (result.success) {
      return NextResponse.json({ blogs: result.success }, { status: 200 });
    }

    return NextResponse.json({ error: result.error || "Failed to fetch blogs" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
