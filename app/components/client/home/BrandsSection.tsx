"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getClientBrands } from "@/api/client/brand.api";

export default function BrandsSection() {
  const { data: brandsData } = useQuery({
    queryKey: ["client-brands"],
    queryFn: () => getClientBrands({ limit: 12 }),
  });

  const brands = brandsData?.data || [];

  if (brands.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="text-center space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Our Partners
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#091426]">Featured Brands</h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 p-6 bg-white rounded-xl border border-neutral-200 shadow-xs">
        {brands.map((brand: any) => (
          <Link
            key={brand._id}
            href={`/products?brand=${brand._id}`}
            className="flex items-center gap-3 px-4 py-2 rounded-lg border border-neutral-100 hover:border-secondary-300 hover:bg-neutral-50 transition-all"
            title={brand.name}
          >
            {brand.logo?.path && (
              <div className="w-8 h-8 rounded-full overflow-hidden relative">
                <Image
                  src={brand.logo.path}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="font-semibold text-sm text-neutral-800">{brand.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}