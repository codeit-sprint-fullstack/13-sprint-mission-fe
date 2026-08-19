import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = ["/community/post", "/items/post"];
const publicOnlyPaths = ["/login", "/auth/signup"];

// /items/[id] 상세도 로그인이 필요하다. /items 목록은 공개.
const isItemDetail = (pathname: string) =>
  /^\/items\/[^/]+$/.test(pathname) && pathname !== "/items/post";

const matches = (pathname: string, paths: string[]) =>
  paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = Boolean(request.cookies.get("accessToken")?.value);

  if (!hasToken && (matches(pathname, protectedPaths) || isItemDetail(pathname))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (hasToken && matches(pathname, publicOnlyPaths)) {
    const url = request.nextUrl.clone();
    url.pathname = "/items";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
