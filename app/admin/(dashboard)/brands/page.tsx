"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import BrandTable, { IBrand } from "@/app/components/admin/table/brand.table";
import CreateButton from "@/app/components/common/table/create-button";
import Pagination from "@/app/components/common/table/pagination";
import { getBrands, deleteBrand } from "@/api/admin/brand.api";
import { confirmDeleteToast } from "@/app/components/common/ui/confirm-dialog";

const ITEMS_PER_PAGE = 10;

const BrandPage = () => {
  const router = useRouter();

  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Fetch data from the backend
  const fetchBrands = async (page: number) => {
    try {
      setLoading(true);

      const data = await getBrands({
        page,
        limit: ITEMS_PER_PAGE,
      });

      // Adjust according to the backend response
      setBrands(data.data || data.brands || data);
      setTotalItems(data.total || data.meta?.total || 0);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands(currentPage);
  }, [currentPage]);

  // Handlers
  const handleView = (brand: IBrand) => {
    router.push(`/admin/brands/${brand._id}`);
  };

  const handleEdit = (brand: IBrand) => {
    router.push(`/admin/brands/${brand._id}/edit`);
  };

  const handleDelete = (id: string | number) => {
    confirmDeleteToast({
      message: "Are you sure you want to delete this brand?",
      onConfirm: async () => {
        try {
          await deleteBrand(String(id));
          toast.success("Brand deleted successfully");
          fetchBrands(currentPage);
        } catch (error: any) {
          toast.error(error?.message ?? "Failed to delete brand");
        }
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header and Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Brands</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product brands
          </p>
        </div>

        <CreateButton label="Create Brand" href="/admin/brands/create" />
      </div>

      {/* Table */}
      <BrandTable
        brands={brands}
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

export default BrandPage;