"use server";

import { connectDB } from "@/app/lib/mongodb";
import { Category } from "@/app/models/Category";

export const getCategories = async () => {
  try {
    await connectDB();
    const categories = await Category.find();
    return {
      success: categories,
    };
  } catch {}
};
