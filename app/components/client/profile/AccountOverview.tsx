"use client";

import { AccountOverviewProps } from "@/app/types/client/profile";
import { LuTrash2 } from "react-icons/lu";
import { confirmDeleteToast } from "../../common/ui/confirm-dialog";

const AccountOverview = ({ user, onDeleteAccount, isDeleting }: AccountOverviewProps) => {
  const handleDeleteClick = () => {
    confirmDeleteToast({
      message:
        "Are you sure you want to permanently delete your account? ",
      onConfirm: onDeleteAccount,
    });
  };
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-[#091426]">Personal Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <span className="text-xs text-neutral-500 block">Full Name</span>
          <span className="font-semibold text-sm text-[#091426]">{user?.full_name || "N/A"}</span>
        </div>

        <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <span className="text-xs text-neutral-500 block">Email Address</span>
          <span className="font-semibold text-sm text-[#091426]">{user?.email || "N/A"}</span>
        </div>

        <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <span className="text-xs text-neutral-500 block">Phone Number</span>
          <span className="font-semibold text-sm text-[#091426]">{user?.phone || "N/A"}</span>
        </div>

        <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <span className="text-xs text-neutral-500 block">Account Status</span>
          <span className="font-semibold text-sm text-emerald-600">Active</span>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="pt-6 border-t border-neutral-200 space-y-3">
        <h4 className="text-base font-bold text-red-600">Danger Zone</h4>
        {/* <p className="text-xs text-neutral-500">
          Deleting your account will remove your profile, saved wishlist, and cart permanently.
        </p> */}
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2 cursor-pointer"
        >
          <LuTrash2 size={16} /> Delete My Account
        </button>
      </div>
    </div>
  );
};

export default AccountOverview;