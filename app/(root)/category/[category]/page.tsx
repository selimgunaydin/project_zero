import { notFound } from "next/navigation";
import { getCategories } from "@/app/actions/category/get-categories";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = await getCategories().then((res: any) =>
    res?.success.find((data: any) => data.name.toLowerCase() === category)
  );

  if (!categoryData) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl border-b py-4 mb-4 font-bold">
        {categoryData.name}
      </h1>
      <p>{categoryData.description}</p>
    </div>
  );
}
