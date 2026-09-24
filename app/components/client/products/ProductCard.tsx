"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuHeart, LuShoppingCart, LuCheck } from "react-icons/lu";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/api/client/cart.api";
import { addToWishlist } from "@/api/client/wishlist.api";
import { useClientAuthStore } from "@/store/clientAuthStore";
import { ProductCardProps } from "@/app/types/client/product";


export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted = false,
}) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useClientAuthStore();
  const [added, setAdded] = useState(false);

  const imgUrl =
    product.image?.path ||
    (product.images && product.images[0]?.path) ||
    "/placeholder-product.png";

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const cartMutation = useMutation({
    mutationFn: () =>
      addToCart({
        product: product._id,
        quantity: 1,
        price: product.discountPrice || product.price,
      }),
    onSuccess: () => {
      toast.success(`${product.name} added to cart!`);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to add to cart");
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: () => addToWishlist(product._id),
    onSuccess: () => {
      toast.success(`${product.name} added to wishlist!`);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update wishlist");
    },
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart");
      return;
    }
    if ((product.stock ?? 0) <= 0) {
  toast.error("This product is out of stock");
  return;
}
    cartMutation.mutate();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to manage your wishlist");
      return;
    }
    wishlistMutation.mutate();
  };

  const categoryName =
    typeof product.category === "object" ? product.category?.name : "";
  const brandName =
    typeof product.brand === "object" ? product.brand?.name : "";

  return (
    <div className="group relative bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* Badges & Wishlist Button */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {hasDiscount && (
            <span className="bg-red-600 text-white text-label-sm font-bold px-2 py-0.5 rounded shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.new_arrival && (
            <span className="bg-[#007472] text-white text-label-sm font-semibold px-2 py-0.5 rounded shadow-xs">
              New
            </span>
          )}
          {product.is_feature && (
            <span className="bg-[#0058BE] text-white text-label-sm font-semibold px-2 py-0.5 rounded shadow-xs">
              Featured
            </span>
          )}
        </div>

        <button
          onClick={handleWishlist}
          disabled={wishlistMutation.isPending}
          className={`pointer-events-auto p-1.5 rounded-full backdrop-blur-sm transition-all shadow-xs cursor-pointer ${
            isWishlisted
              ? "bg-red-50 text-red-500"
              : "bg-white/80 text-neutral-600 hover:text-red-500 hover:bg-white"
          }`}
          title="Add to Wishlist"
        >
          <LuHeart size={18} className={isWishlisted ? "fill-red-500" : ""} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link href={`/products/${product._id}`} className="block relative pt-[100%] bg-neutral-100 overflow-hidden">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-xs">
            No Image
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
            {brandName && <span className="font-medium text-secondary-600">{brandName}</span>}
            {brandName && categoryName && <span>•</span>}
            {categoryName && <span>{categoryName}</span>}
          </div>

          <Link href={`/products/${product._id}`}>
            <h3 className="font-semibold text-sm text-[#091426] line-clamp-2 hover:text-[#0058BE] transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base font-bold text-[#091426]">
                Rs. {(product.discountPrice ?? product.price).toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-xs text-neutral-400 line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>
            {hasDiscount && (
              <div className="flex items-center gap-1 text-label-sm text-emerald-600 font-medium">
                <span>Save Rs. {(product.price - product.discountPrice!).toLocaleString()}</span>
                <span className="text-neutral-300">•</span>
                <span className="text-red-600 font-bold">{discountPercent}% off</span>
              </div>
            )}
            <span
              className={`text-label-sm font-medium block mt-0.5 ${
                (product.stock ?? 0) > 0 ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {(product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={(product.stock ?? 0) <= 0 || cartMutation.isPending}
            className={`p-2 rounded-md transition-all cursor-pointer ${
              added
                ? "bg-emerald-600 text-white"
                : (product.stock ?? 0) > 0
                ? "bg-[#091426] hover:bg-[#0058BE] text-white"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
            title={(product.stock ?? 0) > 0 ? "Add to Cart" : "Out of Stock"}
          >
            {added ? <LuCheck size={18} /> : <LuShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};
