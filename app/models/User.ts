import mongoose, { model, Schema } from "mongoose";
import { UserDocument } from "../types";

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.models?.db_user || model<UserDocument>("db_user", UserSchema);
