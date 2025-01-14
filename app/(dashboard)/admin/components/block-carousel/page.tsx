'use client'

import EditableWidget from "@/app/components/views/dashboard/EditableWidget";
import BlockCarouselWidget from "@/app/components/widgets/block-carousel";

export default function BlockCarouselAdminPage() {
  return (
    <EditableWidget
      apiEndpoint="block-carousel"
      widgetComponent={BlockCarouselWidget}
      title="Block Carousel"
    />
  );
} 