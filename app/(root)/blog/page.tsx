import { getBlogs } from "@/app/actions/blog/get-blogs";
import BlogCard from "@/app/components/blocks/BlogCard";
import React from "react";

export default async function Blog() {
  const blogs = await getBlogs().then((res) => res.success);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl pt-4 mb-1 font-bold">Son Blog Yazıları</h1>
        <p className="text-sm text-gray-700">
          Blog yazılarımızı okuyarak güncel kalabilirsiniz.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {blogs?.map((blog: any, index) => (
          <div key={index} className="col-span-4">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}
