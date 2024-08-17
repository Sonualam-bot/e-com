import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  console.log(`Middleware running for path: ${pathname}`);
  console.log("Token:", token);

  if (!token) {
    console.log("No token found, redirecting to /sign-in");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/wishlist"],
};
