"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@newy/ui";
import { 
  LayoutDashboard, 
  ShoppingCart,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Crown
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAdmin = user?.email === "admin@digitallinked.com.au" || user?.user_metadata?.role === "admin";

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, router, loading]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Purchase History", href: "/dashboard/purchases", icon: ShoppingCart },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

           return (
           <div className="h-screen bg-gray-50 flex overflow-hidden">
             {/* Mobile sidebar overlay */}
             {isSidebarOpen && (
               <div
                 className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                 onClick={() => setIsSidebarOpen(false)}
               />
             )}

             {/* Sidebar */}
             <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col ${
               isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
             }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <Image 
              src="/logo.png" 
              alt="DigitalLinked Logo" 
              width={120} 
              height={40} 
              className="h-8 w-auto"
              priority
            />
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

                       <nav className="flex-1 mt-8 px-4 overflow-y-auto">
                 <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  {item.name}
                </Link>
              );
            })}
            
            {/* Admin Link - Only visible to admins */}
            {isAdmin && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/admin"
                  className="group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Crown className="mr-3 h-5 w-5" />
                  Admin Panel
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.user_metadata?.name || user.email}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {isAdmin ? 'Administrator' : 'Client'}
              </p>
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="w-full border-gray-300 hover:bg-gray-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

                   {/* Main content */}
             <div className="flex-1 flex flex-col overflow-hidden">
               {/* Top bar */}
               <div className="bg-white shadow-sm border-b border-gray-200">
                 <div className="flex items-center justify-between h-16 px-6 lg:px-8">
                   <div className="flex items-center space-x-4">
                     <button
                       onClick={() => setIsSidebarOpen(true)}
                       className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                     >
                       <Menu className="h-6 w-6" />
                     </button>
                     <div className="hidden lg:block">
                       <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                       <p className="text-sm text-gray-500">Welcome back, {user.user_metadata?.name || 'User'}</p>
                     </div>
                   </div>
                   <div className="flex items-center space-x-4">
                     <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                       <span>•</span>
                       <span>{isAdmin ? 'Admin Access' : 'Client Portal'}</span>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Page content */}
               <main className="flex-1 overflow-y-auto bg-gray-50">
                 {children}
               </main>
             </div>
    </div>
  );
}
