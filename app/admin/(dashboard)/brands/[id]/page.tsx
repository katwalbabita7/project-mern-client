"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getBrandById } from "@/api/admin/brand.api";
import {
  LuArrowLeft,
  LuPencil,
  LuInfo,
  LuImage as LuImageIcon,
  LuSlidersHorizontal,
  LuCalendar,
  LuCircleCheck,
  LuCircleX,
  LuLayers,
} from "react-icons/lu";

import AdminCard from "@/app/components/admin/ui/admin-card";

export default function BrandViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await getBrandById(id as string);
        setBrand(data.data || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBrand();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center text-sm text-neutral-500">
        Loading brand details...
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center">
        <p className="text-sm font-semibold text-red-500 mb-3">
          Brand not found or failed to load.
        </p>
        <button
          onClick={() => router.push("/admin/brands")}
          className="text-xs font-semibold text-[#0058BE] hover:underline"
        >
          ← Return to Brands
        </button>
      </div>
    );
  }

  const logoSrc = brand.logo?.path || brand.logo?.url;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/brands")}
            className="inline-flex items-center justify-center p-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 transition shadow-2xs"
            title="Back to brands"
          >
            <LuArrowLeft size={17} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#091426] tracking-tight">
              {brand.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Brand Profile & Details
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/admin/brands/${id}/edit`)}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0058BE] hover:bg-[#0047a0] rounded-xl shadow-xs transition"
        >
          <LuPencil size={16} />
          Edit Brand
        </button>
      </div>

      {/* 2-Column Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: General Information */}
        <div className="lg:col-span-7 space-y-6">
          <AdminCard
            icon={<LuInfo size={19} className="text-[#0058BE]" />}
            title="General Information"
            subtitle="Brand name, brand slug, and company background"
          >
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Brand Name
                </label>
                <p className="mt-1 text-base font-semibold text-[#091426]">
                  {brand.name}
                </p>
              </div>

              <div className="bg-neutral-50/80 p-3.5 rounded-xl border border-neutral-200/70">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  URL Slug
                </label>
                <p className="mt-1 text-xs font-mono font-semibold text-neutral-800">
                  {brand.slug || "—"}
                </p>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Description
                </label>
                <div className="mt-1.5 p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                  {brand.description || "No description available for this brand."}
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Metadata Card */}
          <AdminCard
            icon={<LuLayers size={19} className="text-[#007472]" />}
            title="Metadata & Timestamps"
            subtitle="Record audit timestamps"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600">
              <div className="flex items-center gap-2 p-3 bg-neutral-50/80 rounded-xl border border-neutral-200/70">
                <LuCalendar size={16} className="text-[#0058BE]" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Created At
                  </p>
                  <p className="font-semibold text-neutral-800 mt-0.5">
                    {brand.createdAt
                      ? new Date(brand.createdAt).toLocaleString()
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-neutral-50/80 rounded-xl border border-neutral-200/70">
                <LuCalendar size={16} className="text-[#007472]" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Updated At
                  </p>
                  <p className="font-semibold text-neutral-800 mt-0.5">
                    {brand.updatedAt
                      ? new Date(brand.updatedAt).toLocaleString()
                      : "—"}
                  </p>
                </div>
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Right Column: Media & Status */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Logo Media */}
          <AdminCard
            icon={<LuImageIcon size={19} className="text-[#0058BE]" />}
            title="Brand Logo"
            subtitle="Official logo asset"
          >
            {logoSrc ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-2xs flex items-center justify-center p-4">
                <Image
                  src={logoSrc}
                  alt={brand.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
            ) : (
              <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center text-xs text-neutral-400">
                No logo uploaded
              </div>
            )}
          </AdminCard>

          {/* Card 2: Status */}
          <AdminCard
            icon={<LuSlidersHorizontal size={19} className="text-[#091426]" />}
            title="Status & Visibility"
            subtitle="Storefront display status"
          >
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200/70 bg-neutral-50/50">
              <span className="text-xs font-semibold text-neutral-700">
                Status
              </span>
              {brand.isActive ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <LuCircleCheck size={13} /> Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-700 border border-red-200">
                  <LuCircleX size={13} /> Inactive
                </span>
              )}
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-200/80">
        <button
          type="button"
          onClick={() => router.push("/admin/brands")}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 shadow-2xs transition"
        >
          <LuArrowLeft size={16} />
          Back to Brands
        </button>

        <button
          type="button"
          onClick={() => router.push(`/admin/brands/${id}/edit`)}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0058BE] hover:bg-[#0047a0] rounded-xl shadow-xs transition"
        >
          <LuPencil size={16} />
          Edit Brand
        </button>
      </div>
    </div>
  );
}