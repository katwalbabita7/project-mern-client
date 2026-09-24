"use client";

import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import CartItem from "./CartItem";
import { CartItemsListProps, isPopulatedProduct } from "@/app/types/client/cart";

export default function CartItemsList({
  items,
  onUpdateQuantity,
  onRemove,
  isUpdating,
  isRemoving,
}: CartItemsListProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      {items.map((item) => {
        const productId = isPopulatedProduct(item.product)
          ? item.product._id
          : (item.product as string);

        return (
          <CartItem
            key={item._id || productId}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
            isUpdating={isUpdating}
            isRemoving={isRemoving}
          />
        );
      })}

      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0058BE] hover:text-secondary-700 pt-2"
      >
        <LuArrowLeft size={16} /> Continue Shopping
      </Link>
    </div>
  );
}