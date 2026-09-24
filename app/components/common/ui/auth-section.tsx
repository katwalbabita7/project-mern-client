"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useClientAuthStore } from "@/store/clientAuthStore";
import { logoutUser, getProfile } from "@/api/client/auth.api";
import { Role } from "@/app/types/enum.types";

const AuthSection = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout, setUser } = useClientAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated && !user?.full_name) {
      getProfile()
        .then((res) => {
          if (res?.data) setUser(res.data);
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.error(e);
    } finally {
      logout();
      // 2. Client tokens clear
      localStorage.removeItem("client_token");
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");

      // 3. Admin token + cookie pani clear (safety)
      localStorage.removeItem("admin_token");
      document.cookie = "access_token=; path=/; max-age=0";

      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-16 h-8 bg-neutral-100 animate-pulse rounded"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    const displayName = user.full_name || user.name || user.email?.split("@")[0] || "User";
    const profileImg = user.profile_image?.path;
    const isAdmin = user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN;

    return (
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="flex items-center gap-2.5 hover:opacity-85 transition-opacity"
          title="Go to Profile"
        >
          <div className="h-10 w-10 rounded-full border border-secondary-500 overflow-hidden bg-neutral-100 flex items-center justify-center text-primary-900 font-bold text-sm">
            {profileImg ? (
              <Image
                src={profileImg}
                alt={displayName}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{displayName.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-semibold text-sm text-primary-900 leading-tight">
              {displayName}
            </span>
            <span className="text-xs text-neutral-500">View Profile</span>
          </div>
        </Link>

        {isAdmin && (
          <Link
            href="/admin/dashboard"
            className="text-xs bg-primary-800 text-white font-medium px-2.5 py-1 rounded hover:bg-primary-900 transition-colors"
          >
            Admin
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="text-xs font-semibold text-danger hover:text-danger-hover border border-red-200 hover:bg-red-50 px-2.5 py-1 rounded transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div >
      <Link
        href="/login"
        className="text-sm font-semibold text-white bg-[#0058BE] hover:bg-secondary-700 px-3.5 py-1.5 rounded-md shadow-sm transition-colors"
      >
        Login
      </Link>
    </div>
  );
};

export default AuthSection;