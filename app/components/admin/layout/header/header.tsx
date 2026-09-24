// components/admin/layout/header/header.tsx (with breadcrumbs)

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  IoNotificationsOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoChevronDown,
  IoHomeOutline,
} from 'react-icons/io5';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showActions?: boolean;
  dynamicTitle?: boolean;
  showBreadcrumb?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Dashboard',
  subtitle = 'Welcome to Admin Panel',
  showActions = true,
  dynamicTitle = true,
  showBreadcrumb = true,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const pathname = usePathname();

  // Page titles based on route
  const getPageTitle = () => {
    const titles: Record<string, { title: string; subtitle: string }> = {
      '/admin': { 
        title: 'Dashboard', 
        subtitle: 'Welcome back! Here\'s what\'s happening with your store today.' 
      },
      '/admin/products': { 
        title: 'Products', 
        subtitle: 'Manage your inventory, update pricing, and track stock levels.' 
      },
      '/admin/brands': { 
        title: 'Brands', 
        subtitle: 'Manage your product brands and collections.' 
      },
      '/admin/categories': { 
        title: 'Categories', 
        subtitle: 'Organize your products with categories and subcategories.' 
      },
      '/admin/orders': { 
        title: 'Orders', 
        subtitle: 'Track, manage, and fulfill customer orders.' 
      },
      '/admin/users': { 
        title: 'Users', 
        subtitle: 'Manage user accounts, roles, and permissions.' 
      },
      '/admin/settings': { 
        title: 'Settings', 
        subtitle: 'Configure your store settings and preferences.' 
      },
    };

    if (pathname && titles[pathname]) {
      return titles[pathname];
    }

    // Handle dynamic routes
    if (pathname?.startsWith('/admin/products/')) {
      return { 
        title: 'Product Details', 
        subtitle: 'View and manage product information.' 
      };
    }

    return { title: title || 'Dashboard', subtitle: subtitle || 'Welcome to Admin Panel' };
  };

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    if (!pathname) return [];
    
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    // Always show Home
    breadcrumbs.push({ label: 'Home', href: '/admin' });
    
    // Build breadcrumbs
    let currentPath = '';
    for (let i = 0; i < paths.length; i++) {
      currentPath += `/${paths[i]}`;
      
      // Skip 'admin' as it's already Home
      if (paths[i] === 'admin') continue;
      
      // Capitalize label
      const label = paths[i].charAt(0).toUpperCase() + paths[i].slice(1);
      
      // Check if it's a dynamic ID (number)
      const isDynamic = /^\d+$/.test(paths[i]);
      
      breadcrumbs.push({
        label: isDynamic ? `#${paths[i]}` : label,
        href: currentPath,
        isDynamic,
      });
    }
    
    return breadcrumbs;
  };

  const pageInfo = dynamicTitle ? getPageTitle() : { title, subtitle };
  const displayTitle = pageInfo.title || title;
  const displaySubtitle = pageInfo.subtitle || subtitle;
  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
      <div className="px-6 py-4">
        {/* Breadcrumb */}
        {showBreadcrumb && breadcrumbs.length > 1 && (
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                {index > 0 && <span className="text-neutral-300">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-primary-600 font-medium">
                    {crumb.label}
                  </span>
                ) : (
                  <Link 
                    href={crumb.href}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {index === 0 ? <IoHomeOutline className="w-4 h-4 inline" /> : crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          {/* Left Side - Title */}
          <div className="flex-1">
            <h1 className="headline-lg text-primary-900">{displayTitle}</h1>
            {displaySubtitle && (
              <p className="body-sm text-neutral-600 mt-0.5">{displaySubtitle}</p>
            )}
          </div>

          {/* Right Side - Actions */}
          {showActions && (
            <div className="flex items-center gap-4 ml-4">
              {/* Notifications */}
              <button className="relative p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
                <IoNotificationsOutline className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 p-2 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    AU
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="label-sm text-primary-900">Admin User</p>
                    <p className="body-xs text-neutral-500">Administrator</p>
                  </div>
                  <IoChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-dropdown border border-neutral-200 py-1 z-dropdown animate-fade-in">
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <p className="label-sm text-primary-900">Admin User</p>
                      <p className="body-xs text-neutral-500">admin@example.com</p>
                    </div>
                    
                    <Link
                      href="/admin/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                    >
                      <IoPersonOutline className="w-4 h-4" />
                      Profile
                    </Link>
                    
                    <Link
                      href="/admin/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                    >
                      <IoSettingsOutline className="w-4 h-4" />
                      Settings
                    </Link>
                    
                    <hr className="my-1 border-neutral-200" />
                    
                    <button
                      onClick={() => {
                        console.log('Logout');
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger-50 w-full transition-colors"
                    >
                      <IoLogOutOutline className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;