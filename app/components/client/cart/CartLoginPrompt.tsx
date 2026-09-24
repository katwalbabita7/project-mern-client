"use client";

import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";

export default function CartLoginPrompt() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 bg-secondary-50 text-secondary-600 rounded-full flex items-center justify-center mx-auto">
        <LuShoppingCart size={36} />
      </div>
      <h2 className="text-2xl font-bold text-[#091426]">Your Cart is Waiting</h2>
      <p className="text-neutral-500 max-w-md mx-auto">
        Please log in to view the items in your shopping cart and complete your checkout.
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