import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirect') || '/profile';
  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  // Clear-Site-Data header instructs modern browsers to wipe all cookies and storage for localhost
  response.headers.set('Clear-Site-Data', '"cookies", "storage"');

  // Also explicitly expire known supabase cookie names
  const cookies = request.cookies.getAll();
  cookies.forEach((c) => {
    response.cookies.set(c.name, '', { maxAge: 0, path: '/' });
  });

  return response;
}
