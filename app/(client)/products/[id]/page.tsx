"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LuArrowLeft } from "react-icons/lu";
import toast from "react-hot-toast";
import { getProductById } from "@/api/client/product.api";
import { addToCart } from "@/api/client/cart.api";
import { addToWishlist } from "@/api/client/wishlist.api";
import { useAuthStore } from "@/store/clientAuthStore";
import {
  ProductDetail,
  ProductDetailResponse,
} from "@/app/types/client/product";
import ProductDetailLoading from "@/app/components/client/products/ProductDetailLoading";
import ProductNotFound from "@/app/components/client/products/ProductNotFound";
import ProductPurchaseSection from "@/app/components/client/products/ProductPurchaseSection";
import ProductInfo from "@/app/components/client/products/ProductInfo";
import ProductImageGallery from "@/app/components/client/products/ProductImageGallery";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
const [isBuyingNow, setIsBuyingNow] = useState(false);

  const { data: productData, isLoading, error } = useQuery<ProductDetailResponse>({
    queryKey: ["product-detail", id],
    queryFn: () => getProductById(id),
  });

  const product: ProductDetail | undefined = productData?.data;

  const cartMutation = useMutation({
    mutationFn: () =>
      addToCart({
        product: product!._id,
        quantity,
        price: product!.discountPrice || product!.price,
      }),
    onSuccess: () => {
      toast.success(`${product!.name} added to cart!`);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to add to cart");
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: () => addToWishlist(product!._id),
    onSuccess: () => {
      toast.success(`${product!.name} added to wishlist!`);
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update wishlist");
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to your cart");
      return;
    }
    if (!product || product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }
    cartMutation.mutate();
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast.error("Please login to manage your wishlist");
      return;
    }
    wishlistMutation.mutate();
  };
  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to buy this product");
      return;
    }
    if (!product || product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    setIsBuyingNow(true);
    try {
      await addToCart({
        product: product._id,
        quantity,
        price: product.discountPrice || product.price,
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Taking you to cart...");
      router.push("/cart");
    } catch (err: any) {
      toast.error(err?.message || "Failed to process Buy Now");
    } finally {
      setIsBuyingNow(false);
    }
  };

  if (isLoading) return <ProductDetailLoading />;
  if (error || !product) return <ProductNotFound />;

  // Images
  const allImages: string[] = [];
  if (product.image?.path) allImages.push(product.image.path);
  if (product.images && Array.isArray(product.images)) {
    product.images.forEach((img) => {
      if (img?.path && !allImages.includes(img.path)) {
        allImages.push(img.path);
      }
    });
  }

  // Pricing
  const hasDiscount = Boolean(
    product.discountPrice && product.discountPrice < product.price
  );
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice!) / product.price) * 100
      )
    : 0;
  const finalUnitPrice = hasDiscount ? product.discountPrice! : product.price;
  const perItemSavings = hasDiscount
    ? product.price - product.discountPrice!
    : 0;
  const totalPrice = finalUnitPrice * quantity;
  const totalSavings = perItemSavings * quantity;
  const totalRealPrice = product.price * quantity;

  const categoryName =
    typeof product.category === "object" ? product.category?.name || "" : "";
  const brandName =
    typeof product.brand === "object" ? product.brand?.name || "" : "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-secondary-600 transition-colors"
        >
          <LuArrowLeft size={16} /> Back to All Products
        </Link>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs">
        <ProductImageGallery
          images={allImages}
          productName={product.name}
          hasDiscount={hasDiscount}
          discountPercent={discountPercent}
          selectedIndex={selectedImgIndex}
          onSelect={setSelectedImgIndex}
        />

        <div className="space-y-6 flex flex-col justify-between">
          <ProductInfo
            product={product}
            hasDiscount={hasDiscount}
            discountPercent={discountPercent}
            finalUnitPrice={finalUnitPrice}
            perItemSavings={perItemSavings}
            brandName={brandName}
            categoryName={categoryName}
          />

          <ProductPurchaseSection
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            totalPrice={totalPrice}
            totalRealPrice={totalRealPrice}
            totalSavings={totalSavings}
            hasDiscount={hasDiscount}
            added={added}
            isAddingToCart={cartMutation.isPending}
            isAddingToWishlist={wishlistMutation.isPending}
            onAddToCart={handleAddToCart}
            onWishlist={handleWishlist}
            onBuyNow={handleBuyNow}
            isBuyingNow={isBuyingNow}
          />
        </div>
      </div>
    </div>
  );
}