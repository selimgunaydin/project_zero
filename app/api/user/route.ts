import { getAllUsers } from "@/app/controllers/users";
import { connectDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching users" },
      { status: 500 }
    );
  }
}
