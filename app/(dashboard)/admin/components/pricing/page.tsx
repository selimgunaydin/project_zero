'use client'

import EditableWidget from "@/app/components/views/dashboard/EditableWidget";
import PricingWidget from "@/app/components/widgets/pricing";

export default function PricingAdminPage() {
  return (
    <EditableWidget
      apiEndpoint="pricing"
      widgetComponent={PricingWidget}
      title="Pricing"
    />
  );
} 