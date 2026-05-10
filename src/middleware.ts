import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

  const path = req.nextUrl.pathname

  const isPublicPath =
    path === '/' ||
    path === '/login' ||
    path === '/signup' ||
    path === '/verifyemail'

  const token = req.cookies.get('token')?.value || ''

  // logged in user login/signup pe na jaye
  if ((path === '/login' || path === '/signup') && token) {
    return NextResponse.redirect(new URL('/profile', req.nextUrl))
  }

  // non logged in user protected routes pe na jaye
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
}

export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}