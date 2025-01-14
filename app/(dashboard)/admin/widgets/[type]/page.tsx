import EditWidget from "@/app/components/EditWidget";
import { getWidgetData } from "@/app/controllers/widgets";


export default async function CustomWidgetPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const widgetData = await getWidgetData({ type });
  return (
   <EditWidget type={type} data={widgetData}/>
  );
}
