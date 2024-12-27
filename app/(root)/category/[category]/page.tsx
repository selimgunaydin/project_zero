import { notFound } from "next/navigation";
import { getCategories } from "@/app/actions/category/get-categories";
import { getBlogByCategory } from "@/app/actions/blog/get-blog-by-category";
import BlogCard from "@/app/components/blocks/BlogCard";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = await getCategories().then((res: any) =>
    res?.success.find((data: any) => data.name.toLowerCase() === category)
  );

  const blogData = await getBlogByCategory(categoryData._id).then(
    (res: any) => res?.success
  );

  if (!categoryData) {
    notFound();
  }

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        {blogData?.map((blog: any, index: any) => (
          <div className="col-span-4" key={index}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}
