"use client";

import React, { useState } from "react";
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
} from "react-icons/lu";

import { createCategory, updateCategory } from "@/api/admin/category.api";
import {
  CategoryFormData,
  CategorySchema,
} from "@/schemas/admin/category.schema";

import AdminCard from "../ui/admin-card";
import AdminInput from "../ui/admin-input";
import AdminSelect from "../ui/admin-select";
import AdminTextarea from "../ui/admin-textarea";
import AdminMediaUpload from "../ui/admin-media-upload";

type CategoryFormProps = {
  defaultValues?: Partial<CategoryFormData> & {
    imageUrl?: string;
  };
  categoryId?: string;
  parentOptions?: { label: string; value: string }[];
};

interface SpecItem {
  name: string;
  value: string;
}

export default function CategoryForm({
  defaultValues,
  categoryId,
  parentOptions = [],
}: CategoryFormProps) {
  const router = useRouter();
  const isEdit = Boolean(categoryId);

  // Dynamic specifications for category
  const [specs, setSpecs] = useState<SpecItem[]>([
    { name: "Applicable Type", value: "All Products" },
    { name: "Filter Group", value: "Primary" },
  ]);
  const [tagInput, setTagInput] = useState("");
  const [extraTags, setExtraTags] = useState<string[]>(["storefront", "collection"]);

  const getIsActiveValue = () => {
    if (defaultValues?.isActive === true || defaultValues?.isActive === "true") {
      return "true";
    }
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
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: yupResolver(CategorySchema),
    mode: "onBlur",
    defaultValues: {
      parentCategory: null,
      ...defaultValues,
      isActive: getIsActiveValue() as any,
    },
  });

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
    mutationFn: (data: any) =>
      isEdit
        ? updateCategory(categoryId as string, data)
        : createCategory(data),
    onSuccess: (response) => {
      toast.success(
        response?.message ??
          `Category ${isEdit ? "updated" : "created"} successfully!`
      );
      router.refresh();
      router.push("/admin/categories");
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong!");
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("parentCategory", data.parentCategory || "");
    formData.append(
      "isActive",
      String(data.isActive === true || String(data.isActive) === "true")
    );
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    mutate(formData);
  };

  const selectOptions = [
    { label: "None (Top Level Category)", value: "" },
    ...parentOptions,
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#091426] tracking-tight">
            {isEdit ? "Edit Category" : "Create New Category"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            {isEdit
              ? "Update category details, parent association, specifications, and media."
              : "Fill in the required details below to add a new category to your store."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/categories")}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 hover:text-[#091426] shadow-2xs transition-colors"
        >
          <LuArrowLeft size={15} />
          Back to Categories
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
            subtitle="Category naming, hierarchy, and description"
          >
            <div className="space-y-4">
              <AdminInput
                id="name"
                name="name"
                label="Category Name"
                placeholder="e.g. Traditional Handicrafts, Woolen Apparel"
                required
                register={register}
                error={errors.name}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AdminSelect
                  id="parentCategory"
                  name="parentCategory"
                  label="Parent Category"
                  placeholder="Select parent category"
                  options={selectOptions}
                  register={register}
                  error={errors.parentCategory as any}
                />

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="block text-xs font-semibold text-neutral-800">
                    Category Type
                  </label>
                  <input
                    type="text"
                    defaultValue="Standard Catalog"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/70 text-sm text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0058BE]/15 focus:border-[#0058BE] transition"
                    placeholder="e.g. Featured, Seasonal"
                  />
                </div>
              </div>

              <AdminTextarea
                id="description"
                name="description"
                label="Description"
                placeholder="Write a brief overview of what this category contains..."
                rows={5}
                register={register}
                setValue={setValue}
                watch={watch}
                error={errors.description}
              />
            </div>
          </AdminCard>

          {/* Card 2: Category Specifications */}
          <AdminCard
            icon={<LuLayers size={19} className="text-[#007472]" />}
            title="Category Specifications & Filter Attributes"
            subtitle="Define filterable specifications for products in this category"
          >
            <div className="space-y-4">
              {specs.length > 0 && (
                <div className="grid grid-cols-12 gap-3 px-1 text-label-sm font-bold uppercase tracking-wider text-neutral-500">
                  <div className="col-span-5">Specification Name</div>
                  <div className="col-span-6">Specification Value / Tags</div>
                  <div className="col-span-1 text-center"></div>
                </div>
              )}

              <div className="space-y-3">
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-3 items-center"
                  >
                    <div className="col-span-5">
                      <input
                        type="text"
                        placeholder="e.g. Material, Season"
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
                        placeholder="e.g. Wool, Handcrafted, Winter"
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

              <button
                type="button"
                onClick={handleAddSpec}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0058BE] bg-white border border-[#0058BE]/40 rounded-xl hover:bg-[#0058BE]/5 transition-colors"
              >
                <LuPlus size={15} />
                Add More Specification
              </button>

              {/* Keywords & Tags */}
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
                    placeholder="Type keyword and press Add..."
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
          {/* Card 1: Category Media */}
          <AdminCard
            icon={<LuImage size={19} className="text-[#0058BE]" />}
            title="Category Media"
            subtitle="Upload banner icon or representative image"
          >
            <AdminMediaUpload
              id="category-image"
              mainName="image"
              setValue={setValue}
              error={errors.image as any}
              defaultMainPreview={defaultValues?.imageUrl}
              isEdit={isEdit}
              allowMultiple={false}
            />
          </AdminCard>

          {/* Card 2: Display & Placement */}
          <AdminCard
            icon={<LuReceipt size={19} className="text-[#007472]" />}
            title="Display & Placement"
            subtitle="Storefront ordering and menu visibility"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="block text-xs font-semibold text-neutral-800">
                    Display Priority
                  </label>
                  <input
                    type="number"
                    defaultValue="1"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/70 text-sm text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0058BE]/15 focus:border-[#0058BE] transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="block text-xs font-semibold text-neutral-800">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Popular, New"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/70 text-sm text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0058BE]/15 focus:border-[#0058BE] transition"
                  />
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Card 3: Status & Visibility */}
          <AdminCard
            icon={<LuSlidersHorizontal size={19} className="text-[#091426]" />}
            title="Status & Visibility"
            subtitle="Control whether this category is active in the storefront"
          >
            <div>
              <label className="block text-xs font-semibold text-neutral-800 mb-2">
                Category Status *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                    String(watch("isActive")) === "true" ||
                    watch("isActive") === true
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
                    String(watch("isActive")) === "false" ||
                    watch("isActive") === false
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
          </AdminCard>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-200/80">
        <button
          type="button"
          onClick={() => router.push("/admin/categories")}
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
              {isEdit ? "Update Category" : "Save & Continue"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}