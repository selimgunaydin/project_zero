"use client";

import { Button, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const AdminEditor = (widgetData: any) => {
  const [htmlContent, setHtmlContent] = useState("");
  const { data, type } = widgetData;

  useEffect(() => {
    setHtmlContent(data.data);
  }, [data]);

  const saveData = async () => {
    const response = await fetch(`/api/widgets/${widgetData.data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: htmlContent,
      }),
    });

    if (response.ok) {
      alert("Veri başarıyla kaydedildi!");
    } else {
      alert("Bir hata oluştu!");
    }
  };
  console.log(data);

  const handleDeleteWidget = async () => {
    const response = await fetch(`/api/widgets/${widgetData.data._id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Widget başarıyla silindi!");
    } else {
      alert("Bir hata oluştu!");
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-between w-full items-center mb-4">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <Button onPress={handleDeleteWidget} className="bg-red-600 text-white">
          Sil
        </Button>
      </div>
      <p className="mb-2 text-sm font-semibold">Preview</p>
      <div
        className="border p-4 mb-4 relative overflow-hidden"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <p className="mb-2 text-sm font-semibold">HTML Input</p>
      <Textarea
        minRows={40}
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        className="mb-4"
        placeholder="HTML içeriğini buraya yazın"
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
