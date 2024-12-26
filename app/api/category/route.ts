//Geçici olarak oluşturuldu. Actions klasörüne taşınacak.

import { Category } from "@/app/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
  try{
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { name, description } = body;
    if (!name || !description) {
      return NextResponse.json({ error: "Please fill all the fields!" }, { status: 400 });
    }
    const categoryFound = await Category.findOne({ name });
    if (categoryFound) {
      return NextResponse.json({ error: "Category already exists!" }, { status: 400 });
    }
    const category = new Category({
      name,
      description,
    });
    await category.save();
    return NextResponse.json({ success: "Category created!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}