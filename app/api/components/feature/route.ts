import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { FeatureWidget } from "@/app/models/widgets";
import { featureData } from "@/app/components/widgets/feature/mockData";

export async function GET() {
  try {
    await connectDB();
    
    let widget = await FeatureWidget.findOne({ isActive: true });
    
    if (!widget) {
      widget = await FeatureWidget.create(featureData);
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Feature Widget GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    
    const data = await request.json();
    let widget = await FeatureWidget.findOne({ isActive: true });
    
    if (!widget) {
      widget = await FeatureWidget.create({ ...data, isActive: true });
    } else {
      widget = await FeatureWidget.findOneAndUpdate(
        { isActive: true },
        { ...data, updatedAt: new Date() },
        { new: true }
      );
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Feature Widget PUT:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 