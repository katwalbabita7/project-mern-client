"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  LuPackage,
  LuLayers,
  LuTag,
  LuUsers,
  LuPlus,
  LuArrowRight,
  LuExternalLink,
} from "react-icons/lu";
import { getProducts } from "@/api/admin/product.api";
import { getAllCategories } from "@/api/admin/category.api";
import { getBrands } from "@/api/admin/brand.api";
import { getAllUsers } from "@/api/client/user.api";

export default function AdminDashboardPage() {
  const { data: productsData } = useQuery({
    queryKey: ["admin-dashboard-products"],
    queryFn: () => getProducts({ limit: 1 }),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["admin-dashboard-categories"],
    queryFn: () => getAllCategories({ limit: 1 }),
  });

  const { data: brandsData } = useQuery({
    queryKey: ["admin-dashboard-brands"],
    queryFn: () => getBrands({ limit: 1 }),
  });

  const { data: usersData } = useQuery({
    queryKey: ["admin-dashboard-users"],
    queryFn: getAllUsers,
  });

  const productCount = productsData?.meta?.total || productsData?.total || productsData?.data?.length || 0;
  const categoryCount = categoriesData?.meta?.total || categoriesData?.total || categoriesData?.data?.length || 0;
  const brandCount = brandsData?.meta?.total || brandsData?.total || brandsData?.data?.length || 0;
  const userCount = usersData?.data?.length || 0;

  const stats = [
    {
      title: "Products",
      count: productCount,
      icon: LuPackage,
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
      href: "/admin/products",
      createHref: "/admin/products/create",
    },
    {
      title: "Categories",
      count: categoryCount,
      icon: LuLayers,
      color: "bg-teal-600",
      bgLight: "bg-teal-50",
      textColor: "text-teal-700",
      href: "/admin/categories",
      createHref: "/admin/categories/create",
    },
    {
      title: "Brands",
      count: brandCount,
      icon: LuTag,
      color: "bg-indigo-600",
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-700",
      href: "/admin/brands",
      createHref: "/admin/brands/create",
    },
    {
      title: "Registered Users",
      count: userCount,
      icon: LuUsers,
      color: "bg-slate-800",
      bgLight: "bg-slate-50",
      textColor: "text-slate-800",
      href: "/admin/users",
    },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your store's performance and inventory
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-semibold px-4 py-2 rounded-md transition-colors w-fit"
        >
          View Storefront <LuExternalLink size={16} />
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bgLight} ${stat.textColor}`}>
                  <Icon size={24} />
                </div>
                {stat.createHref && (
                  <Link
                    href={stat.createHref}
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors"
                    title={`Create ${stat.title}`}
                  >
                    <LuPlus size={18} />
                  </Link>
                )}
              </div>

              <div>
                <span className="text-3xl font-extrabold text-gray-900">
                  {stat.count}
                </span>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                  {stat.title}
                </p>
              </div>

              <Link
                href={stat.href}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 pt-2 border-t border-neutral-100"
              >
                Manage {stat.title} <LuArrowRight size={12} />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-gray-900">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/products/create"
            className="inline-flex items-center gap-2 bg-[#091426] hover:bg-[#0058BE] text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors"
          >
            <LuPlus size={16} /> Add New Product
          </Link>
          <Link
            href="/admin/categories/create"
            className="inline-flex items-center gap-2 bg-[#007472] hover:bg-[#0f766e] text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors"
          >
            <LuPlus size={16} /> Add Category
          </Link>
          <Link
            href="/admin/brands/create"
            className="inline-flex items-center gap-2 bg-[#0058BE] hover:bg-[#0047a0] text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors"
          >
            <LuPlus size={16} /> Add Brand
          </Link>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-semibold px-4 py-2.5 rounded-md transition-colors"
          >
            <LuUsers size={16} /> View Users
          </Link>
        </div>
      </div>
    </div>
  );
}