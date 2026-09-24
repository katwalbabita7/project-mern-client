"use client";

import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export default function ProductNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
      <h2 className="text-2xl font-bold text-[#091426]">Product Not Found</h2>
      <p className="text-neutral-500">
        The product you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-[#0058BE] hover:bg-secondary-700 text-white font-medium px-4 py-2 rounded-md"
      >
        <LuArrowLeft size={16} /> Back to Products
      </Link>
    </div>
  );
}