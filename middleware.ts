import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // If accessing chat page and not authenticated, redirect to login
  if (request.nextUrl.pathname.startsWith("/chat") && token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If accessing login page and already authenticated, redirect to chat
  if (request.nextUrl.pathname.startsWith("/login") && !token) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/login"],
};
