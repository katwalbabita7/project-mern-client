"use client";

import Link from "next/link";
import { LuHeart, LuArrowLeft } from "react-icons/lu";

interface WishlistEmptyProps {
  isAuthenticated: boolean;
}

export default function WishlistEmpty({ isAuthenticated }: WishlistEmptyProps) {
  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-tertiary-50 text-tertiary-600 rounded-full flex items-center justify-center mx-auto">
          <LuHeart size={36} />
        </div>
        <h2 className="text-2xl font-bold text-[#091426]">Your Wishlist is Waiting</h2>
        <p className="text-neutral-500 max-w-md mx-auto">
          Save items you love to your wishlist. Please log in to see your saved items.
        </p>
        <Link
          href="/login"
          className="inline-block bg-[#0058BE] hover:bg-secondary-700 text-white font-semibold px-6 py-2.5 rounded-md shadow-sm transition-colors"
        >
          Sign In to Your Account
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto">
        <LuHeart size={36} />
      </div>
      <h2 className="text-2xl font-bold text-[#091426]">Your Wishlist is Empty</h2>
      <p className="text-neutral-500 max-w-md mx-auto">
        You haven&apos;t saved any items yet. Explore our products and tap the heart to save your favorites!
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-[#091426] hover:bg-[#0058BE] text-white font-semibold px-6 py-2.5 rounded-md shadow-sm transition-colors"
      >
        <LuArrowLeft size={16} /> Explore Products
      </Link>
    </div>
  );
}