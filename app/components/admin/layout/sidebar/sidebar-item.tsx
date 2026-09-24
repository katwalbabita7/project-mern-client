// components/admin/layout/sidebar/sidebar-item.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface SidebarItemProps {
    href: string;
    label: string;
    icon: IconType;
    badge?: number | string; // Optional badge
}

const SidebarItem = ({ href, label, icon: Icon, badge }: SidebarItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname?.startsWith(href + '/');

    return (
        <Link
            href={href}
            className={`
                flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium 
                transition-all duration-200 ease-in-out
                ${isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-neutral-600 hover:bg-primary-50 hover:text-primary-700'
                }
            `}
        >
            <Icon 
                size={18} 
                className={`
                    transition-colors duration-200 shrink-0
                    ${isActive ? 'text-primary-500' : 'text-neutral-400'}
                `}
            />
            <span className="flex-1">{label}</span>
            
            {/* Badge */}
            {badge && (
                <span className={`
                    text-xs font-medium px-2 py-0.5 rounded-full
                    ${isActive 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'bg-neutral-100 text-neutral-600'
                    }
                `}>
                    {badge}
                </span>
            )}
        </Link>
    );
};

export default SidebarItem;