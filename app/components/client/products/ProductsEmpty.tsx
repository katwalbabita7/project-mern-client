"use client";

import { ProductsEmptyProps } from "@/app/types/client/product";
import { LuSearch } from "react-icons/lu";

export default function ProductsEmpty({ onClearFilters }: ProductsEmptyProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center">
        <LuSearch size={32} />
      </div>
      <h3 className="font-bold text-lg text-[#091426]">No Products Found</h3>
      <p className="text-sm text-neutral-500 max-w-md mx-auto">
        We couldn&apos;t find any products matching your selected filters or
        search query.
      </p>
      <button
        onClick={onClearFilters}
        className="bg-[#0058BE] hover:bg-secondary-700 text-white font-medium px-4 py-2 rounded-md text-sm transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}