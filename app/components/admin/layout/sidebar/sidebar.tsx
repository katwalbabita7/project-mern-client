// components/admin/layout/sidebar/sidebar.tsx (with logout modal)
'use client';

import { useState } from 'react';
import {
    LuLayoutDashboard,
    LuUsers,
    LuPackage,
    LuTag,
    LuLayers,
    LuShoppingBag,
    LuLogOut,
    LuX,
} from "react-icons/lu";
import SidebarItem from "./sidebar-item";
import { useRouter } from "next/navigation";
import { adminLogout } from "@/api/admin/adminAuth.api";
import toast from "react-hot-toast";
import { useAdminAuthStore } from '@/store/adminAuthStore';

const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LuLayoutDashboard },
    { href: "/admin/orders", label: "Orders", icon: LuShoppingBag },
    { href: "/admin/products", label: "Products", icon: LuPackage },
    { href: "/admin/brands", label: "Brands", icon: LuTag },
    { href: "/admin/categories", label: "Categories", icon: LuLayers },
    { href: "/admin/users", label: "Users", icon: LuUsers },
];

const Sidebar = () => {
    const router = useRouter();
    const logout = useAdminAuthStore((state) => state.logout);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = async () => {
        try {
            await adminLogout();
        } catch (e) {
            console.error(e);
        } finally {
            logout();
            setShowLogoutModal(false);
            toast.success("Admin logged out");
            router.push('/admin/login');
        }
    };

    return (
        <>
            <aside className='h-screen w-64 border-r border-neutral-200 bg-white flex flex-col fixed left-0 top-0 z-40'>
                {/* Logo */}
                <div className='px-6 py-5 border-b border-neutral-200'>
                    <h1 className='headline-md text-primary-500'>Admin Panel</h1>
                    <p className='body-xs text-neutral-500'>Management Dashboard</p>
                </div>

                {/* Navigation Links */}
                <nav className='flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto'>
                    {navItems.map((item) => (
                        <SidebarItem key={item.href} {...item} />
                    ))}
                </nav>

                {/* Logout Button */}
                <div className='px-3 py-3 border-t border-neutral-200'>
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="
                            flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-medium 
                            text-neutral-600 hover:bg-danger-50 hover:text-danger-700
                            transition-all duration-200 ease-in-out
                            group
                        "
                    >
                        <LuLogOut 
                            size={18} 
                            className="text-neutral-400 group-hover:text-danger-500 transition-colors duration-200" 
                        />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="headline-sm text-primary-900">Confirm Logout</h3>
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="p-1 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors"
                            >
                                <LuX size={20} />
                            </button>
                        </div>
                        
                        <p className="body-md text-neutral-600 mb-6">
                            Are you sure you want to logout? You will need to login again to access the admin panel.
                        </p>
                        
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium text-white bg-danger hover:bg-danger-700 rounded-md transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;