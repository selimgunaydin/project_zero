import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { StatsWidget } from "@/app/models/widgets";
import { mockData } from "@/app/components/widgets/stats/mockData";

export async function GET() {
  try {
    await connectDB();
    
    let widget = await StatsWidget.findOne({ isActive: true });
    
    if (!widget) {
      widget = await StatsWidget.create(mockData);
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Stats Widget GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    
    const data = await request.json();
    let widget = await StatsWidget.findOne({ isActive: true });
    
    if (!widget) {
      widget = await StatsWidget.create({ ...data, isActive: true });
    } else {
      widget = await StatsWidget.findOneAndUpdate(
        { isActive: true },
        { ...data, updatedAt: new Date() },
        { new: true }
      );
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Stats Widget PUT:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
