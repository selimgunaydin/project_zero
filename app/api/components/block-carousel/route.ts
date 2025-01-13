import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { BlockCarouselWidget } from "@/app/models/widgets";
import { blockCarouselData } from "@/app/components/widgets/block-carousel/mockData";

export async function GET() {
  try {
    await connectDB();
    
    let widget = await BlockCarouselWidget.findOne({ isActive: true });
    
    if (!widget) {
      widget = await BlockCarouselWidget.create(blockCarouselData);
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Block Carousel Widget GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    
    const data = await request.json();
    let widget = await BlockCarouselWidget.findOne({ isActive: true });
    
    if (!widget) {
      widget = await BlockCarouselWidget.create({ ...data, isActive: true });
    } else {
      widget = await BlockCarouselWidget.findOneAndUpdate(
        { isActive: true },
        { ...data, updatedAt: new Date() },
        { new: true }
      );
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Block Carousel Widget PUT:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 