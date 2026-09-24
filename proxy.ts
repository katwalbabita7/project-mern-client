import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";

  // No token
  if (!token) {
    if (isLoginPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Token exists, verify it
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const isAdmin = payload.role === "ADMIN" || payload.role === "SUPER_ADMIN";

    if (!isAdmin) {
      // Not an admin — clear cookie, but only redirect if not already on login page
      const response = isLoginPage
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("access_token");
      return response;
    }

    // Valid admin token, but on login page or /admin -> go to dashboard
    if (isLoginPage || pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();

  } catch (error) {
    // Invalid/expired token — clear cookie, but only redirect if not already on login page
    const response = isLoginPage
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.delete("access_token");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};