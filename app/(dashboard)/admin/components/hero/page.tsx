"use client";

import { FormModal } from "@/app/components/blocks/FormModal";
import EditableWidget from "@/app/components/views/dashboard/EditableWidget";
import HeroWidget from "@/app/components/widgets/hero";
import { Alert } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function HeroAdminPage() {
  return (
    <EditableWidget
      apiEndpoint="/api/components/hero"
      widgetComponent={HeroWidget}
      title="Hero"
    />
  );
}
