import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getCleanSupabaseUrl, isSupabaseConfigured } from '@/lib/supabase/client';

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Automatically purge any oversized or legacy base64 cookie chunks
  const allCookies = request.cookies.getAll();
  for (const cookie of allCookies) {
    if (
      cookie.value.includes('data%3Aimage') ||
      cookie.value.includes('data:image') ||
      (cookie.name.startsWith('sb-') && cookie.value.length > 2500)
    ) {
      supabaseResponse.cookies.set(cookie.name, '', {
        maxAge: 0,
        path: '/',
      });
    }
  }

  if (!isSupabaseConfigured()) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(
      getCleanSupabaseUrl(),
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh user session if present
    await supabase.auth.getUser();
  } catch (err) {
    // If auth session refresh fails, continue request without blocking
    console.error('Middleware auth check error:', err);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
