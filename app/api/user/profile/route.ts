import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";
import { authOptions } from "@/app/lib/auth";


export async function GET() {
  try {
    // Session kontrolü:
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // DB bağlantısı
    await connectDB();

    // session.user.email üzerinden veri çekebilirsiniz
    if (!session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Döndürülecek veriler
    return NextResponse.json({
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
