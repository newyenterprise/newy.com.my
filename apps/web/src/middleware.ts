import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for:
  // - API routes
  // - Static files (images, fonts, etc.)
  // - Files with extensions
  // - Special routes that don't need locale
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/media/') ||
    pathname.includes('.') ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/quote')
  ) {
    return NextResponse.next();
  }

  // If pathname starts with /bm, it's Bahasa Malaysia - allow it through
  if (pathname.startsWith('/bm/') || pathname === '/bm') {
    return NextResponse.next();
  }

  // For root path or paths without /bm prefix, treat as English (default locale)
  // No redirect needed - English routes are at root level
  // But if user prefers BM and visits root, we could redirect them
  // For now, we'll keep English at root and BM at /bm
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - media (media files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|media|.*\\..*|auth|dashboard|admin|checkout|quote).*)',
  ],
};

