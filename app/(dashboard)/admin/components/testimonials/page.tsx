'use client'

import EditableWidget from "@/app/components/views/dashboard/EditableWidget";
import TestimonialsWidget from "@/app/components/widgets/testimonials";

export default function TestimonialsAdminPage() {
  return (
    <EditableWidget
      apiEndpoint="testimonials"
      widgetComponent={TestimonialsWidget}
      title="Testimonials"
    />
  );
} 