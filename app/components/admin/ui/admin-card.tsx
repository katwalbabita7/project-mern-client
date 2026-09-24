"use client";

import React from "react";

interface AdminCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function AdminCard({
  icon,
  title,
  subtitle,
  action,
  children,
  className = "",
}: AdminCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-5 sm:p-6 transition-all ${className}`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="text-[#091426] flex items-center justify-center">
              {icon}
            </div>
          )}
          <div>
            <h2 className="text-base font-semibold text-[#091426] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
