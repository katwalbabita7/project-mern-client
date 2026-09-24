"use client";

import React, { useEffect, useState, useCallback } from "react";
import { LuSearch, LuShoppingBag, LuRefreshCw } from "react-icons/lu";
import OrderTable from "@/app/components/admin/table/order.table";
import OrderDetailsModal from "@/app/components/admin/orders/order-details-modal";
import Pagination from "@/app/components/common/table/pagination";
import { getAllOrders } from "@/api/admin/order.api";
import { IOrder } from "@/app/types/order.types";
import { OrderStatus } from "@/app/types/enum.types";

const ITEMS_PER_PAGE = 10;

const statusTabs = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: OrderStatus.PENDING },
  { label: "Processing", value: OrderStatus.PROCESSING },
  { label: "Shipped", value: OrderStatus.SHIPPED },
  { label: "Delivered", value: OrderStatus.DELIVERED },
  { label: "Cancelled", value: OrderStatus.CANCELLED },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllOrders({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        status: activeStatus === "all" ? undefined : activeStatus,
        search: searchQuery.trim() || undefined,
      });

      setOrders(res.data || []);
      setTotalItems(res.meta?.total || 0);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, activeStatus, searchQuery]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusTabChange = (status: string) => {
    setActiveStatus(status);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchOrders();
  };

  const handleViewOrder = (order: IOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <LuShoppingBag className="text-[#0058BE]" /> Customer Orders
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage customer purchases, delivery addresses, and update order statuses.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 shadow-xs cursor-pointer transition-colors self-start sm:self-auto"
        >
          <LuRefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-100 pb-3">
          {statusTabs.map((tab) => {
            const isActive = activeStatus === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => handleStatusTabChange(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#091426] text-white"
                    : "bg-neutral-100 text-gray-600 hover:bg-neutral-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order #, Customer Name, or Phone..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0058BE] focus:border-transparent"
            />
            <LuSearch
              size={15}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#0058BE] hover:bg-secondary-700 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Orders Table */}
      <OrderTable
        orders={orders}
        loading={loading}
        onViewOrder={handleViewOrder}
        onOrderUpdated={fetchOrders}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
      />

      {/* Order Details & Status Update Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        onOrderUpdated={fetchOrders}
      />
    </div>
  );
}