import { connectDB } from '@/app/lib/mongodb';
import { WidgetList } from '@/app/models/widgets';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const widgets = await WidgetList.find({});
    return NextResponse.json(widgets);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const widget = await WidgetList.create(body);
    return NextResponse.json(widget);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
} 