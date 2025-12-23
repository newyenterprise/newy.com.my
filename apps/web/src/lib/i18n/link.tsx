'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from './config';

export function useLocalizedPathname(pathname: string): string {
  const currentPathname = usePathname();
  // Detect locale from current pathname: if it starts with /bm, it's BM, otherwise English
  const locale = currentPathname?.startsWith('/bm') ? 'bm' : 'en';
  
  // Remove leading slash if present
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  
  // If pathname already includes locale, return as is
  if (cleanPath.startsWith('bm/')) {
    return `/${cleanPath}`;
  }
  
  // For English (default), no prefix needed
  if (locale === 'en') {
    return `/${cleanPath}`;
  }
  
  // For BM, add /bm prefix
  return `/bm/${cleanPath}`;
}

export function LocalizedLink({ 
  href, 
  children, 
  ...props 
}: { 
  href: string; 
  children: React.ReactNode;
  [key: string]: any;
}) {
  const pathname = usePathname();
  // Detect locale from pathname: if it starts with /bm, it's BM, otherwise English
  const locale = pathname?.startsWith('/bm') ? 'bm' : 'en';
  
  // If href already starts with /, check if it needs locale
  let localizedHref = href;
  if (href.startsWith('/')) {
    // Skip locale prefix for special routes
    const skipLocaleRoutes = ['/auth', '/dashboard', '/admin', '/checkout', '/quote', '/api', '/bm'];
    const shouldSkip = skipLocaleRoutes.some(route => href.startsWith(route));
    
    if (!shouldSkip) {
      // For English, use root path (no prefix)
      if (locale === 'en') {
        localizedHref = href;
      } else {
        // For BM, add /bm prefix
        localizedHref = `/bm${href}`;
      }
    }
  }
  
  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}

