import { notFound } from "next/navigation";
import { getCategories } from "@/app/actions/category/get-categories";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categories = await getCategories().then((res) => res?.success);
  const isValidCategory = categories?.some(
    (cat) => cat.name.toLowerCase() === params.category.toLowerCase()
  );

  if (!isValidCategory) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl">{params.category}</h1>
      <p>{params.category} ile ilgili içerik burada gösterilecek.</p>
    </div>
  );
}
