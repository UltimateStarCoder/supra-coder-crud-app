import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        if (!req.nextauth.token) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
);

export const config = {
    matcher: [
        '/inventory-manager/:path*'
    ]
};
