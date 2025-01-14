"use client";

import EditableWidget from "@/app/components/views/dashboard/EditableWidget";
import HeroWidget from "@/app/widgets/hero";

export default function HeroAdminPage() {
  return (
    <EditableWidget
      apiEndpoint="hero"
      widgetComponent={HeroWidget}
      title="Hero"
    />
  );
}
