import mongoose, { Schema, Document, Types, Model } from 'mongoose';

interface ILogDocument extends Document {
  action: 'create' | 'update' | 'delete';
  documentId?: string;
  details: string;
  user?: string;
  createdAt: Date;
}

export interface ILog extends ILogDocument {
  _id: Types.ObjectId;
}

const LogSchema = new Schema<ILogDocument>({
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete']
  },
  documentId: {
    type: String
  },
  details: {
    type: String,
    required: true
  },
  user: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Log: Model<ILogDocument> = mongoose.models?.db_logs || mongoose.model<ILogDocument>('db_logs', LogSchema); 