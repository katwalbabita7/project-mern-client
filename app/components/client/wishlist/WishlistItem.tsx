"use client";

import Image from "next/image";
import Link from "next/link";
import { LuTrash2, LuShoppingCart } from "react-icons/lu";
import type { WishlistProduct } from "@/app/types/client/product";

interface WishlistItemProps {
  product: WishlistProduct;
  onRemove: (productId: string) => void;
  onMoveToCart: (product: WishlistProduct) => void;
  isRemoving: boolean;
  isMoving: boolean;
}

export default function WishlistItem({
  product,
  onRemove,
  onMoveToCart,
  isRemoving,
  isMoving,
}: WishlistItemProps) {
  const imgUrl =
    product.image?.path ||
    (product.images && product.images[0]?.path) ||
    "/placeholder-product.png";

  const hasDiscount =
    product.discountPrice !== undefined &&
    product.discountPrice < product.price;

  const displayPrice = product.discountPrice ?? product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div className="relative pt-[100%] bg-neutral-100">
        <Image
          src={imgUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <button
          onClick={() => onRemove(product._id)}
          disabled={isRemoving}
          className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 hover:bg-white text-red-500 rounded-full shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          title="Remove from wishlist"
        >
          <LuTrash2 size={16} />
        </button>
      </div>

      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/products/${product._id}`}>
            <h3 className="font-semibold text-sm text-[#091426] hover:text-[#0058BE] transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-base font-bold text-[#091426]">
              Rs. {displayPrice.toLocaleString()}
            </span>

            {hasDiscount && (
              <>
                <span className="text-xs text-neutral-400 line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
                <span className="text-label-xs font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => onMoveToCart(product)}
          disabled={isMoving}
          className="w-full bg-[#091426] hover:bg-[#0058BE] text-white font-semibold py-2 px-3 rounded-md text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
        >
          <LuShoppingCart size={16} />
          Move to Cart
        </button>
      </div>
    </div>
  );
}