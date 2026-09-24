"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { FieldError, FieldErrorsImpl, Merge, UseFormSetValue } from "react-hook-form";
import ErrorMessage from "./error-message";

type FileUploadProps = {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  accept?: string;
  setValue: UseFormSetValue<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<{}>>;
  defaultPreview?: string | null;
  defaultPreviews?: string[]; // multiple edit
  isEdit?: boolean;
  multiple?: boolean;
  className?: string;
};

export default function FileUpload({
  id,
  name,
  label,
  required = false,
  accept = "image/png,image/jpeg,image/webp,image/svg+xml",
  setValue,
  error,
  defaultPreview = null,
  defaultPreviews = [],
  isEdit = false,
  multiple = false,
  className = "",
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultPreview);
  const [previews, setPreviews] = useState<string[]>(defaultPreviews);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (multiple) {
      // Multiple files
      const fileArray = Array.from(files);
      setValue(name, fileArray, { shouldValidate: true });

      const previewUrls: string[] = [];
      let loaded = 0;

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previewUrls.push(reader.result as string);
          loaded++;
          if (loaded === fileArray.length) {
            setPreviews([...previewUrls]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      // Single file
      const file = files[0];
      setValue(name, file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePreview = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  return (
    <div className={className}>
      <label className="block text-label-md text-primary-500 mb-1.5">
        {label} {required && !isEdit && <span className="text-red-500">*</span>}
      </label>

      <div className={`mt-2 flex flex-col items-center justify-center rounded-card border-2 border-dashed ${
        error ? "border-red-500 bg-red-50/30" : "border-neutral-300 bg-neutral-50"
      } p-6 hover:border-secondary-400 transition`}>
        
        {/*SINGLE PREVIEW*/}
        {!multiple && (
          <>
            {preview ? (
              <div className="relative w-28 h-28 mb-4">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="w-28 h-28 mb-4 flex items-center justify-center rounded-lg bg-neutral-200 text-neutral-900/50">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </>
        )}

        {/* MULTIPLE PREVIEWS*/}
        {multiple && (
          <div className="w-full mb-4">
            {previews.length > 0 ? (
              <div className="flex flex-wrap gap-3 justify-center">
                {previews.map((src, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <Image
                      src={src}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePreview(index)}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-28 h-28 mx-auto flex items-center justify-center rounded-lg bg-neutral-200 text-neutral-900/50">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        )}

        <label
          htmlFor={id}
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-button bg-secondary-500 text-white text-label-md hover:bg-secondary-600 transition"
        >
          {multiple
            ? previews.length > 0
              ? "Add More Files"
              : "Upload Files"
            : preview
            ? "Change File"
            : "Upload File"}
        </label>

        <input
          type="file"
          id={id}
          accept={accept}
          multiple={multiple} // ← multiple support
          onChange={handleChange}
          className="hidden"
        />

        <p className="mt-3 text-body-xs text-neutral-900/60 text-center">
          PNG, JPG, WEBP or SVG (max 2MB)
          {multiple && " • Multiple files allowed"}
        </p>
      </div>

      {error && <ErrorMessage message={error.message as string} />}
    </div>
  );
}