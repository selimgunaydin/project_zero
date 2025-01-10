// app/api/hero/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import Hero from '@/app/models/Hero';


export async function GET() {
  await connectDB();

  try {
    const hero = await Hero.findOne();
    if (!hero) {
      return NextResponse.json({ message: 'No hero data found' }, { status: 404 });
    }
    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return NextResponse.json({ message: 'An error occurred while fetching hero data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const data = await req.json();
    const heroData = await Hero.findOneAndUpdate({}, data, { new: true, upsert: true });
    return NextResponse.json(heroData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update hero data." }, { status: 500 });
  }
}