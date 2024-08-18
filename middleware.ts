import {
  clerkMiddleware,
  ClerkMiddlewareAuth,
  createRouteMatcher,
} from '@clerk/nextjs/server';
import { permanentRedirect, redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, request) => {
  // Handle beforeAuth logic here
  const { userId, orgId } = auth();

  if (!isPublicRoute(request)) {
    auth().protect();
  }

  if (userId && isPublicRoute(request)) {
    let path = '/select-org';

    if (orgId) {
      path = `/organization/${orgId}`;
    }

    const orgSelect = new URL(path, request.url);

    return NextResponse.redirect(orgSelect);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
