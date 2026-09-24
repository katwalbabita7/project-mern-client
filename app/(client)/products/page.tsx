"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/api/client/product.api";
import { getClientCategories } from "@/api/client/category.api";
import { getClientBrands } from "@/api/client/brand.api";
import Pagination from "@/app/components/common/table/pagination";

import ProductsHeader from "@/app/components/client/products/ProductsHeader";
import ProductsFilters from "@/app/components/client/products/ProductsFilters";
import ProductsGrid from "@/app/components/client/products/ProductsGrid";

import {
  ProductsListResponse,
  CategoriesResponse,
  BrandsResponse,
  ProductListItem,
  Category,
  Brand,
  ProductsEmptyProps,
} from "@/app/types/client/product";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || ""
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
    setSelectedBrand(searchParams.get("brand") || "");
    if (searchParams.get("search")) {
      setSearchTerm(searchParams.get("search") || "");
    }
  }, [searchParams]);

  const { data: categoriesData } = useQuery<CategoriesResponse>({
    queryKey: ["client-categories-all"],
    queryFn: () => getClientCategories({ limit: 50 }),
  });

  const { data: brandsData } = useQuery<BrandsResponse>({
    queryKey: ["client-brands-all"],
    queryFn: () => getClientBrands({ limit: 50 }),
  });

  const { data: productsData, isLoading } = useQuery<ProductsListResponse>({
    queryKey: [
      "client-products",
      selectedCategory,
      selectedBrand,
      searchTerm,
      currentPage,
    ],
    queryFn: () =>
      getAllProducts({
        category: selectedCategory || undefined,
        brand: selectedBrand || undefined,
        search: searchTerm || undefined,
        page: currentPage,
        limit: 12,
      }),
  });

  const products: ProductListItem[] = productsData?.data || [];
  const meta = productsData?.meta || {};
  const totalPages = meta.totalPages || 1;
  const totalProducts = meta.total || products.length;

  const categories: Category[] = categoriesData?.data || [];
  const brands: Brand[] = brandsData?.data || [];

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedBrand("");
    setCurrentPage(1);
    router.push("/products");
  };

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    setCurrentPage(1);
  };

  const handleBrandChange = (id: string) => {
    setSelectedBrand(id);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <ProductsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        productsCount={products.length}
        totalProducts={totalProducts}
        onSearchSubmit={handleSearchSubmit}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <ProductsFilters
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          searchTerm={searchTerm}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onClearFilters={handleClearFilters}
        />

        <main className="lg:col-span-3 space-y-8">
          <ProductsGrid
            products={products}
            isLoading={isLoading}
            onClearFilters={handleClearFilters}
          />

          {totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={totalProducts}
                itemsPerPage={12}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-neutral-500">
          Loading catalog...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}