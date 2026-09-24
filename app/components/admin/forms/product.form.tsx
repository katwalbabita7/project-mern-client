"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  LuInfo,
  LuLayers,
  LuImage,
  LuReceipt,
  LuSlidersHorizontal,
  LuPlus,
  LuTrash2,
  LuArrowLeft,
  LuCheck,
  LuSparkles,
} from "react-icons/lu";

import { ProductSchema } from "@/schemas/admin/product.schema";
import { createProduct, updateProduct } from "@/api/admin/product.api";
import { ProductFormData } from "@/app/types/admin/product.form";

import AdminCard from "../ui/admin-card";
import AdminInput from "../ui/admin-input";
import AdminSelect from "../ui/admin-select";
import AdminTextarea from "../ui/admin-textarea";
import AdminMediaUpload from "../ui/admin-media-upload";

type ProductFormProps = {
  defaultValues?: Partial<ProductFormData> & {
    imageUrl?: string;
    images?: Array<{ path?: string; url?: string } | null | undefined> | null;
    new_arrival?: boolean;
    is_feature?: boolean;
  };
  productId?: string;
  categoryOptions?: { label: string; value: string }[];
  brandOptions?: { label: string; value: string }[];
};

interface SpecItem {
  name: string;
  value: string;
}

export default function ProductForm({
  defaultValues,
  productId,
  categoryOptions = [],
  brandOptions = [],
}: ProductFormProps) {
  const router = useRouter();
  const isEdit = Boolean(productId);

  // Specifications state
  const [specs, setSpecs] = useState<SpecItem[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [extraTags, setExtraTags] = useState<string[]>([]);

  const [discountPercent, setDiscountPercent] = useState<number | string>(() => {
    if (
      defaultValues?.price &&
      defaultValues?.discountPrice &&
      Number(defaultValues.discountPrice) < Number(defaultValues.price)
    ) {
      return Math.round(
        ((Number(defaultValues.price) - Number(defaultValues.discountPrice)) /
          Number(defaultValues.price)) *
          100
      );
    }
    return "";
  });

  const getIsActiveValue = () => {
    if (defaultValues?.isActive === false || defaultValues?.isActive === "false") {
      return "false";
    }
    return "true";
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(ProductSchema) as any,
    mode: "onBlur",
    defaultValues: {
      stock: 0,
      ...defaultValues,
      isActive: getIsActiveValue() as any,
      tags: Array.isArray(defaultValues?.tags)
        ? defaultValues.tags.join(", ")
        : defaultValues?.tags ?? "",
    },
  });

  const watchedPrice = watch("price");
  const watchedDiscountPrice = watch("discountPrice");

  // Keep discountPercent synced when defaultValues load/change
  useEffect(() => {
    if (defaultValues?.price && defaultValues?.discountPrice) {
      const p = Number(defaultValues.price);
      const dp = Number(defaultValues.discountPrice);
      if (dp > 0 && dp < p) {
        setDiscountPercent(Math.round(((p - dp) / p) * 100));
      }
    }
  }, [defaultValues?.price, defaultValues?.discountPrice]);

  const handleDiscountPercentChange = (val: string | number) => {
    setDiscountPercent(val);
    const numPrice = Number(watchedPrice);

    if (
      val === "" ||
      val === null ||
      val === undefined ||
      isNaN(Number(val)) ||
      Number(val) <= 0
    ) {
      setValue("discountPrice", null as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }

    const pct = Math.min(99.9, Math.max(0, Number(val)));
    if (numPrice && numPrice > 0) {
      const calculatedDiscountPrice =
        Math.round(numPrice * (1 - pct / 100) * 100) / 100;
      setValue("discountPrice", calculatedDiscountPrice, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numPrice = Number(e.target.value);
    if (
      discountPercent !== "" &&
      !isNaN(Number(discountPercent)) &&
      Number(discountPercent) > 0 &&
      numPrice > 0
    ) {
      const pct = Number(discountPercent);
      const calculatedDiscountPrice =
        Math.round(numPrice * (1 - pct / 100) * 100) / 100;
      setValue("discountPrice", calculatedDiscountPrice, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleDiscountPriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const numPrice = Number(watchedPrice);
    if (rawVal === "" || rawVal === null) {
      setDiscountPercent("");
      return;
    }
    const numDp = Number(rawVal);
    if (!isNaN(numDp) && numPrice > 0 && numDp < numPrice && numDp > 0) {
      const pct = Math.round(((numPrice - numDp) / numPrice) * 100);
      setDiscountPercent(pct > 0 ? pct : "");
    } else {
      setDiscountPercent("");
    }
  };

  // Parse initial tags and specifications
  useEffect(() => {
    if (defaultValues) {
      const rawTags = defaultValues.tags;
      let tagList: string[] = [];

      if (Array.isArray(rawTags)) {
        tagList = rawTags;
      } else if (typeof rawTags === "string" && rawTags.trim()) {
        tagList = rawTags.split(",").map((t) => t.trim()).filter(Boolean);
      }

      const initialSpecs: SpecItem[] = [];
      const initialOtherTags: string[] = [];

      tagList.forEach((item) => {
        if (item.includes(":")) {
          const [key, ...rest] = item.split(":");
          initialSpecs.push({
            name: key.trim(),
            value: rest.join(":").trim(),
          });
        } else {
          initialOtherTags.push(item);
        }
      });

      // Default sample specs if empty on create mode to guide user
      if (initialSpecs.length === 0 && !isEdit) {
        setSpecs([
          { name: "Material", value: "" },
          { name: "Weight", value: "" },
        ]);
      } else {
        setSpecs(initialSpecs);
      }

      setExtraTags(initialOtherTags);

      if (isEdit) {
        reset({
          ...defaultValues,
          tags: tagList.join(", "),
          isActive: getIsActiveValue() as any,
        });
      }
    } else if (!isEdit) {
      setSpecs([
        { name: "Material", value: "" },
        { name: "Weight", value: "" },
      ]);
    }
  }, [defaultValues, isEdit, reset]);

  // Specification handlers
  const handleAddSpec = () => {
    setSpecs((prev) => [...prev, { name: "", value: "" }]);
  };

  const handleUpdateSpec = (
    index: number,
    field: "name" | "value",
    val: string
  ) => {
    setSpecs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  // Tag chip handlers
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !extraTags.includes(trimmed)) {
      setExtraTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setExtraTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProductFormData) =>
      isEdit
        ? updateProduct(productId as string, data)
        : createProduct(data),
    onSuccess: (response) => {
      toast.success(
        response?.message ??
          `Product ${isEdit ? "updated" : "created"} successfully!`
      );
      router.push("/admin/products");
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong!");
    },
  });

  const onSubmit = (data: ProductFormData) => {
    // Combine specifications (formatted as Key: Value) and general tags
    const formattedSpecs = specs
      .filter((s) => s.name.trim() && s.value.trim())
      .map((s) => `${s.name.trim()}: ${s.value.trim()}`);

    const allCombinedTags = [...formattedSpecs, ...extraTags];

    const isActBool =
      data.isActive === "true" ||
      data.isActive === true ||
      String(data.isActive) === "true";

    const payload = {
      ...data,
      price: Number(data.price),
      discountPrice:
        data.discountPrice != null && !isNaN(Number(data.discountPrice))
          ? Number(data.discountPrice)
          : undefined,
      stock: Number(data.stock),
      isActive: isActBool,
      tags: allCombinedTags.join(", "),
    };

    mutate(payload as any);
  };

  // Prepare existing images for preview
  const defaultAdditionalPreviews: string[] = Array.isArray(defaultValues?.images)
    ? (defaultValues.images
        .map((img: any) => (img ? img.path || img.url : null))
        .filter(
          (p: any): p is string =>
            typeof p === "string" && Boolean(p) && p !== defaultValues?.imageUrl
        ) as string[])
    : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#091426] tracking-tight">
            {isEdit ? "Edit Product" : "Create New Product"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            {isEdit
              ? "Update product information, specifications, media, and pricing."
              : "Fill in the required information below to add a product to your catalog."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 hover:text-[#091426] shadow-2xs transition-colors"
        >
          <LuArrowLeft size={15} />
          Back to Products
        </button>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: General Information */}
          <AdminCard
            icon={<LuInfo size={19} className="text-[#0058BE]" />}
            title="General Information"
            subtitle="Enter primary details and product overview"
          >
            <div className="space-y-4">
              {/* Product Name */}
              <AdminInput
                id="name"
                name="name"
                label="Product Name"
                placeholder="e.g. Handmade Himalayan Wool Sweater"
                required
                register={register}
                error={errors.name}
              />

              {/* Category & Brand (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminSelect
                  id="category"
                  name="category"
                  label="Category"
                  placeholder="Select category"
                  required
                  options={categoryOptions}
                  register={register}
                  error={errors.category}
                />

                <AdminSelect
                  id="brand"
                  name="brand"
                  label="Brand"
                  placeholder="Select brand"
                  required
                  options={brandOptions}
                  register={register}
                  error={errors.brand}
                />
              </div>

              {/* Description with formatting toolbar */}
              <AdminTextarea
                id="description"
                name="description"
                label="Description"
                placeholder="Describe your product in detail..."
                rows={5}
                register={register}
                setValue={setValue}
                watch={watch}
                error={errors.description}
              />
            </div>
          </AdminCard>

          {/* Card 2: Product Specifications */}
          <AdminCard
            icon={<LuLayers size={19} className="text-[#007472]" />}
            title="Product Specifications"
            subtitle="Add custom technical details or product attributes"
          >
            <div className="space-y-4">
              {/* Table Column Headers */}
              {specs.length > 0 && (
                <div className="grid grid-cols-12 gap-3 px-1 text-label-sm font-bold uppercase tracking-wider text-neutral-500">
                  <div className="col-span-5">Specification Name</div>
                  <div className="col-span-6">Specification Value</div>
                  <div className="col-span-1 text-center"></div>
                </div>
              )}

              {/* Dynamic Key-Value Rows */}
              <div className="space-y-3">
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-3 items-center"
                  >
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="e.g. Material"
                        value={spec.name}
                        onChange={(e) =>
                          handleUpdateSpec(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/70 text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0058BE]/15 focus:border-[#0058BE] transition"
                      />
                    </div>
                    <div className="col-span-6">
                      <input
                        type="text"
                        placeholder="e.g. Copper, 7 inch, Cotton"
                        value={spec.value}
                        onChange={(e) =>
                          handleUpdateSpec(index, "value", e.target.value)
                        }
                        className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-neutral-50/70 text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0058BE]/15 focus:border-[#0058BE] transition"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(index)}
                        className="text-neutral-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete specification"
                      >
                        <LuTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Specification Button */}
              <button
                type="button"
                onClick={handleAddSpec}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0058BE] bg-white border border-[#0058BE]/40 rounded-xl hover:bg-[#0058BE]/5 transition-colors"
              >
                <LuPlus size={15} />
                Add More Specification
              </button>

              {/* Extra Tags & Keywords Section */}
              <div className="pt-4 border-t border-neutral-100">
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  Keywords & Search Tags (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Type tag and press Add..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50/70 text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0058BE]/15 focus:border-[#0058BE] transition"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3.5 py-2 text-xs font-semibold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-xl transition"
                  >
                    Add
                  </button>
                </div>

                {extraTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {extraTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-full border border-neutral-200"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </AdminCard>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Product Media */}
          <AdminCard
            icon={<LuImage size={19} className="text-[#0058BE]" />}
            title="Product Media"
            subtitle="Upload main cover image and gallery photos"
          >
            <AdminMediaUpload
              setValue={setValue}
              error={errors.image as any}
              defaultMainPreview={defaultValues?.imageUrl}
              defaultMultiplePreviews={defaultAdditionalPreviews}
              isEdit={isEdit}
              required={!isEdit}
              allowMultiple={true}
            />
          </AdminCard>

          {/* Card 2: Pricing & Inventory */}
          <AdminCard
            icon={<LuReceipt size={19} className="text-[#007472]" />}
            title="Pricing & Inventory"
            subtitle="Manage prices, stock levels, and product identifiers"
          >
            <div className="space-y-4">
              {/* Base Price */}
              <AdminInput
                id="price"
                name="price"
                type="number"
                step="0.01"
                prefix="Rs."
                label="Base Price (Rs.)"
                placeholder="0.00"
                required
                register={register}
                onChange={handlePriceInput}
                error={errors.price}
              />

              {/* Discount Section: Percentage (%) & Discounted Price (Rs.) */}
              <div className="p-4 rounded-xl border border-neutral-200/80 bg-neutral-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Discount Settings
                  </span>
                  {discountPercent !== "" && Number(discountPercent) > 0 && (
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Discount Percentage */}
                  <div>
                    <AdminInput
                      id="discountPercent"
                      name="discountPercent"
                      type="number"
                      step="0.5"
                      min="0"
                      max="99"
                      suffix="%"
                      label="Discount (%)"
                      placeholder="e.g. 10, 20"
                      value={discountPercent}
                      onChange={(e) => handleDiscountPercentChange(e.target.value)}
                    />
                    {/* Quick percentage buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {[5, 10, 15, 20, 25, 30, 50].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => handleDiscountPercentChange(pct)}
                          className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer border ${
                            Number(discountPercent) === pct
                              ? "bg-[#0058BE] text-white border-[#0058BE] shadow-xs"
                              : "bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200"
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                      {discountPercent !== "" && Number(discountPercent) > 0 && (
                        <button
                          type="button"
                          onClick={() => handleDiscountPercentChange("")}
                          className="text-[11px] px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Discounted / Final Price */}
                  <div>
                    <AdminInput
                      id="discountPrice"
                      name="discountPrice"
                      type="number"
                      step="0.01"
                      prefix="Rs."
                      label="Discounted Price (Rs.)"
                      placeholder="0.00"
                      register={register}
                      onChange={handleDiscountPriceInput}
                      error={errors.discountPrice}
                    />
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Updates with % or enter custom amount
                    </p>
                  </div>
                </div>

                {/* Real-time Pricing Summary Preview */}
                {Number(watchedPrice) > 0 && (
                  <div className="mt-2 p-3 rounded-lg border border-neutral-200 bg-white space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
                      <span>Pricing Breakdown</span>
                      {watchedDiscountPrice != null &&
                        Number(watchedDiscountPrice) > 0 &&
                        Number(watchedDiscountPrice) < Number(watchedPrice) && (
                          <span className="text-emerald-600 font-bold normal-case">
                            Save Rs. {(Number(watchedPrice) - Number(watchedDiscountPrice)).toLocaleString()}
                          </span>
                        )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs pt-1 border-t border-neutral-100">
                      <div>
                        <span className="text-neutral-400 block text-[11px]">Real Price:</span>
                        <span className="font-semibold text-neutral-800">
                          Rs. {Number(watchedPrice).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[11px]">Discount:</span>
                        <span className="font-bold text-red-600">
                          {watchedDiscountPrice != null &&
                          Number(watchedDiscountPrice) > 0 &&
                          Number(watchedDiscountPrice) < Number(watchedPrice)
                            ? `${Math.round(
                                ((Number(watchedPrice) - Number(watchedDiscountPrice)) /
                                  Number(watchedPrice)) *
                                  100
                              )}% OFF`
                            : "0%"}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[11px]">Final Price:</span>
                        <span className="font-bold text-[#007472]">
                          Rs.{" "}
                          {(watchedDiscountPrice != null &&
                          Number(watchedDiscountPrice) > 0 &&
                          Number(watchedDiscountPrice) < Number(watchedPrice)
                            ? Number(watchedDiscountPrice)
                            : Number(watchedPrice)
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SKU & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminInput
                  id="sku"
                  name="sku"
                  label="SKU"
                  placeholder="e.g. WH-2024-BLK"
                  register={register}
                  error={errors.sku}
                />

                <AdminInput
                  id="stock"
                  name="stock"
                  type="number"
                  label="Stock Quantity"
                  placeholder="0"
                  required
                  register={register}
                  error={errors.stock}
                />
              </div>
            </div>
          </AdminCard>

          {/* Card 3: Status & Visibility */}
          <AdminCard
            icon={<LuSlidersHorizontal size={19} className="text-[#091426]" />}
            title="Status & Visibility"
            subtitle="Control product availability and visibility"
          >
            <div className="space-y-4">
              {/* Active / Inactive Status */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-2">
                  Product Status *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                      String(watch("isActive")) === "true" || watch("isActive") === true
                        ? "border-[#0058BE] bg-[#0058BE]/10 text-[#0058BE]"
                        : "border-neutral-200 bg-neutral-50/70 text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <input
                      type="radio"
                      value="true"
                      {...register("isActive")}
                      className="hidden"
                    />
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Active
                  </label>

                  <label
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                      String(watch("isActive")) === "false" || watch("isActive") === false
                        ? "border-red-500 bg-red-50 text-red-600"
                        : "border-neutral-200 bg-neutral-50/70 text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <input
                      type="radio"
                      value="false"
                      {...register("isActive")}
                      className="hidden"
                    />
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    Inactive
                  </label>
                </div>
                {errors.isActive && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.isActive.message}
                  </p>
                )}
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Bottom Action Bar matching reference */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-200/80">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 hover:text-[#091426] shadow-2xs transition"
        >
          <LuArrowLeft size={16} />
          Cancel & Go Back
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#091426] hover:bg-primary-700 active:bg-primary-950 rounded-xl shadow-xs transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? (
            "Saving..."
          ) : (
            <>
              <LuCheck size={16} />
              {isEdit ? "Update Product" : "Save & Continue"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}