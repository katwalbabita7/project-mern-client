"use client";

import React, { useRef } from "react";
import { FieldError, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import {
  LuBold,
  LuItalic,
  LuUnderline,
  LuList,
  LuListOrdered,
  LuLink,
} from "react-icons/lu";
import ErrorMessage from "@/app/components/common/ui/error-message";

interface AdminTextareaProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
  watch?: UseFormWatch<any>;
  error?: FieldError;
  disabled?: boolean;
  className?: string;
}

export default function AdminTextarea({
  id,
  name,
  label,
  placeholder = "Describe in detail...",
  required = false,
  rows = 5,
  maxLength = 2000,
  register,
  setValue,
  watch,
  error,
  disabled = false,
  className = "",
}: AdminTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const registered = register(name);
  const currentValue = watch ? watch(name) : "";
  const charCount = typeof currentValue === "string" ? currentValue.length : 0;

  const insertFormatting = (prefix: string, suffix: string = "") => {
    if (!textareaRef.current || !setValue) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value || "";
    const selected = text.substring(start, end);
    const replacement = `${prefix}${selected || "text"}${suffix}`;
    const newText =
      text.substring(0, start) + replacement + text.substring(end);

    setValue(name, newText, { shouldValidate: true, shouldDirty: true });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selected ? selected.length : 4)
      );
    }, 10);
  };

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-neutral-800"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`rounded-xl border transition-all overflow-hidden bg-neutral-50/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0058BE]/15 focus-within:border-[#0058BE] ${
          error
            ? "border-red-500 bg-red-50/20"
            : "border-neutral-200"
        }`}
      >
        {/* Rich text style toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-neutral-200/70 bg-white/80 text-neutral-600 select-none">
          <button
            type="button"
            title="Bold"
            onClick={() => insertFormatting("**", "**")}
            className="p-1 rounded hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <LuBold size={14} />
          </button>
          <button
            type="button"
            title="Italic"
            onClick={() => insertFormatting("*", "*")}
            className="p-1 rounded hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <LuItalic size={14} />
          </button>
          <button
            type="button"
            title="Underline"
            onClick={() => insertFormatting("<u>", "</u>")}
            className="p-1 rounded hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <LuUnderline size={14} />
          </button>

          <span className="h-4 w-px bg-neutral-200 mx-1" />

          <button
            type="button"
            title="Bullet List"
            onClick={() => insertFormatting("\n- ")}
            className="p-1 rounded hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <LuList size={14} />
          </button>
          <button
            type="button"
            title="Numbered List"
            onClick={() => insertFormatting("\n1. ")}
            className="p-1 rounded hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <LuListOrdered size={14} />
          </button>
          <button
            type="button"
            title="Insert Link"
            onClick={() => insertFormatting("[", "](url)")}
            className="p-1 rounded hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <LuLink size={14} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          {...registered}
          ref={(e) => {
            registered.ref(e);
            textareaRef.current = e;
          }}
          className="w-full px-3.5 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 bg-transparent resize-none focus:outline-none"
        />

        {/* Character Count */}
        <div className="px-3 py-1.5 bg-transparent text-right border-t border-neutral-100">
          <span className="text-[11px] text-neutral-400 font-mono">
            {charCount}/{maxLength}
          </span>
        </div>
      </div>

      {error && <ErrorMessage message={error.message as string} />}
    </div>
  );
}
