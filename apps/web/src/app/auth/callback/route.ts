import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (code) {
    // Create a Supabase client for server-side
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.session) {
      // Create response with redirect
      const response = NextResponse.redirect(new URL(next, requestUrl.origin));
      
      // Set the session cookie (Supabase handles this automatically via the client)
      // The session will be available on the client side after redirect
      
      return response;
    }
  }

  // If there's an error, redirect to login
  return NextResponse.redirect(new URL('/auth/login?error=authentication_failed', requestUrl.origin));
}

