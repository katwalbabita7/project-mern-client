"use client";

import { LuFilter, LuRotateCcw } from "react-icons/lu";
import { ProductsFiltersProps } from "@/app/types/client/product";

export default function ProductsFilters({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  searchTerm,
  onCategoryChange,
  onBrandChange,
  onClearFilters,
}: ProductsFiltersProps) {
  const hasFilters = Boolean(selectedCategory || selectedBrand || searchTerm);

  return (
    <aside className="lg:col-span-1 space-y-6">
      <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
          <span className="font-bold text-sm text-[#091426] flex items-center gap-2">
            <LuFilter size={16} className="text-[#0058BE]" /> Filters
          </span>
          {hasFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs font-semibold text-secondary-600 hover:text-secondary-700 flex items-center gap-1 cursor-pointer"
            >
              <LuRotateCcw size={12} /> Reset
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-neutral-500">
            Categories
          </h4>
          <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
            <button
              onClick={() => onCategoryChange("")}
              className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                !selectedCategory
                  ? "bg-[#091426] text-white font-medium"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => onCategoryChange(cat._id)}
                className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  selectedCategory === cat._id
                    ? "bg-[#0058BE] text-white font-medium"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="space-y-3 border-t border-neutral-100 pt-4">
          <h4 className="font-semibold text-xs uppercase tracking-wider text-neutral-500">
            Brands
          </h4>
          <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
            <button
              onClick={() => onBrandChange("")}
              className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                !selectedBrand
                  ? "bg-[#091426] text-white font-medium"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              All Brands
            </button>
            {brands.map((b) => (
              <button
                key={b._id}
                onClick={() => onBrandChange(b._id)}
                className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors cursor-pointer ${
                  selectedBrand === b._id
                    ? "bg-[#007472] text-white font-medium"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}