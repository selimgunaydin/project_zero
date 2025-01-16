'use client';

import MediaLibrary from "@/app/components/MediaLibrary";



export default function MediaPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Medya Kütüphanesi</h1>
      <MediaLibrary showSelect={false} />
    </div>
  );
}