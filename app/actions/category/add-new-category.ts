import { connectDB } from "@/app/lib/mongodb";
import { Category } from "@/app/models/Category";

export const addNewCategory = async (values: any) => {
  try {
    await connectDB();
    const { name, description } = values;
    if (!name || !description) {
      return {
        error: "Please fill all the fields!",
      };
    }
    const categoryFound = await Category.findOne({
      name,
    });

    if (categoryFound) {
      return {
        error: "Category already exists!",
      };
    }

    const category = new Category({
      name,
      description,
    });

    await category.save();

    return {
      success: "Category created!",
    };
  } catch {}
};
