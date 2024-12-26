/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { connectDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/User";
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

    return {
      success: "User created, you can login now!",
    };
  } catch {}
};
