import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { TestimonialsWidget } from "@/app/models/widgets";
import { mockData } from "@/app/components/widgets/testimonials/mockData";

export async function GET() {
  try {
    await connectDB();
    
    let widget = await TestimonialsWidget?.findOne({ isActive: true });
    
    if (!widget) {
      widget = await TestimonialsWidget?.create(mockData);
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Testimonials Widget GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    
    const data = await request?.json();
    let widget = await TestimonialsWidget?.findOne({ isActive: true });
    
    if (!widget) {
      widget = await TestimonialsWidget?.create({ ...data, isActive: true });
    } else {
      widget = await TestimonialsWidget?.findOneAndUpdate(
        { isActive: true },
        { ...data, updatedAt: new Date() },
        { new: true }
      );
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Testimonials Widget PUT:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 