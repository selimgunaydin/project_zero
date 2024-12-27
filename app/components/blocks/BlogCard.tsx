import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogCard({ blog }: { blog: any }) {
  return (
    <div key={blog._id}>
      <div className="bg-white border rounded">
        <Link href={"#"} className="relative">
          <Image
            width={300}
            height={200}
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-t"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start rounded-t">
            <h2 className="text-lg font-semibold text-white px-4 py-2">
              {blog.title}
            </h2>
          </div>
        </Link>

        <div className="flex flex-col w-full px-4 py-4">
          <div className="mb-1">
            <p className="text-sm text-gray-600 mb-1">
              {blog.content.length > 100
                ? `${blog.content.slice(0, 100)}...`
                : blog.content}
            </p>

            <p className="text-xs">
              {blog.tags.map((tag: any, index: any) => (
                <span key={index} className="mr-2">
                  #{tag}
                </span>
              ))}
            </p>
          </div>
          <div className="w-full flex justify-between items-end">
            <p className="text-sm">
              Yazar: {`${blog.author.name} ${blog.author.surname}`}
            </p>
            <Link className="text-sm underline" href={`#`}>
              Devamını oku..
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
