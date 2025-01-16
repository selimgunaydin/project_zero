"use server";

import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";
import { logModelOperation } from "@/app/lib/logMiddleware";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
  const { email, password, name, phone, surname, role = "user" } = values;

  if (!email || !password || !name || !phone || !surname) {
    return {
      error: "Please fill all the fields!",
    };
  }

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      await logModelOperation(
        'create',
        'Auth',
        undefined,
        `Kayıt başarısız - Email zaten mevcut: ${email}`
      );
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      phone,
      role,
    });
    await user.save();

    await logModelOperation(
      'create',
      'Auth',
      user._id.toString(),
      `Yeni kullanıcı kaydı: ${email}`
    );

    return {
      success: "User created, you can login now!",
    };
  } catch (error) {
    await logModelOperation(
      'create',
      'Error',
      undefined,
      `Kullanıcı kaydı hatası: ${error}`
    );
    return {
      error: "Registration failed!",
    };
  }
};
