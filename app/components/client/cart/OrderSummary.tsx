"use client";

import { OrderSummaryProps } from "@/app/types/client/cart";
import { LuShieldCheck } from "react-icons/lu";
export default function OrderSummary({
  subtotal,
  totalSavings,
  shippingFee,
  totalAmount,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-6 sticky top-24">
        <h3 className="text-lg font-bold text-[#091426] border-b border-neutral-200 pb-3">
          Order Summary
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-neutral-600">
            <span>Subtotal</span>
            <span className="font-semibold text-neutral-900">
              Rs. {subtotal.toLocaleString()}
            </span>
          </div>

          {totalSavings > 0 && (
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>Discount Savings</span>
              <span>- Rs. {totalSavings.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between text-neutral-600">
            <span>Shipping</span>
            <span className="font-semibold text-neutral-900">
              {shippingFee === 0 ? (
                <span className="text-emerald-600 font-bold">FREE</span>
              ) : (
                `Rs. ${shippingFee}`
              )}
            </span>
          </div>

          {shippingFee > 0 && (
            <p className="text-label-sm text-neutral-500">
              Free shipping on orders above Rs. 2,000!
            </p>
          )}

          <div className="border-t border-neutral-200 pt-3 flex justify-between text-base font-bold text-[#091426]">
            <span>Total Payable</span>
            <span className="text-xl text-[#0058BE]">
              Rs. {totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          className="w-full bg-[#091426] hover:bg-[#0058BE] text-white font-bold py-3 rounded-md shadow-sm transition-colors text-center cursor-pointer"
        >
          Proceed to Checkout
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-2">
          <LuShieldCheck size={16} className="text-emerald-600" />
          <span>Safe & Secure Cash on Delivery</span>
        </div>
      </div>
    </div>
  );
}