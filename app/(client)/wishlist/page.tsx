"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getMyWishlist, removeFromWishlist } from "@/api/client/wishlist.api";
import { addToCart } from "@/api/client/cart.api";
import { useAuthStore } from "@/store/clientAuthStore";
import type { WishlistProduct, WishlistResponse } from "@/app/types/client/product";
import WishlistEmpty from "@/app/components/client/wishlist/WishlistEmpty";
import WishlistSkeleton from "@/app/components/client/wishlist/WishlistSkeleton";
import WishlistItem from "@/app/components/client/wishlist/WishlistItem";

export default function WishlistPage() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const { data: wishlistData, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getMyWishlist,
    enabled: isAuthenticated,
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => removeFromWishlist(productId),
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to remove item");
    },
  });

  const moveToCartMutation = useMutation({
    mutationFn: async (product: WishlistProduct) => {
      await addToCart({
        product: product._id,
        quantity: 1,
        price: product.discountPrice ?? product.price,
      });
      await removeFromWishlist(product._id);
    },
    onSuccess: () => {
      toast.success("Moved to cart!");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to move to cart");
    },
  });

  if (!isAuthenticated) {
    return <WishlistEmpty isAuthenticated={false} />;
  }

  if (isLoading) {
    return <WishlistSkeleton />;
  }

  const products: WishlistProduct[] = Array.isArray(
    (wishlistData as WishlistResponse)?.data
  )
    ? (wishlistData as WishlistResponse).data
    : [];

  if (products.length === 0) {
    return <WishlistEmpty isAuthenticated={true} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-neutral-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#091426]">
          My Wishlist
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          {products.length} saved item{products.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <WishlistItem
            key={product._id}
            product={product}
            onRemove={(id) => removeMutation.mutate(id)}
            onMoveToCart={(p) => moveToCartMutation.mutate(p)}
            isRemoving={removeMutation.isPending}
            isMoving={moveToCartMutation.isPending}
          />
        ))}
      </div>
    </div>
  );
}