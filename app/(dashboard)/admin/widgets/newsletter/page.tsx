'use client'

import EditableWidget from "@/app/components/views/dashboard/EditableWidget";
import NewsletterWidget from "@/app/widgets/newsletter";

export default function NewsletterAdminPage() {
  return (
    <EditableWidget
      apiEndpoint="newsletter"
      widgetComponent={NewsletterWidget}
      title="Newsletter"
    />
  );
} 