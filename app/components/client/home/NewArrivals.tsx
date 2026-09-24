"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { LuArrowRight } from "react-icons/lu";
import { getNewArrivals } from "@/api/client/product.api";
import { ProductCard } from "@/app/components/client/products/ProductCard";

export default function NewArrivals() {
  const { data: newArrivalsData, isLoading } = useQuery({
    queryKey: ["new-arrivals"],
    queryFn: () => getNewArrivals(8),
  });

  const newArrivals = newArrivalsData?.data || [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-end justify-between border-b border-neutral-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#007472]">
            Just In
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#091426]">New Arrivals</h2>
        </div>
        <Link
          href="/products"
          className="text-sm font-semibold text-secondary-600 hover:text-secondary-700 flex items-center gap-1"
        >
          View More <LuArrowRight size={16} />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg h-72 animate-pulse border border-neutral-200"
            />
          ))}
        </div>
      ) : newArrivals.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-lg border border-neutral-200 text-neutral-500 text-sm">
          No New products available
        </div>
      )}
    </section>
  );
}