import { connectDB } from "../lib/mongodb";
import { WidgetList } from "../models/widgets";
import WidgetRenderer from "../components/widget-renderer";

async function getActiveWidgets() {
  await connectDB();
  const widgets = await WidgetList.find({ isActive: true }).sort({ order: 1 });
  return JSON.parse(JSON.stringify(widgets));
}
export default async function Home() {
  const widgets = await getActiveWidgets();
  return (
    <main>
      <WidgetRenderer widgets={widgets} />
    </main>
  );
}
