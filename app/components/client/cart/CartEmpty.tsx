"use client";

import Link from "next/link";
import { LuShoppingCart, LuArrowLeft } from "react-icons/lu";

export default function CartEmpty() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto">
        <LuShoppingCart size={36} />
      </div>
      <h2 className="text-2xl font-bold text-[#091426]">Your Cart is Empty</h2>
      <p className="text-neutral-500 max-w-md mx-auto">
        Looks like you haven&apos;t added any items to your cart yet. Discover great products now!
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-[#091426] hover:bg-[#0058BE] text-white font-semibold px-6 py-2.5 rounded-md shadow-sm transition-colors"
      >
        <LuArrowLeft size={16} /> Start Shopping
      </Link>
    </div>
  );
}