"use client";

import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import ErrorMessage from "@/app/components/common/ui/error-message";
import { LuChevronDown } from "react-icons/lu";

type Option = {
  label: string;
  value: string | number;
};

interface AdminSelectProps {
  id: string;
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<any>;
  error?: FieldError;
  disabled?: boolean;
  className?: string;
}

export default function AdminSelect({
  id,
  name,
  label,
  options,
  placeholder = "Select an option",
  required = false,
  register,
  error,
  disabled = false,
  className = "",
}: AdminSelectProps) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-neutral-800"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <select
          id={id}
          disabled={disabled}
          {...register(name)}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-neutral-800 appearance-none pr-9
            bg-neutral-50/70 focus:bg-white transition-all
            focus:outline-none focus:ring-2 focus:ring-[#0058BE]/15 focus:border-[#0058BE]
            disabled:bg-neutral-100 disabled:cursor-not-allowed
            ${
              error
                ? "border-red-500 bg-red-50/20 focus:ring-red-500/20 focus:border-red-500"
                : "border-neutral-200"
            }
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-400">
          <LuChevronDown size={16} />
        </div>
      </div>

      {error && <ErrorMessage message={error.message as string} />}
    </div>
  );
}
