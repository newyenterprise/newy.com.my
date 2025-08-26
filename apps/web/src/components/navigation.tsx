"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@digitallinked/ui";
import { Menu, X, LogIn, User } from "lucide-react";
import { InstantQuoteModal } from "./instant-quote-modal";
import { useAuth } from "@/contexts/auth-context";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { user } = useAuth();

  const navigation = [
    { name: "Website", href: "/website" },
    { name: "Apps", href: "/apps" },
    { name: "AI Automation", href: "/ai-automation" },
    { name: "Marketing", href: "/marketing" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-purple-500/20">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
            <span className="text-xl font-bold gradient-text">Digital Linked</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-purple-400 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              className="btn-primary"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Instant Quote
            </Button>
            {user ? (
              <Link href="/dashboard" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-purple-400">
                <User className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link href="/auth/login" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-purple-400">
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-purple-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-purple-500/20">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-purple-400 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
                             <div className="px-3 py-2 space-y-2">
                 <Button 
                   className="btn-primary w-full"
                   onClick={() => {
                     setIsQuoteModalOpen(true);
                     setIsOpen(false);
                   }}
                 >
                   Instant Quote
                 </Button>
                 {user ? (
                   <Link
                     href="/dashboard"
                     className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-purple-400 transition-colors duration-200"
                     onClick={() => setIsOpen(false)}
                   >
                     <User className="h-4 w-4" />
                     <span>Dashboard</span>
                   </Link>
                 ) : (
                   <Link
                     href="/auth/login"
                     className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-purple-400 transition-colors duration-200"
                     onClick={() => setIsOpen(false)}
                   >
                     <LogIn className="h-4 w-4" />
                     <span>Login</span>
                   </Link>
                 )}
               </div>
            </div>
          </div>
        )}
      </div>
      
      <InstantQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </nav>
  );
}
