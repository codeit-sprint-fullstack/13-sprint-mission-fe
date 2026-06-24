"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="w-full bg-[#FFF] border-b border-[#DFDFDF] sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-[200px] h-70px flex items-center justify-between">
        <div className="flex items-center gap-[32px]">
          <Link href="/boards" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="판다마켓 로고"
              width={153}
              height={41}
              priority
              className="object-contain"
            />
          </Link>

          <nav className="flex items-center">
            <Link
              href="/boards"
              className={`w-[109px] h-[69px] flex items-center justify-center text-[18px] font-bold leading-none cursor-pointer
              ${
                pathname.startsWith("/boards")
                  ? "text-[#3692FF]"
                  : "text-[#4B5563]"
              }`}
            >
              자유게시판
            </Link>
            <Link
              href="/market"
              className={`w-[109px] h-[69px] flex items-center justify-center text-[18px] font-bold leading-none cursor-pointer"
                ${
                  pathname.startsWith("/market")
                    ? "text-[#3692FF]"
                    : "text-[#4B5563]"
                }`}
            >
              중고마켓
            </Link>
          </nav>
        </div>

        <button className="inline-flex items-center justify-center w-[88px] h-[42px] bg-[#3692FF] text-[16px] text-[#FFFFFF] font-semibold rounded-lg cursor-pointer ">
          로그인
        </button>
      </div>
    </header>
  );
}
