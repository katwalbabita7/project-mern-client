"use client";

import { ProductInfoProps } from "@/app/types/client/product";

export default function ProductInfo({
  product,
  hasDiscount,
  discountPercent,
  finalUnitPrice,
  perItemSavings,
  brandName,
  categoryName,
}: ProductInfoProps) {
  return (
    <div className="space-y-4">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {brandName && (
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500 font-medium">Brand:</span>
            <span className="bg-neutral-100 text-neutral-700 text-xs font-semibold px-2.5 py-1 rounded-md">
              {brandName}
            </span>
          </div>
        )}
        {categoryName && (
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500 font-medium">Category:</span>
            <span className="bg-secondary-50 text-secondary-700 text-xs font-semibold px-2.5 py-1 rounded-md">
              {categoryName}
            </span>
          </div>
        )}
        {product.new_arrival && (
          <span className="bg-tertiary-50 text-tertiary-700 text-xs font-semibold px-2.5 py-1 rounded-md">
            New Arrival
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#091426] leading-tight">
        {product.name}
      </h1>

      {/* Pricing */}
      <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200 space-y-2">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#091426]">
            Rs. {finalUnitPrice.toLocaleString()}
          </span>
          {hasDiscount && (
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl text-neutral-400 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
              <span className="bg-red-600 text-white text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                {discountPercent}% OFF
              </span>
            </div>
          )}
        </div>

        {hasDiscount ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm pt-2 border-t border-neutral-200/60">
            <span className="text-neutral-500">
              Real Price:{" "}
              <span className="font-semibold text-neutral-700 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-500">
              Discount:{" "}
              <span className="font-bold text-red-600">
                {discountPercent}% OFF
              </span>
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              You Save: Rs. {perItemSavings.toLocaleString()}
            </span>
          </div>
        ) : (
          <div className="text-xs text-neutral-500 pt-1">
            Real Price:{" "}
            <span className="font-semibold text-neutral-700">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Stock */}
      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            product.stock > 0 ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
        <span
          className={`text-sm font-semibold ${
            product.stock > 0 ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `In Stock (${product.stock} available)`
            : "Out of Stock"}
        </span>
      </div>

      {/* Description */}
      {product.description && (
        <div className="pt-2">
          <h3 className="text-sm font-semibold text-[#091426] mb-1">
            Description
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="pt-2 flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-neutral-400">Tags:</span>
          {product.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}