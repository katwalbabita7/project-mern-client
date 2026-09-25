
"use client";

import {
  LuHeart,
  LuShoppingCart,
  LuCheck,
  LuTruck,
  LuShieldCheck,
  LuRotateCcw,
  LuZap,
} from "react-icons/lu";
import { ProductPurchaseSectionProps } from "@/app/types/client/product";

export default function ProductPurchaseSection({
  product,
  quantity,
  setQuantity,
  totalPrice,
  totalRealPrice,
  totalSavings,
  hasDiscount,
  added,
  isAddingToCart,
  isAddingToWishlist,
  onAddToCart,
  onWishlist,
  onBuyNow,           
  isBuyingNow,        
}: ProductPurchaseSectionProps & {
  onBuyNow?: () => void;
  isBuyingNow?: boolean;
}) {
  return (
    <div className="space-y-5 pt-6 border-t border-neutral-200">
      {/* Quantity */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-[#091426]">Quantity:</span>
          <div className="flex items-center border border-neutral-300 rounded-md overflow-hidden bg-neutral-50">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1.5 text-neutral-700 hover:bg-neutral-200 font-bold transition-colors cursor-pointer"
            >
              -
            </button>
            <span className="px-4 py-1.5 text-sm font-semibold text-neutral-900 min-w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity((prev) =>
                  product.stock ? Math.min(product.stock, prev + 1) : prev + 1
                )
              }
              className="px-3 py-1.5 text-neutral-700 hover:bg-neutral-200 font-bold transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {product.stock > 0 && (
          <span className="text-xs text-neutral-500 font-medium">
            {product.stock} available in stock
          </span>
        )}
      </div>

      {/* Total breakdown */}
      <div className="p-4 rounded-xl bg-linear-to-r from-blue-50/60 via-slate-50/80 to-emerald-50/50 border border-blue-100 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
            Total Payable Amount ({quantity} {quantity > 1 ? "items" : "item"}):
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0058BE]">
              Rs. {totalPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs sm:text-sm text-neutral-400 line-through">
                Rs. {totalRealPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {hasDiscount && (
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 border border-emerald-200 px-2.5 py-1 rounded-md inline-block">
              Total Savings: Rs. {totalSavings.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Buy Now */}
        <button
          onClick={onBuyNow}
          disabled={product.stock <= 0 || isBuyingNow || isAddingToCart}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-md font-semibold text-white transition-all shadow-sm cursor-pointer ${
            product.stock > 0
              ? "bg-[#0058BE] hover:bg-secondary-700"
              : "bg-neutral-300 cursor-not-allowed"
          }`}
        >
          {isBuyingNow ? (
            "Processing..."
          ) : (
            <>
              <LuZap size={20} /> Buy Now
            </>
          )}
        </button>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          disabled={product.stock <= 0 || isAddingToCart}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-md font-semibold text-white transition-all shadow-sm cursor-pointer ${
            added
              ? "bg-emerald-600 hover:bg-emerald-700"
              : product.stock > 0
              ? "bg-[#091426] hover:bg-[#1a2a44]"
              : "bg-neutral-300 cursor-not-allowed"
          }`}
        >
          {added ? (
            <>
              <LuCheck size={20} /> Added to Cart!
            </>
          ) : (
            <>
              <LuShoppingCart size={20} /> Add to Cart
            </>
          )}
        </button>

        {/* Wishlist */}
        <button
          onClick={onWishlist}
          disabled={isAddingToWishlist}
          className="flex items-center justify-center gap-2 py-3 px-5 rounded-md border border-neutral-300 text-neutral-700 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all font-semibold cursor-pointer"
        >
          <LuHeart size={20} /> Wishlist
        </button>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
        <div className="flex flex-col items-center gap-1">
          <LuTruck size={18} className="text-secondary-600" />
          <span>Express Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <LuShieldCheck size={18} className="text-tertiary-600" />
          <span>Verified Product</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <LuRotateCcw size={18} className="text-primary-600" />
          <span>Easy Returns</span>
        </div>
      </div>
    </div>
  );
}