/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("unlekAccessToken")?.value
  let userRole = null

  if (token) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userRole = jwtDecode(token).role
    } catch (err: any) {
      console.log('err', err);
      return NextResponse.redirect(new URL("/auth/sign-in", request.url))
    }
  }

  // Block logged-in users from /auth pages
  if (pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Protect /user for logged-in only
  if (pathname.startsWith("/user") && !token) {
    return NextResponse.redirect(new URL(`/auth/sign-in?redirect=${pathname}`, request.url))
  }

  // Routes restricted to buyers only
  const buyerOnlyRoutes = ["/cart", "/checkout", "/user/order-history"]
  if (buyerOnlyRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL(`/auth/sign-in?redirect=${pathname}`, request.url))
    }
    if (userRole !== "buyer") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Routes restricted to sellers only
  const sellerOnlyRoutes = ["/upload", "/user/selling-history", "/user/feed"]
  if (sellerOnlyRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL(`/auth/sign-in?redirect=${pathname}`, request.url))
    }
    if (userRole !== "seller") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Protect payment success/fail pages for only logged-in users
  const paymentPages = ["/payment-success", "/payment-failed"]
  if (paymentPages.includes(pathname) && !token) {
    return NextResponse.redirect(new URL(`/auth/sign-in?redirect=${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/user/:path*",
    "/cart",
    "/checkout",
    "/upload",
    "/user/order-history",
    "/user/selling-history",
    "/user/feed",
    "/payment-success",
    "/payment-failed",
  ],
}
