import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  // 1. Clone the incoming request headers using standard Web API Headers constructor
  const requestHeaders = new Headers(request.headers);

  // 2. Inject the current URL into a custom header
  requestHeaders.set('x-current-url', request.url);

  // 3. Pass the modified headers down to your Server Components
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// 4. Exclude static assets and system paths to keep things fast
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
