"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/admin/product.api";
import { getAllCategories } from "@/api/admin/category.api";
import { getBrands } from "@/api/admin/brand.api";
import ProductForm from "@/app/components/admin/forms/product.form";

const ProductEditPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories({ limit: 100 }),
  });

  const { data: brandsData } = useQuery({
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id as string);
        setProduct(data.data || data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const isDataLoading = loading || !categoriesData || !brandsData;

  if (isDataLoading) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center text-sm text-neutral-500">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center text-sm text-red-500 font-semibold">
        Product not found
      </div>
    );
  }

  const categoryId =
    typeof product.category === "object" ? product.category?._id : product.category;
  const brandId =
    typeof product.brand === "object" ? product.brand?._id : product.brand;

  const mainImageUrl =
    product.image?.path ||
    product.image?.url ||
    (product.images && (product.images[0]?.path || product.images[0]?.url));

  const additionalImages =
    product.images && Array.isArray(product.images)
      ? product.images.filter((img: any) => {
          const path = img?.path || img?.url;
          return path && path !== mainImageUrl;
        })
      : [];

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <ProductForm
        productId={product._id}
        categoryOptions={categoryOptions}
        brandOptions={brandOptions}
        defaultValues={{
          name: product.name,
          description: product.description,
          price: product.price,
          discountPrice: product.discountPrice,
          stock: product.stock,
          sku: product.sku,
          brand: brandId,
          category: categoryId,
          isActive: product.isActive !== false ? "true" : "false",
          tags: product.tags,
          imageUrl: mainImageUrl,
          images: additionalImages,
        }}
      />
    </div>
  );
};

export default ProductEditPage;