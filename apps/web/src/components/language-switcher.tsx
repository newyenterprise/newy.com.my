"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n";
import { Button } from "@newy/ui";
import { Globe, ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Detect locale from pathname: if it starts with /bm, it's BM, otherwise English
  const currentLocale = pathname?.startsWith('/bm') ? 'bm' : 'en';

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }
    
    // Build new path based on locale
    let newPath = pathname || '/';
    
    if (newLocale === 'en') {
      // Switch to English: remove /bm prefix
      if (newPath.startsWith('/bm')) {
        newPath = newPath.replace('/bm', '') || '/';
      }
    } else {
      // Switch to BM: add /bm prefix
      if (!newPath.startsWith('/bm')) {
        newPath = `/bm${newPath === '/' ? '' : newPath}`;
      }
    }
    
    router.push(newPath);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-foreground hover:text-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span>{currentLocale.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3" />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-background border border-primary/20 rounded-lg shadow-lg p-1 min-w-[80px] z-50">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors text-left ${
                currentLocale === locale
                  ? "bg-primary/20 text-accent"
                  : "text-foreground hover:bg-primary/10"
              }`}
            >
              <span>{locale.toUpperCase()}</span>
              {currentLocale === locale && (
                <span className="text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

