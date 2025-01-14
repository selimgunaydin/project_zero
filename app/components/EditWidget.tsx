"use client";

import { Editor } from "@monaco-editor/react";
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

      <Editor
        height="400px"
        defaultLanguage="html"
        className="mb-4"
        value={htmlContent}
        onChange={(value) => setHtmlContent(value || "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          lineNumbers: "on",
          formatOnPaste: true,
          formatOnType: true,
        }}
      />

      <Button
        onPress={saveData}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Kaydet
      </Button>
    </div>
  );
};

export default AdminEditor;
