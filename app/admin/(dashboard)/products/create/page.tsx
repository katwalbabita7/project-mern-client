"use client";

import { useQuery } from "@tanstack/react-query";
import ProductForm from "@/app/components/admin/forms/product.form";
import { getCategories } from "@/api/admin/category.api";
import { getBrands } from "@/api/admin/brand.api";

export default function CreateProductPage() {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery<any>({
    queryKey: ["categories"],
    queryFn: () => getCategories({ limit: 100 }),
  });

  const { data: brandsData, isLoading: isBrandsLoading } = useQuery<any>({
    queryKey: ["brands"],
    queryFn: () => getBrands({ limit: 100 }),
  });

  const categoryOptions =
    categoriesData?.data?.map((cat: any) => ({
      label: cat.name,
      value: cat._id || cat.id,
    })) || [];

  const brandOptions =
    brandsData?.data?.map((brand: any) => ({
      label: brand.name,
      value: brand._id || brand.id,
    })) || [];

  if (isCategoriesLoading || isBrandsLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex items-center justify-center p-12 text-neutral-500 text-sm">
          Loading product form...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <ProductForm
        categoryOptions={categoryOptions}
        brandOptions={brandOptions}
      />
    </div>
  );
}