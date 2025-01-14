import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { WidgetList } from "@/app/models/widgets";

export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (!type) {
    return NextResponse.json({ error: "Type is required" }, { status: 400 });
  }

  try {
    await connectDB();

    const widgets = await WidgetList.find({ type });

    if (!widgets || widgets.length === 0) {
      return NextResponse.json({ error: "No widgets found" }, { status: 404 });
    }

    return NextResponse.json(widgets[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
