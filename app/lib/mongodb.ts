import mongoose from "mongoose";
import { User } from "../models/User";
import { HeroWidget, StatsWidget, FeatureWidget, TestimonialsWidget, PricingWidget, BlockCarouselWidget, NewsletterWidget, WidgetList } from "../models/widgets";
import { addLoggingToModel } from "./logMiddleware";

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project_zero';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

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
    addLoggingToModel(HeroWidget);
    addLoggingToModel(StatsWidget);
    addLoggingToModel(FeatureWidget);
    addLoggingToModel(TestimonialsWidget);
    addLoggingToModel(PricingWidget);
    addLoggingToModel(BlockCarouselWidget);
    addLoggingToModel(NewsletterWidget);
    addLoggingToModel(WidgetList);
    
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}