import mongoose from "mongoose";
import { User } from "../models/User";
import { addLoggingToModel } from "./logMiddleware";
import { Widget } from "../models/Widget";

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project_zero';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    
    // Tüm modellere log sistemini ekle
    addLoggingToModel(User);

    addLoggingToModel(Widget);
    
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}