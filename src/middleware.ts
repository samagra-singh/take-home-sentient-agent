import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { authTokenCookieName, homePagePathName, isUnauthorizedParamName, signInPagePathName } from '@/utils/constants/global';

// Configuration object to define which paths the middleware should run on.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const authToken = request.cookies.get(authTokenCookieName);
  const isSignInPage = pathname === signInPagePathName;
  const isMarkedUnauthorized =
    isSignInPage && searchParams.get(isUnauthorizedParamName) === 'true';

  // Auth token is set and needs to be verified by app.
  if (authToken) {
    if (
      (isSignInPage && !isMarkedUnauthorized) ||
      pathname === '/'
    ) {
      const homeUrl = new URL(homePagePathName, request.url);
      return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
  }

  // Auth token is not set.
  if (isSignInPage) {
    // When auth token is not set, do not redirect away from signin page.
    return NextResponse.next();
  }

  const signInUrl = new URL(signInPagePathName, request.url);
  signInUrl.searchParams.set('is-unauthorized', 'true');
  const redirectUrl = pathname;
  signInUrl.searchParams.set('redirect-url', redirectUrl);

  return NextResponse.redirect(signInUrl);
};
