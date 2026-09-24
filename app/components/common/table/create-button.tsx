"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

interface IProps {
  label?: string;       
  href: string;           
  className?: string;
}

const CreateButton = ({
  label = "Create",
  href,
  className = "",
}: IProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className={`
        inline-flex items-center gap-2 
        bg-blue-600 hover:bg-blue-700 
        text-white text-sm font-medium 
        px-4 py-2 rounded-lg 
        transition shadow-sm
        ${className}
      `}
    >
      <FaPlus size={13} />
      {label}
    </button>
  );
};

export default CreateButton;