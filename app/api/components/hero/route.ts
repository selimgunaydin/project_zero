// app/api/hero/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { HeroWidget } from '@/app/models/widgets';
import { heroData } from '@/app/components/widgets/hero/mockData';

export async function GET() {
  try {
    await connectDB();
    
    let widget = await HeroWidget.findOne({ isActive: true });
    
    if (!widget) {
      widget = await HeroWidget.create(heroData);
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Hero Widget GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    
    const data = await request.json();
    let widget = await HeroWidget.findOne({ isActive: true });
    
    if (!widget) {
      widget = await HeroWidget.create({ ...data, isActive: true });
    } else {
      widget = await HeroWidget.findOneAndUpdate(
        { isActive: true },
        { ...data, updatedAt: new Date() },
        { new: true }
      );
    }
    
    return NextResponse.json(widget);
  } catch (error) {
    console.error("Error in Hero Widget PUT:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}