import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from './app/amplify-server.util';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const isAuthenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, { forceRefresh: true });
        return session.tokens?.accessToken !== undefined && session.tokens?.idToken !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  const { pathname } = request.nextUrl;
  if (isAuthenticated) {
    // If authenticated and trying to access the sign-in or sign-up pages, redirect to home
    if (pathname === '/sign-in' || pathname === '/sign-up') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    // If not authenticated and trying to access a protected route (excluding /sign-in and /sign-up), redirect to sign-in
    if (pathname !== '/sign-in' && pathname !== '/sign-up') {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/[^api|^_next|^favicon.ico|^app]/(.*)', '/sign-in', '/sign-up', '/sign-out'],
};
