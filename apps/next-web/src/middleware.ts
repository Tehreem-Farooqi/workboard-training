import { NextResponse } from 'next/server';

export function middleware() {
  // Allow all routes - auth is handled client-side in layouts
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
