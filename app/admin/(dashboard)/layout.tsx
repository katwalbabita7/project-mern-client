// app/admin/layout.tsx

import Header from "@/app/components/admin/layout/header/header";
import Sidebar from "@/app/components/admin/layout/sidebar/sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex h-screen bg-neutral-50'>
            {/* Sidebar - Fixed */}
            <Sidebar />

            {/* Main Content Area */}
            <div className='flex-1 flex flex-col ml-64'>
                {/* Header - Top */}
                <Header 
                    title="Dashboard" 
                    subtitle="Welcome to Admin Panel"
                />

                {/* Main Content */}
                <main className='flex-1 overflow-y-auto p-6'>
                    {children}
                </main>
            </div>
        </div>
    );
}