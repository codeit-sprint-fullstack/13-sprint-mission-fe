import { NextResponse, type NextRequest } from "next/server";

const protectedPatterns = [
  /^\/items\/[^/]+$/, // /items/new, /items/:id 상세
  /^\/items\/[^/]+\/edit$/,
  /^\/community\/new$/,
  /^\/community\/[^/]+\/edit$/,
];

const publicOnlyPaths = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAccessToken = Boolean(request.cookies.get("accessToken"));

  const isProtected = protectedPatterns.some((pattern) =>
    pattern.test(pathname),
  );
  if (isProtected && !hasAccessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (publicOnlyPaths.includes(pathname) && hasAccessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/items/:path*", "/community/:path*", "/login", "/signup"],
};
// Next.js는 기본적으로 middleware를 모든 요청에 실행하려고 하는데 matcher 제외시켜줌
