import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');

    // Redirect to login if accessing dashboard without auth
    if (isDashboardRoute && !token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check if user is admin
    if (isDashboardRoute && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');
        
        // Allow access to login page without token
        if (req.nextUrl.pathname === '/login') {
          return true;
        }
        
        // For dashboard routes, require token
        if (isDashboardRoute) {
          return !!token && token.role === 'admin';
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
