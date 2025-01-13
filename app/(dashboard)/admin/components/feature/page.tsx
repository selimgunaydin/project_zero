'use client'

import EditableWidget from "@/app/components/views/dashboard/EditableWidget";
import FeatureWidget from "@/app/components/widgets/feature";

export default function FeatureAdminPage() {
  return (
    <EditableWidget
      apiEndpoint="/api/components/feature"
      widgetComponent={FeatureWidget}
      title="Feature"
    />
  );
} 