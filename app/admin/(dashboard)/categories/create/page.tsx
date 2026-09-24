"use client";

import { useEffect, useState } from "react";
import CategoryForm from "@/app/components/admin/forms/category.form";
import { getAllCategories } from "@/api/admin/category.api";

export default function CreateCategoryPage() {
  const [parentOptions, setParentOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const data = await getAllCategories({ limit: 100 });
        const list = data.data || data.categories || data;

        setParentOptions(
          list.map((cat: any) => ({
            label: cat.name,
            value: cat._id,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParents();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center text-sm text-neutral-500">
        Loading category form...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <CategoryForm parentOptions={parentOptions} />
    </div>
  );
}