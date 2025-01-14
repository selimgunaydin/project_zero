'use client'

import EditableWidget from "@/app/components/views/dashboard/EditableWidget";
import StatsWidget from "@/app/widgets/stats";

export default function StatsAdminPage() {
  return (
    <div>
      <EditableWidget
        apiEndpoint="stats"
        widgetComponent={StatsWidget}
        title="Stats"
      />
    </div>
  );
}
