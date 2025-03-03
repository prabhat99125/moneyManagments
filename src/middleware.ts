import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const ispublicPath = path === "/login" || path === "/signup";
    const token = request.cookies.get("authentication")?.value;
    if (ispublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (!ispublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/profile",
        "/profile/:path*",
        "/verifyemail"
    ],
}