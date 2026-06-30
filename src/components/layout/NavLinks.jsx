"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// usePathname으로 현재 경로를 읽어 활성 메뉴 스타일을 적용하는 클라이언트 컴포넌트
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="ml-4 flex gap-2 text-lg md:ml-5 lg:ml-8">
      <Link
        href="/freeboard"
        className={`text-md md:text-2lg flex items-center justify-center font-bold md:py-6 md:pr-4 md:pl-3.75 ${
          pathname.startsWith("/freeboard") ? "text-primary-100" : "text-gray-600"
        }`}
      >
        자유게시판
      </Link>
      <Link
        href="/items"
        className={`text-md md:text-2lg flex items-center justify-center font-bold md:px-5.75 md:py-6 ${
          pathname.startsWith("/items") ? "text-primary-100" : "text-gray-600"
        }`}
      >
        중고마켓
      </Link>
    </nav>
  );
}
