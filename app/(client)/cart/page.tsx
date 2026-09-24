"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LuTrash2 } from "react-icons/lu";
import toast from "react-hot-toast";
import {
  getMyCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "@/api/client/cart.api";
import { useClientAuthStore } from "@/store/clientAuthStore";
import CheckoutModal from "@/app/components/client/checkout/checkout-modal";

import CartLoginPrompt from "@/app/components/client/cart/CartLoginPrompt";
import CartLoading from "@/app/components/client/cart/CartLoading";
import CartEmpty from "@/app/components/client/cart/CartEmpty";
import CartItemsList from "@/app/components/client/cart/CartItemsList";
import OrderSummary from "@/app/components/client/cart/OrderSummary";
import { CartItem, isPopulatedProduct } from "@/app/types/client/cart";
import { confirmDeleteToast } from "@/app/components/common/ui/confirm-dialog";

export default function CartPage() {
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useClientAuthStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getMyCart,
    enabled: isAuthenticated,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
      variant,
    }: {
      productId: string;
      quantity: number;
      variant?: string;
    }) => updateCartItem(productId, { quantity, variant }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update quantity");
    },
  });

  const removeMutation = useMutation({
    mutationFn: ({
      productId,
      variant,
    }: {
      productId: string;
      variant?: string;
    }) => removeFromCart(productId, variant),
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to remove item");
    },
  });

  const clearMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to clear cart");
    },
  });

  if (!isAuthenticated) return <CartLoginPrompt />;
  if (isLoading) return <CartLoading />;

  const items: CartItem[] = cartData?.data?.items || [];

  const subtotal = items.reduce((acc, item) => {
    const product = isPopulatedProduct(item.product) ? item.product : null;
    const itemPrice =
      item.price || product?.discountPrice || product?.price || 0;
    return acc + itemPrice * (item.quantity || 1);
  }, 0);

  const totalSavings = items.reduce((acc, item) => {
    const product = isPopulatedProduct(item.product) ? item.product : null;
    const origPrice = product?.price || 0;
    const unitPrice = item.price || product?.discountPrice || origPrice;

    if (origPrice > unitPrice) {
      return acc + (origPrice - unitPrice) * (item.quantity || 1);
    }
    return acc;
  }, 0);

  const shippingFee = subtotal > 0 ? (subtotal > 2000 ? 0 : 100) : 0;
  const totalAmount = subtotal + shippingFee;

  if (items.length === 0) return <CartEmpty />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#091426]">
            Shopping Cart
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            You have {items.length} item{items.length > 1 ? "s" : ""} in your cart
          </p>
        </div>

        <button
          onClick={() => {
            confirmDeleteToast({
              message: "Are you sure you want to clear the entire cart?",
              confirmText: "Clear Cart",
              onConfirm: () => clearMutation.mutate(),
            });
          }}
          disabled={clearMutation.isPending}
          className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
        >
          <LuTrash2 size={14} /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CartItemsList
          items={items}
          onUpdateQuantity={(productId, quantity, variant) =>
            updateMutation.mutate({ productId, quantity, variant })
          }
          onRemove={(productId, variant) => {
      confirmDeleteToast({
        message: "Remove this item from cart?",
        confirmText: "Remove",
        onConfirm: () =>
          removeMutation.mutate({ productId, variant }),
      });
    }}
          isUpdating={updateMutation.isPending}
          isRemoving={removeMutation.isPending}
        />

        <OrderSummary
          subtotal={subtotal}
          totalSavings={totalSavings}
          shippingFee={shippingFee}
          totalAmount={totalAmount}
          onCheckout={() => setIsCheckoutOpen(true)}
        />
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        subtotal={subtotal}
        shippingFee={shippingFee}
        totalAmount={totalAmount}
        itemCount={items.length}
        userName={user?.full_name || user?.name || ""}
        userPhone={user?.phone || ""}
      />
    </div>
  );
}