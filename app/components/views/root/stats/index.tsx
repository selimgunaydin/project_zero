import StatsWidget from "@/app/widgets/stats";
import { connectDB } from "@/app/lib/mongodb";
import StatsWidgetData from "@/app/models/Stats";

export default async function Stats() {
  await connectDB();

  const data: any = await StatsWidgetData.findOne();

  return <StatsWidget data={data} />;
}
