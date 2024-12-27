import { getCategories } from "@/app/actions/category/get-categories";
import Link from "next/link";
import React from "react";

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categories = await getCategories().then((res: any) => res?.success);

  const categoryData = categories.find(
    (data: any) => data.name.toLowerCase() === category
  );
  return (
    <div className="w-full mb-12">
      <div className="mb-4">
        <h1 className="text-2xl pt-4 mb-1 font-bold">{categoryData.name}</h1>
        <p className="text-sm text-gray-700">{categoryData.description}</p>
      </div>
      <div className="grid grid-cols-6 gap-4 relative">
        <div className="col-span-5">{children}</div>
        <div className="cols-span-1 border rounded p-4 h-screen">
          <h2 className="text-lg font-bold mb-1">Kategoriler</h2>
          {categories.map((category: any) => (
            <div key={category._id} className="bg-white mb-2">
              <Link
                className="font-semibold underline text-sm"
                href={`/category/${category.name.toLowerCase()}`}
              >
                {category.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
