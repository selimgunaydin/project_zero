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

export interface CategoryDocument {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}