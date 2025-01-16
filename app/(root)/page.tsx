import { Widget, IWidget } from '@/app/models/Widget';

import { connectDB } from '@/app/lib/mongodb';
import WidgetRenderer from '../components/WidgetRenderer';

async function getActiveWidgets() {
  await connectDB();
  const widgets = await Widget.find({ isActive: true }).sort({ order: 1 });
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
