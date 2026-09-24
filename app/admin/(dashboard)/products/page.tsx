"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProductTable, { IProductAdmin } from "@/app/components/admin/table/product.table";
import CreateButton from "@/app/components/common/table/create-button";
import Pagination from "@/app/components/common/table/pagination";
import { getProducts, deleteProduct } from "@/api/admin/product.api";
import { confirmDeleteToast } from "@/app/components/common/ui/confirm-dialog";

const ITEMS_PER_PAGE = 10;

const ProductsPage = () => {
  const router = useRouter();

  const [products, setProducts] = useState<IProductAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      const data = await getProducts({
        page,
        limit: ITEMS_PER_PAGE,
      });

      setProducts(data.data || data.products || []);
      setTotalItems(data.meta?.total || data.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleView = (product: IProductAdmin) => {
  router.push(`/admin/products/${product._id}`);
};

const handleEdit = (product: IProductAdmin) => {
  router.push(`/admin/products/${product._id}/edit`);
};

  const handleDelete = (id: string | number) => {
    confirmDeleteToast({
      message: "Are you sure you want to delete this product?",
      onConfirm: async () => {
        try {
          await deleteProduct(String(id));
          toast.success("Product deleted successfully");
          fetchProducts(currentPage);
        } catch (error: any) {
          toast.error(error?.message ?? "Failed to delete product");
        }
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header and Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your store's inventory and listings
          </p>
        </div>

        <CreateButton label="Create Product" href="/admin/products/create" />
      </div>

      {/* Table */}
      <ProductTable
        products={products}
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

export default ProductsPage;