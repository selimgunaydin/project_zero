"use client";

import React, { useEffect, useState } from "react";

const AdminEditor = (widgetData: any) => {
  const [htmlContent, setHtmlContent] = useState("");
  const { data, type } = widgetData;
  console.log(widgetData);

  useEffect(() => {
    setHtmlContent(data.data);
  }, [data]);

  const saveData = async () => {
    console.log(htmlContent);
    const response = await fetch(`/api/widgets/${widgetData.data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(htmlContent),
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
