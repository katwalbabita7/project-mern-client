
"use client";

import { ProductsGridProps } from "@/app/types/client/product";
import ProductsEmpty from "./ProductsEmpty";
import { ProductCard } from "./ProductCard";

export default function ProductsGrid({
  products,
  isLoading,
  onClearFilters,
}: ProductsGridProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-neutral-200 h-96 animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return <ProductsEmpty onClearFilters={onClearFilters} />;
  }

  // Products list
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}