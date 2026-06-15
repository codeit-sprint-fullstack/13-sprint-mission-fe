"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isFreeboard = pathname.startsWith("/freeboard");

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex min-h-[72px] max-w-[1040px] flex-wrap items-center gap-4 px-5 py-3 sm:flex-nowrap sm:gap-10 sm:px-6 sm:py-0">
        <Link
          href="/freeboard"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[25px] font-extrabold text-blue-500"
          aria-label="판다마켓 홈"
        >
          <span className="grid size-[34px] place-items-center rounded-[10px] bg-blue-500 text-[22px]">
            🐼
          </span>
          <span>판다마켓</span>
        </Link>
        <nav className="order-3 flex w-full flex-1 items-center gap-5 text-[15px] font-bold text-gray-700 sm:order-none sm:w-auto sm:gap-8">
          <Link
            className={isFreeboard ? "text-blue-500" : ""}
            href="/freeboard"
          >
            자유게시판
          </Link>
          <Link href="/market">중고마켓</Link>
        </nav>
        <button
          className="ml-auto inline-flex h-[42px] min-w-[72px] items-center justify-center rounded-lg bg-blue-500 px-[18px] font-bold text-white hover:bg-blue-600"
          type="button"
        >
          로그인
        </button>
      </div>
    </header>
  );
}
