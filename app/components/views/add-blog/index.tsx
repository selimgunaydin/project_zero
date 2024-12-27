"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useGetProfileInfoQuery } from "@/app/store/services/user";

export default function AddBlog() {
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

      e.currentTarget.reset();
    } catch (error) {
      console.error("Blog ekleme hatası:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="p-2 border border-gray-300"
        />
        <input
          type="text"
          placeholder="Content"
          name="content"
          className="p-2 border border-gray-300"
        />
        <input
          type="text"
          placeholder="Tags"
          name="tags"
          className="p-2 border border-gray-300"
        />

        <select name="category" className="p-2 border border-gray-300">
          <option value="">Select Category</option>
          {categories?.map((category: any) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Resim seçme inputu */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 border border-gray-300"
        />

        {/* Seçili görsel önizlemesi */}
        {imagePreview && (
          <div>
            <p>Seçili Görsel Önizlemesi:</p>
            <img
              src={imagePreview}
              alt="Seçili görsel önizlemesi"
              className="w-32 h-32 object-cover"
            />
          </div>
        )}

        <button type="submit" className="p-2 bg-blue-500 text-white">
          Add Blog
        </button>
      </form>
    </div>
  );
}
