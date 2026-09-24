"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CategoryTable, { ICategory } from "@/app/components/admin/table/category.table";
import CreateButton from "@/app/components/common/table/create-button";
import Pagination from "@/app/components/common/table/pagination";
import { getAllCategories, deleteCategory } from "@/api/admin/category.api";
import { confirmDeleteToast } from "@/app/components/common/ui/confirm-dialog";

const ITEMS_PER_PAGE = 10;

const CategoryPage = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const fetchCategories = async (page: number) => {
    try {
      setLoading(true);

      const data = await getAllCategories({
        page,
        limit: ITEMS_PER_PAGE,
      });

      setCategories(data.data || data.categories || data);
      setTotalItems(data.total || data.meta?.total || 0);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const handleView = (category: ICategory) => {
    router.push(`/admin/categories/${category._id}`);
  };

  const handleEdit = (category: ICategory) => {
    router.push(`/admin/categories/${category._id}/edit`);
  };

  const handleDelete = (id: string | number) => {
    confirmDeleteToast({
      message: "Are you sure you want to delete this category?",
      onConfirm: async () => {
        try {
          await deleteCategory(String(id));
          toast.success("Category deleted successfully");
          fetchCategories(currentPage);
        } catch (error: any) {
          toast.error(error?.message ?? "Failed to delete category");
        }
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product categories
          </p>
        </div>

        <CreateButton label="Create Category" href="/admin/categories/create" />
      </div>

      {/* Table */}
      <CategoryTable
        categories={categories}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
};

export default CategoryPage;