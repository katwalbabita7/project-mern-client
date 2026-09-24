"use client";

import Logo from "@/app/components/common/ui/logo";
import React from "react";
import NavLinks from "./nav-content";
import AuthSection from "@/app/components/common/ui/auth-section";
import Link from "next/link";
import { LuHeart, LuShoppingCart } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { getMyCart } from "@/api/client/cart.api";
import { getMyWishlist } from "@/api/client/wishlist.api";
import { useClientAuthStore } from "@/store/clientAuthStore";

const NavBar = () => {
  const { isAuthenticated } = useClientAuthStore();

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: getMyCart,
    enabled: isAuthenticated,
    staleTime: 1000 * 30,
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getMyWishlist,
    enabled: isAuthenticated,
    staleTime: 1000 * 30,
  });

  const cartItemCount =
    cartData?.data?.items?.reduce(
      (acc: number, item: any) => acc + (item.quantity || 1),
      0
    ) || 0;

  const wishlistItemCount = Array.isArray(wishlistData?.data)
    ? wishlistData.data.length
    : 0;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-200 shadow-xs">
      <nav className="h-18 max-w-7xl mx-auto flex items-center px-4 sm:px-6 lg:px-8 justify-between">
        {/* logo */}
        <div className="h-16 w-fit flex items-center">
          <Logo />
        </div>

          {/* links */}
          <div className="hidden md:flex">
            <NavLinks />
          </div>

          {/* actions: wishlist, cart & auth section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {isAuthenticated && (
              <>
                <Link
                  href="/wishlist"
                  className="relative p-2 text-neutral-700 hover:text-secondary-600 hover:bg-neutral-100 rounded-full transition-colors"
                  title="Wishlist"
                >
                  <LuHeart size={22} />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#007472] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {wishlistItemCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className="relative p-2 text-neutral-700 hover:text-secondary-600 hover:bg-neutral-100 rounded-full transition-colors"
                  title="Cart"
                >
                  <LuShoppingCart size={22} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#0058BE] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            <AuthSection />
          </div>
      </nav>
    </header>
  );
};

export default NavBar;