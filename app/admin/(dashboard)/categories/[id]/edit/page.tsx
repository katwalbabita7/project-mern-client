"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCategoryById, getAllCategories } from "@/api/admin/category.api";
import CategoryForm from "@/app/components/admin/forms/category.form";

const CategoryEditPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<any>(null);
  const [parentOptions, setParentOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, allCategoriesRes] = await Promise.all([
          getCategoryById(id as string),
          getAllCategories(),
        ]);

        const cat = categoryRes.data || categoryRes;
        setCategory(cat);

        // Parent options
        const options = (allCategoriesRes.data || allCategoriesRes)
          .filter((c: any) => c._id !== id)
          .map((c: any) => ({
            label: c.name,
            value: c._id,
          }));

        setParentOptions(options);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center text-sm text-neutral-500">
        Loading category details...
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center text-sm text-red-500 font-semibold">
        Category not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <CategoryForm
        categoryId={category._id}
        parentOptions={parentOptions}
        defaultValues={{
          name: category.name,
          description: category.description || "",
          parentCategory:
            category.parentCategory?._id || category.parentCategory || "",
          isActive: category.isActive !== false ? "true" : "false",
          imageUrl: category.image?.path || category.image?.url || "",
        }}
      />
    </div>
  );
};

export default CategoryEditPage;