"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LuUser, LuLock, LuMail, LuPackage } from "react-icons/lu";
import toast from "react-hot-toast";

import { getProfile, deleteAccount } from "@/api/client/auth.api";
import { useAuthStore } from "@/store/clientAuthStore";
import MyOrders from "@/app/components/client/orders/my-orders";
import ProfileHeader from "@/app/components/client/profile/ProfileHeader";
import AccountOverview from "@/app/components/client/profile/AccountOverview";
import ChangePasswordForm from "@/app/components/client/profile/ChangePasswordForm";
import ChangeEmailForm from "@/app/components/client/profile/ChangeEmailForm";



export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, logout, setUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "password" | "email">("overview");

  const { data: profileData, isLoading, refetch } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getProfile,
    enabled: isAuthenticated,
  });

  const user = profileData?.data;

  useEffect(() => {
    if (user) setUser(user);
  }, [user]);

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      logout();
      router.push("/");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to delete account");
    },
  });

  const handleDeleteAccount = () => {
  deleteAccountMutation.mutate();
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto">
          <LuUser size={36} />
        </div>
        <h2 className="text-2xl font-bold text-[#091426]">Sign In Required</h2>
        <p className="text-neutral-500 max-w-md mx-auto">
          Please log in to manage your account details and security settings.
        </p>
        <Link
          href="/login"
          className="inline-block bg-[#0058BE] hover:bg-secondary-700 text-white font-semibold px-6 py-2.5 rounded-md shadow-sm transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="h-64 bg-neutral-100 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <ProfileHeader user={user} />

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 gap-4 sm:gap-8 text-sm font-semibold overflow-x-auto">
        {[
          { id: "overview", label: "Account Overview", icon: <LuUser size={18} /> },
          { id: "orders", label: "My Orders", icon: <LuPackage size={18} /> },
          { id: "password", label: "Change Password", icon: <LuLock size={18} /> },
          { id: "email", label: "Change Email", icon: <LuMail size={18} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-[#0058BE] text-[#0058BE]"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs">
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="border-b border-neutral-200 pb-3 mb-4">
              <h3 className="text-lg font-bold text-[#091426]">My Orders</h3>
              <p className="text-xs text-gray-500">Track and view details of your recent orders</p>
            </div>
            <MyOrders />
          </div>
        )}

        {activeTab === "overview" && (
          <AccountOverview
            user={user}
            onDeleteAccount={handleDeleteAccount}
            isDeleting={deleteAccountMutation.isPending}
          />
        )}

        {activeTab === "password" && <ChangePasswordForm />}

        {activeTab === "email" && <ChangeEmailForm onSuccess={refetch} />}
      </div>
    </div>
  );
}