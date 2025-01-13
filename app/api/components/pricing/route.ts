import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { PricingWidget } from "@/app/models/widgets";
import { mockData } from "@/app/components/widgets/pricing/mockData";

export async function GET() {
  try {
    await connectDB();
    
    let widget = await PricingWidget?.findOne({ isActive: true });
    
    if (!widget) {
      widget = await PricingWidget?.create(mockData);
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Pricing Widget GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    
    const data = await request?.json();
    let widget = await PricingWidget?.findOne({ isActive: true });
    
    if (!widget) {
      widget = await PricingWidget?.create({ ...data, isActive: true });
    } else {
      widget = await PricingWidget?.findOneAndUpdate(
        { isActive: true },
        { ...data, updatedAt: new Date() },
        { new: true }
      );
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Pricing Widget PUT:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 