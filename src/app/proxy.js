import { NextResponse } from "next/server";

// 로그인된 사용자만 접근 가능한 경로 (글쓰기/수정, 상품 상세)
const protectedPatterns = [
  /^\/items\/[^/]+$/, // /items/new, /items/:id 상세
  /^\/items\/[^/]+\/edit$/,
  /^\/community\/new$/,
  /^\/community\/[^/]+\/edit$/,
];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPatterns.some((pattern) =>
    pattern.test(pathname)
  );

  if (isProtected && !request.cookies.get("accessToken")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/items/:path*", "/community/:path*"],
};