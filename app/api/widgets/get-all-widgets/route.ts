import { connectDB } from "@/app/lib/mongodb";
import { WidgetList } from "@/app/models/widgets";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    await connectDB();
    const widgets = await WidgetList.find();
    return NextResponse.json(widgets);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}