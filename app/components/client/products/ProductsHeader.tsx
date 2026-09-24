"use client";

import { ProductsHeaderProps } from "@/app/types/client/product";
import { LuSearch, LuX } from "react-icons/lu";

export default function ProductsHeader({
  searchTerm,
  setSearchTerm,
  productsCount,
  totalProducts,
  onSearchSubmit,
}: ProductsHeaderProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#091426]">
          Explore All Products
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Showing {productsCount} of {totalProducts} items available
        </p>
      </div>

      <form onSubmit={onSearchSubmit} className="relative w-full md:w-80">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products by name..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0058BE] focus:border-transparent bg-neutral-50"
        />
        <LuSearch className="absolute left-3 top-2.5 text-neutral-400" size={18} />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
          >
            <LuX size={16} />
          </button>
        )}
      </form>
    </div>
  );
}