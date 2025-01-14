"use client";

import React, { useState } from "react";

const AdminEditor = () => {
  const [htmlContent, setHtmlContent] = useState("");

  const saveData = async () => {
    const widgetData = {
      name: "about-us",
      type: "about-us",
      order: "10",
      data: htmlContent,
    };
    const response = await fetch("/api/widgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(widgetData),
    });

    if (response.ok) {
      alert("Veri başarıyla kaydedildi!");
    } else {
      alert("Bir hata oluştu!");
    }
  };

  return (
    <div className="p-4">
      <textarea
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        className="w-full h-40 border p-2 mb-4"
        placeholder="HTML içeriğini buraya yazın"
      />

      <div
        className="border p-4 mb-4 relative overflow-hidden"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <button
        onClick={saveData}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Kaydet
      </button>
    </div>
  );
};

export default AdminEditor;
