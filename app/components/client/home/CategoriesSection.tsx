"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { LuArrowRight } from "react-icons/lu";
import { getClientCategories } from "@/api/client/category.api";

export default function CategoriesSection() {
  const { data: categoriesData } = useQuery({
    queryKey: ["client-categories"],
    queryFn: () => getClientCategories({ limit: 8 }),
  });

  const categories = categoriesData?.data || [];

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-end justify-between border-b border-neutral-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-secondary-600">
            Browse Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#091426]">Shop by Category</h2>
        </div>
        <Link
          href="/products"
          className="text-sm font-semibold text-secondary-600 hover:text-secondary-700 flex items-center gap-1"
        >
          All Products <LuArrowRight size={16} />
        </Link>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category: any) => (
            <Link
              key={category._id}
              href={`/products?category=${category._id}`}
              className="group bg-white rounded-lg border border-neutral-200 p-4 text-center hover:border-secondary-500 hover:shadow-md transition-all flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden border border-neutral-200 group-hover:scale-105 transition-transform">
                {category.image?.path ? (
                  <Image
                    src={category.image.path}
                    alt={category.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-neutral-500">
                    {category.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="font-semibold text-xs sm:text-sm text-[#091426] group-hover:text-secondary-600 transition-colors line-clamp-1">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-lg border border-neutral-200 text-neutral-500 text-sm">
          No categories available
        </div>
      )}
    </section>
  );
}