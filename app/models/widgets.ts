import mongoose from "mongoose";

// Widget List Schema
const widgetListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Models
const models = mongoose.models;
const WidgetList =
  models.WidgetList || mongoose.model("WidgetList", widgetListSchema);

export { WidgetList };
