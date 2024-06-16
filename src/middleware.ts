import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("__token__");

  const url = request.nextUrl.clone();
  const publicRoutes = ["/signup", "/signin", "/forgot-password"];
  const protectedRoutes = ["/invoices", "/invoice", "/profile"];

  if (token) {
    if (publicRoutes.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
