"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  LuPackage,
  LuBanknote,
  LuMapPin,
  LuCalendar,
  LuClock,
  LuArrowRight,
} from "react-icons/lu";
import { getMyOrders } from "@/api/client/order.api";
import { IOrder } from "@/app/types/order.types";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/app/components/common/table/order-status-badge";

export const MyOrders: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });

  const orders: IOrder[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="h-40 bg-neutral-100 rounded-xl animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center text-sm">
        Failed to load your orders. Please try again.
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-blue-50 text-[#0058BE] rounded-full flex items-center justify-center mx-auto">
          <LuPackage size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">No Orders Yet</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          You haven't placed any orders yet. Explore our products and order with Cash on Delivery!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#0058BE] hover:bg-secondary-700 text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Browse Products <LuArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return (
          <div
            key={order._id}
            className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow"
          >
  {/* Card Header */}
<div className="bg-neutral-50 px-5 py-3.5 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-sm">
  <div className="flex items-center gap-3">
    <span className="font-mono font-bold text-gray-900">
      {order.orderNumber}
    </span>
    <span className="text-gray-400">•</span>
    <span className="flex items-center gap-1 text-gray-500 text-xs">
      <LuCalendar size={13} /> {orderDate}
    </span>
  </div>

  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-gray-500 font-medium">Order:</span>
      <OrderStatusBadge status={order.orderStatus} />
    </div>
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-gray-500 font-medium">Payment:</span>
      <PaymentStatusBadge status={order.paymentStatus} />
    </div>
  </div>
</div>

            {/* Card Content */}
            <div className="p-5 space-y-4">
              {/* Ordered Items List */}
              <div className="divide-y divide-neutral-100">
                {order.items.map((item, idx) => {
                  const itemImg = item.image || "/placeholder-product.png";
                  return (
                    <div
                      key={item._id || idx}
                      className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                          <Image
                            src={itemImg}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900 line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Quantity: {item.quantity} × Rs. {item.price.toLocaleString()}
                          </p>
                          {item.variant && (
                            <span className="inline-block bg-neutral-100 text-neutral-600 text-label-xs px-1.5 py-0.5 rounded mt-0.5">
                              {item.variant}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right font-semibold text-sm text-gray-900">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Meta & Delivery Info */}
              <div className="bg-neutral-50/70 rounded-xl p-4 border border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-semibold text-gray-700 flex items-center gap-1">
                    <LuMapPin size={13} className="text-[#0058BE]" /> Delivery Address:
                  </span>
                  <p className="text-gray-600">
                    {order.shippingAddress.fullName} ({order.shippingAddress.phone})
                  </p>
                  <p className="text-gray-500">
                    {order.shippingAddress.address}, {order.shippingAddress.city}
                  </p>
                </div>

                <div className="space-y-1 sm:text-right">
                  <span className="font-semibold text-gray-700 flex items-center sm:justify-end gap-1">
                    <LuBanknote size={14} className="text-emerald-600" /> Payment:
                  </span>
                  <p className="text-gray-600 font-medium">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-gray-500">
                    Shipping: {order.shippingFee === 0 ? "Free" : `Rs. ${order.shippingFee}`}
                  </p>
                </div>
              </div>

              {/* Order Total */}
              <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                <span className="text-xs text-gray-500">
                  Total ({order.items.length} item{order.items.length > 1 ? "s" : ""})
                </span>
                <div className="text-right">
                  <span className="text-xs text-gray-500 mr-2">Total Amount:</span>
                  <span className="font-bold text-base text-[#0058BE]">
                    Rs. {order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
