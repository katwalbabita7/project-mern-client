"use client";

import { LuChevronDown, LuChevronUp } from "react-icons/lu";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs transition">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-[#091426] hover:text-[#0058BE] transition cursor-pointer"
      >
        <span>{question}</span>
        {isOpen ? (
          <LuChevronUp className="text-[#0058BE] shrink-0" size={18} />
        ) : (
          <LuChevronDown className="text-neutral-400 shrink-0" size={18} />
        )}
      </button>

      {isOpen && (
        <div className="px-4 sm:px-5 pb-5 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;