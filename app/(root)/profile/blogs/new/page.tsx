"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useGetProfileInfoQuery } from "@/app/store/services/user";
import Image from "next/image";

export default function NewBlog() {
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const { data: userData } = useGetProfileInfoQuery();

  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const res = await fetch("/api/category");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Kategori çekme hatası:", error);
      }
    };
    getCategoriesData();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error("File reading failed"));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const content = formData.get("content");
    const tags = formData.get("tags");
    const category = formData.get("category");
    const author = userData?.id;
    const tagsArray = tags?.toString().split(",");
    try {
      let base64Image = "";
      if (selectedFile) {
        base64Image = await readFileAsBase64(selectedFile);
      }

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          tags: tagsArray,
          category,
          author,
          image: base64Image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add blog");
      }

      const result = await response.json();
      console.log("Blog kaydı başarılı:", result);
    } catch (error) {
      console.error("Blog ekleme hatası:", error);
    }
  };

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Yeni Blog Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 font-medium mb-2">Başlık</label>
          <input
            type="text"
            placeholder="Başlık"
            name="title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">İçerik</label>
          <textarea
            placeholder="İçerik"
            name="content"
            className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Etiketler
          </label>
          <input
            type="text"
            placeholder="Etiketler (virgülle ayırın)"
            name="tags"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Kategori
          </label>
          <select
            name="category"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Kategori Seç</option>
            {categories?.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">Görsel</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {imagePreview && (
          <div className="mt-4">
            <p className="text-gray-600 mb-2">Seçili Görsel Önizlemesi:</p>
            <Image
              width={128}
              height={128}

              src={imagePreview}
              alt="Seçili görsel önizlemesi"
              className="w-32 h-32 object-cover rounded-md shadow-md"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Blog Ekle
        </button>
      </form>
    </div>
  );
}
