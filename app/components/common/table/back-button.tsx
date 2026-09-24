
"use client";

import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

interface BackButtonProps {
  href: string;           // kaha jane (e.g. "/admin/products")
  label?: string;         // default "Back"
  className?: string;
}

const BackButton = ({ href, label = "Back", className = "" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-800 transition ${className}`}
    >
      <HiArrowLeft size={16} />
      {label}
    </button>
  );
};

export default BackButton;