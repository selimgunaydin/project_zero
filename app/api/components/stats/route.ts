import { connectDB } from "@/app/lib/mongodb";
import StatsWidgetData from "@/app/models/Stats";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const statsData = await StatsWidgetData.findOne();
    return NextResponse.json(statsData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    await connectDB();
    const data = await req.json();
    const statsData = await StatsWidgetData.findOneAndUpdate({}, data, { new: true, upsert: true });
    return NextResponse.json(statsData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
