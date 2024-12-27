"use client";

import BlogCard from "@/app/components/blocks/BlogCard";
import { useGetProfileInfoQuery } from "@/app/store/services/user";
import React, { useEffect, useState } from "react";

export default function Blogs() {
  const { data } = useGetProfileInfoQuery();
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    if (data?.id) {
      const fetchData = async () => {
        const result = await fetch(`/api/blog/author/${data.id}`).then((res) =>
          res.json()
        );
        setBlogData(result.blogs);
      };
      fetchData();
    }
  }, [data]);
  return (
    <div className="grid grid-cols-12 gap-4">
      {blogData.map((blog, index) => (
        <div key={index} className="col-span-4">
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
}
