import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { NewsletterWidget } from "@/app/models/widgets";
import { newsletterData } from "@/app/components/widgets/newsletter/mockData";

export async function GET() {
  try {
    await connectDB();
    
    let widget = await NewsletterWidget?.findOne({ isActive: true });
    
    if (!widget) {
      widget = await NewsletterWidget?.create(newsletterData);
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Newsletter Widget GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    
    const data = await request?.json();
    let widget = await NewsletterWidget?.findOne({ isActive: true });
    
    if (!widget) {
      widget = await NewsletterWidget?.create({ ...data, isActive: true });
    } else {
      widget = await NewsletterWidget?.findOneAndUpdate(
        { isActive: true },
        { ...data, updatedAt: new Date() },
        { new: true }
      );
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Newsletter Widget PUT:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 