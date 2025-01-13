import { connectDB } from "../lib/mongodb";
import { User } from "../models/User";

export const getAllUsers = async () => {
  await connectDB();
  const users = await User.find(
    {},
    "name surname email phone role createdAt updatedAt"
  ).lean();
  return JSON.parse(JSON.stringify(users));
};
