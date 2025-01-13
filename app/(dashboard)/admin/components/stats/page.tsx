'use client'

import EditableWidget from "@/app/components/views/dashboard/EditableWidget";
import StatsWidget from "@/app/components/widgets/stats";

export default function StatsAdminPage() {
  return (
    <div>
      <EditableWidget
        apiEndpoint="/api/components/stats"
        widgetComponent={StatsWidget}
        title="Hero"
      />
    </div>
  );
}
