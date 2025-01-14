import { connectDB } from "../lib/mongodb";
import { WidgetList } from "../models/widgets";

export const getWidgetData = async ({ type }: { type: string }) => {
  await connectDB();
  const widgetData = await WidgetList.find({ type }).lean();
  return JSON.parse(JSON.stringify(widgetData[0]));
};
