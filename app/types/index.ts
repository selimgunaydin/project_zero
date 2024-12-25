export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  role: "user" | "admin";
}