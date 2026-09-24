"use client";

import Image from "next/image";
import { ProductImageGalleryProps } from "@/app/types/client/product";

export default function ProductImageGallery({
  images,
  productName,
  hasDiscount,
  discountPercent,
  selectedIndex,
  onSelect,
}: ProductImageGalleryProps) {
  const currentImage = images[selectedIndex] || "/placeholder-product.png";

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
        <Image
          src={currentImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4"
        />
        {hasDiscount && (
          <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded shadow-sm">
            -{discountPercent}% OFF
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                selectedIndex === idx
                  ? "border-[#0058BE] shadow-xs"
                  : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}