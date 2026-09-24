"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import Image from "next/image";
import { FieldError, UseFormSetValue } from "react-hook-form";
import { LuCloudUpload, LuPlus, LuTrash2, LuX } from "react-icons/lu";
import ErrorMessage from "@/app/components/common/ui/error-message";

interface AdminMediaUploadProps {
  id?: string;
  mainName?: string;
  multipleName?: string;
  label?: string;
  required?: boolean;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
  defaultMainPreview?: string | null;
  defaultMultiplePreviews?: string[];
  isEdit?: boolean;
  accept?: string;
  maxSlots?: number;
  className?: string;
  allowMultiple?: boolean;
}

export default function AdminMediaUpload({
  id = "product-media-upload",
  mainName = "image",
  multipleName = "images",
  label = "Product Media",
  required = false,
  setValue,
  error,
  defaultMainPreview = null,
  defaultMultiplePreviews = [],
  isEdit = false,
  accept = "image/png,image/jpeg,image/webp,image/jpg",
  maxSlots = 4,
  className = "",
  allowMultiple = true,
}: AdminMediaUploadProps) {
  const [mainPreview, setMainPreview] = useState<string | null>(defaultMainPreview);
  const [extraPreviews, setExtraPreviews] = useState<string[]>(defaultMultiplePreviews);
  const [isDragging, setIsDragging] = useState(false);

  const mainInputRef = useRef<HTMLInputElement | null>(null);
  const extraInputRef = useRef<HTMLInputElement | null>(null);

  // Sync with default values if they update asynchronously
  React.useEffect(() => {
    if (defaultMainPreview) setMainPreview(defaultMainPreview);
  }, [defaultMainPreview]);

  React.useEffect(() => {
    if (defaultMultiplePreviews.length > 0) setExtraPreviews(defaultMultiplePreviews);
  }, [defaultMultiplePreviews]);

  // Handle main file selection
  const handleMainFile = (file: File) => {
    setValue(mainName, file, { shouldValidate: true, shouldDirty: true });
    const reader = new FileReader();
    reader.onloadend = () => {
      setMainPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle additional files
  const handleExtraFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (!fileArray.length) return;

    if (!mainPreview && fileArray.length > 0) {
      // If no main image exists yet, assign the first as main
      handleMainFile(fileArray[0]);
      if (fileArray.length > 1 && allowMultiple) {
        const remaining = fileArray.slice(1);
        setValue(multipleName, remaining, { shouldValidate: true, shouldDirty: true });
        loadExtraPreviews(remaining);
      }
      return;
    }

    if (allowMultiple) {
      setValue(multipleName, fileArray, { shouldValidate: true, shouldDirty: true });
      loadExtraPreviews(fileArray);
    }
  };

  const loadExtraPreviews = (fileArray: File[]) => {
    const newPreviews: string[] = [];
    let loaded = 0;
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        loaded++;
        if (loaded === fileArray.length) {
          setExtraPreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMainImage = () => {
    setMainPreview(null);
    setValue(mainName, null, { shouldValidate: true, shouldDirty: true });
    if (mainInputRef.current) mainInputRef.current.value = "";
  };

  const removeExtraImage = (index: number) => {
    const updated = extraPreviews.filter((_, i) => i !== index);
    setExtraPreviews(updated);
    setValue(multipleName, updated, { shouldValidate: true, shouldDirty: true });
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (!mainPreview) {
        handleMainFile(e.dataTransfer.files[0]);
        if (e.dataTransfer.files.length > 1 && allowMultiple) {
          handleExtraFiles(Array.from(e.dataTransfer.files).slice(1));
        }
      } else if (allowMultiple) {
        handleExtraFiles(e.dataTransfer.files);
      }
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Hidden inputs */}
      <input
        type="file"
        id={`${id}-main`}
        ref={mainInputRef}
        accept={accept}
        className="hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            handleMainFile(e.target.files[0]);
          }
        }}
      />
      <input
        type="file"
        id={`${id}-extra`}
        ref={extraInputRef}
        accept={accept}
        multiple
        className="hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            handleExtraFiles(e.target.files);
          }
        }}
      />

      {/* Primary Dropzone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => {
          if (!mainPreview) {
            mainInputRef.current?.click();
          } else if (allowMultiple) {
            extraInputRef.current?.click();
          } else {
            mainInputRef.current?.click();
          }
        }}
        className={`w-full rounded-2xl border-2 border-dashed p-7 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
          isDragging
            ? "border-[#0058BE] bg-[#0058BE]/5 scale-[0.99]"
            : error
            ? "border-red-400 bg-red-50/30 hover:border-red-500"
            : "border-neutral-300/80 bg-neutral-50/60 hover:border-[#0058BE] hover:bg-neutral-50"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-neutral-200/60 flex items-center justify-center text-neutral-700 mb-3 group-hover:bg-[#0058BE]/10 group-hover:text-[#0058BE] transition-colors">
          <LuCloudUpload size={24} />
        </div>

        <p className="text-sm font-semibold text-neutral-800 mb-1">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-neutral-500">
          PNG, JPG or WEBP up to 10MB
        </p>
      </div>

      {error && <ErrorMessage message={error.message as string} />}

      {/* Thumbnail Slots Row matching reference */}
      <div className="pt-1">
        <div className="grid grid-cols-4 gap-2.5">
          {/* Slot 1: Main Image Preview or Placeholder */}
          {mainPreview ? (
            <div className="relative aspect-square rounded-xl border-2 border-[#0058BE]/40 bg-neutral-100 overflow-hidden group shadow-xs">
              <Image
                src={mainPreview}
                alt="Main product media"
                fill
                className="object-cover"
              />
              <span className="absolute bottom-1 left-1 bg-[#091426]/80 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                Main
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeMainImage();
                }}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-90 hover:opacity-100 transition-opacity"
                title="Remove main image"
              >
                <LuTrash2 size={11} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => mainInputRef.current?.click()}
              className="aspect-square rounded-xl border border-neutral-300 border-dashed bg-neutral-50/80 hover:bg-neutral-100 flex flex-col items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors"
              title="Add main image"
            >
              <LuPlus size={18} />
              <span className="text-[10px] font-medium mt-1">Main</span>
            </button>
          )}

          {/* Additional Images Slots */}
          {extraPreviews.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl border border-neutral-200 bg-neutral-100 overflow-hidden group shadow-xs"
            >
              <Image
                src={src}
                alt={`Media thumbnail ${index + 2}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeExtraImage(index);
                }}
                className="absolute top-1 right-1 bg-neutral-900/70 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                title="Remove image"
              >
                <LuX size={11} />
              </button>
            </div>
          ))}

          {/* Remaining placeholder slots with '+' icon to complete the 4-box row from reference */}
          {Array.from({
            length: Math.max(
              0,
              4 - (mainPreview ? 1 : 0) - extraPreviews.length
            ),
          }).map((_, idx) => (
            <button
              key={`empty-slot-${idx}`}
              type="button"
              onClick={() => {
                if (!mainPreview) {
                  mainInputRef.current?.click();
                } else if (allowMultiple) {
                  extraInputRef.current?.click();
                } else {
                  mainInputRef.current?.click();
                }
              }}
              className="aspect-square rounded-xl border border-neutral-300 border-dashed bg-neutral-50/80 hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:border-neutral-400 transition-colors cursor-pointer"
              title={allowMultiple ? "Upload media" : "Change media"}
            >
              <LuPlus size={20} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
