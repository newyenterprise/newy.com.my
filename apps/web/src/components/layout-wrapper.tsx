"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { Footer } from "./footer";
import { ChatAssistant } from "./chat-assistant";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Hide navigation and footer for dashboard and admin routes
  const isDashboardRoute = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin');
  
  return (
    <>
      {!isDashboardRoute && <Navigation />}
      <main className={isDashboardRoute ? "" : "pt-16"}>
        {children}
      </main>
      {!isDashboardRoute && <Footer />}
      {!isDashboardRoute && <ChatAssistant />}
    </>
  );
}
