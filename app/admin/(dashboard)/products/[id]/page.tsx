"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/admin/product.api";
import Image from "next/image";
import {
  LuArrowLeft,
  LuPencil,
  LuInfo,
  LuLayers,
  LuImage as LuImageIcon,
  LuReceipt,
  LuSlidersHorizontal,
  LuCircleCheck,
  LuCircleX,
  LuSparkles,
  LuCalendar,
} from "react-icons/lu";

import AdminCard from "@/app/components/admin/ui/admin-card";

export default function ProductViewPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id as string),
    enabled: !!id,
  });

  const product = data?.data || data;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center text-sm text-neutral-500">
        Loading product details...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center">
        <p className="text-sm font-semibold text-red-500 mb-3">
          Product not found or failed to load.
        </p>
        <button
          onClick={() => router.push("/admin/products")}
          className="text-xs font-semibold text-[#0058BE] hover:underline"
        >
          ← Return to Products
        </button>
      </div>
    );
  }

  const categoryName =
    typeof product.category === "object"
      ? product.category?.name
      : product.category;

  const brandName =
    typeof product.brand === "object" ? product.brand?.name : product.brand;

  const formatDate = (date: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleString("en-NP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Extract specifications (key: value) and other tags
  const rawTags: string[] = Array.isArray(product.tags)
    ? product.tags
    : typeof product.tags === "string"
    ? product.tags.split(",").map((t: string) => t.trim())
    : [];

  const specsList: { name: string; value: string }[] = [];
  const otherTagsList: string[] = [];

  rawTags.forEach((item) => {
    if (item.includes(":")) {
      const [k, ...v] = item.split(":");
      specsList.push({ name: k.trim(), value: v.join(":").trim() });
    } else if (item.trim()) {
      otherTagsList.push(item.trim());
    }
  });

  const mainImageUrl =
    product.image?.path ||
    product.image?.url ||
    (product.images && (product.images[0]?.path || product.images[0]?.url));

  const additionalImages =
    product.images && product.images.length > 1
      ? product.images.slice(1)
      : [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="inline-flex items-center justify-center p-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 transition shadow-2xs"
            title="Back to products"
          >
            <LuArrowLeft size={17} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#091426] tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Product Overview & Specifications
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/admin/products/${id}/edit`)}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0058BE] hover:bg-[#0047a0] rounded-xl shadow-xs transition"
        >
          <LuPencil size={16} />
          Edit Product
        </button>
      </div>

      {/* 2-Column Card Grid matching ContentGrid.png layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: General Information */}
          <AdminCard
            icon={<LuInfo size={19} className="text-[#0058BE]" />}
            title="General Information"
            subtitle="Core product identification and description"
          >
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Product Name
                </label>
                <p className="mt-1 text-base font-semibold text-[#091426]">
                  {product.name}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-neutral-50/80 p-3.5 rounded-xl border border-neutral-200/70">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Category
                  </label>
                  <p className="mt-1 text-sm font-semibold text-neutral-800">
                    {categoryName || "—"}
                  </p>
                </div>

                <div className="bg-neutral-50/80 p-3.5 rounded-xl border border-neutral-200/70">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Brand
                  </label>
                  <p className="mt-1 text-sm font-semibold text-neutral-800">
                    {brandName || "—"}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Description
                </label>
                <div className="mt-1.5 p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                  {product.description || "No description provided."}
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Card 2: Product Specifications & Details */}
          <AdminCard
            icon={<LuLayers size={19} className="text-[#007472]" />}
            title="Product Specifications & Details"
            subtitle="Technical properties and metadata"
          >
            <div className="space-y-4">
              {/* Specifications rows */}
              {specsList.length > 0 ? (
                <div className="divide-y divide-neutral-100 border border-neutral-200/70 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-2 bg-neutral-50 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    <div>Specification Name</div>
                    <div>Specification Value</div>
                  </div>
                  {specsList.map((spec, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-2 px-4 py-3 text-xs sm:text-sm bg-white hover:bg-neutral-50/50 transition-colors"
                    >
                      <div className="font-semibold text-neutral-800">
                        {spec.name}
                      </div>
                      <div className="text-neutral-600">{spec.value}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-400 italic">
                  No custom specifications added.
                </p>
              )}

              {/* Tags */}
              {otherTagsList.length > 0 && (
                <div className="pt-3 border-t border-neutral-100">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Search Tags & Keywords
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {otherTagsList.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full border border-neutral-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <LuCalendar size={14} className="text-neutral-400" />
                  <span>Created: {formatDate(product.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <LuCalendar size={14} className="text-neutral-400" />
                  <span>Updated: {formatDate(product.updatedAt)}</span>
                </div>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Product Media */}
          <AdminCard
            icon={<LuImageIcon size={19} className="text-[#0058BE]" />}
            title="Product Media"
            subtitle="Cover photo and gallery thumbnails"
          >
            <div className="space-y-3">
              {/* Main Image Banner */}
              {mainImageUrl ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-2xs">
                  <Image
                    src={mainImageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                  <span className="absolute bottom-2 left-2 bg-[#091426]/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    Cover Image
                  </span>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center text-xs text-neutral-400">
                  No cover image uploaded
                </div>
              )}

              {/* Additional Thumbnails */}
              {additionalImages.length > 0 && (
                <div className="pt-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Gallery Images ({additionalImages.length})
                  </label>
                  <div className="grid grid-cols-4 gap-2.5">
                    {additionalImages.map((img: any, idx: number) => {
                      const url = img.path || img.url;
                      if (!url) return null;
                      return (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-xl border border-neutral-200 overflow-hidden bg-neutral-100"
                        >
                          <Image
                            src={url}
                            alt={`Gallery ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </AdminCard>

          {/* Card 2: Pricing & Inventory */}
          <AdminCard
            icon={<LuReceipt size={19} className="text-[#007472]" />}
            title="Pricing & Inventory"
            subtitle="Pricing tiers and stock status"
          >
            <div className="space-y-3">
              <div className="bg-neutral-50/80 p-4 rounded-xl border border-neutral-200/70 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Base / Real Price
                  </span>
                  <p className="text-lg font-bold text-[#091426] mt-0.5">
                    Rs. {Number(product.price || 0).toLocaleString()}
                  </p>
                </div>
                {product.discountPrice && product.discountPrice < product.price ? (
                  <div className="text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                      Selling Price
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-lg font-extrabold text-[#0058BE]">
                        Rs. {Number(product.discountPrice).toLocaleString()}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-200">
                        -{Math.round(((Number(product.price) - Number(product.discountPrice)) / Number(product.price)) * 100)}%
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-medium block">
                      Discount: Rs. {(Number(product.price) - Number(product.discountPrice)).toLocaleString()} off
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-neutral-50/80 p-3.5 rounded-xl border border-neutral-200/70">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    SKU Code
                  </span>
                  <p className="font-mono font-semibold text-xs text-neutral-800 mt-1">
                    {product.sku || "—"}
                  </p>
                </div>

                <div className="bg-neutral-50/80 p-3.5 rounded-xl border border-neutral-200/70">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Available Stock
                  </span>
                  <p className="font-bold text-sm text-neutral-800 mt-1 flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        Number(product.stock) > 0 ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    />
                    {product.stock} units
                  </p>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Card 3: Status & Visibility */}
          <AdminCard
            icon={<LuSlidersHorizontal size={19} className="text-[#091426]" />}
            title="Status & Visibility"
            subtitle="Availability status in customer store"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200/70 bg-neutral-50/50">
                <span className="text-xs font-medium text-neutral-700">
                  Catalog Status
                </span>
                {product.isActive ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <LuCircleCheck size={13} /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-700 border border-red-200">
                    <LuCircleX size={13} /> Inactive
                  </span>
                )}
              </div>

              {product.new_arrival && (
                <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200/70 bg-neutral-50/50">
                  <span className="text-xs font-medium text-neutral-700">
                    Collection Badge
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-[#0058BE] border border-blue-200">
                    <LuSparkles size={12} /> New Arrival
                  </span>
                </div>
              )}

              {product.is_feature && (
                <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200/70 bg-neutral-50/50">
                  <span className="text-xs font-medium text-neutral-700">
                    Highlight Feature
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    Featured
                  </span>
                </div>
              )}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-200/80">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 shadow-2xs transition"
        >
          <LuArrowLeft size={16} />
          Back to Products
        </button>

        <button
          type="button"
          onClick={() => router.push(`/admin/products/${id}/edit`)}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0058BE] hover:bg-[#0047a0] rounded-xl shadow-xs transition"
        >
          <LuPencil size={16} />
          Edit Product
        </button>
      </div>
    </div>
  );
}