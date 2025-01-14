import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { WidgetList } from "@/app/models/widgets";
import { logModelOperation } from "@/app/lib/logMiddleware";

export async function GET(
  request: Request,
  { params }: { params: { id?: string; type?: string } }
) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (!type) {
    return NextResponse.json({ error: "Type is required" }, { status: 400 });
  }

  try {
    await connectDB();

    // `type` kullanarak filtreleme yapıyoruz
    const widgets = await WidgetList.find({ type });
    if (!widgets || widgets.length === 0) {
      return NextResponse.json({ error: "No widgets found" }, { status: 404 });
    }

    return NextResponse.json(widgets);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();

    if (body.order !== undefined) {
      await logModelOperation(
        "update",
        "WidgetList",
        params.id,
        `Widget sırası güncellendi: ${body.order}`
      );
    }

    const widget = await WidgetList.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!widget) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }

    return NextResponse.json(widget);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const widget = await WidgetList.findByIdAndDelete(params.id);

    if (!widget) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Widget deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
