import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWidget extends Document {
  _id: Types.ObjectId;
  name: string;
  type: string;
  isActive: boolean;
  order: number;
  data: Record<string, any>;
  styles: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const WidgetSchema = new Schema<IWidget>({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  data: {
    type: Schema.Types.Mixed,
    default: {}
  },
  styles: {
    type: Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

export const Widget = mongoose.models?.Widget || mongoose.model<IWidget>('Widget', WidgetSchema); 