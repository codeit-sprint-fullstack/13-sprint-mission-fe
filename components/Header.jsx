"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const path = usePathname();

  return (
    <header className="w-full h-[70] sticky top-0 z-10 border-[#DFDFDF] border-b flex items-center bg-[#FFF]">
      <div className="w-full flex justify-between items-center px-[16px] md:px-[24px] lg:px-[200px]">
        <div className="flex items-center">
          <Link className="flex gap-[8.592px]" href="/">
            <Image
              src="/panda.svg"
              alt="헤더 판다 로고"
              width={40}
              height={40}
              className="hidden md:block"
            />
            <p className="text-[#3692FF] font-bold text-[20.202px] mr-[32px] whitespace-nowrap md:text-[25.633px] text-center">
              판다마켓
            </p>
          </Link>
          <div className="flex gap-[8px] md:gap-[40px]">
            <Link
              href="/boards"
              className={`${path.startsWith("/boards") ? "text-[#3692FF]" : "text-[#4B5563]"} font-bold whitespace-nowrap text-[16px] md:text-[18px]`}
            >
              자유게시판
            </Link>
            <Link
              href="/"
              className="font-bold text-[#4B5563] whitespace-nowrap text-[16px] md:text-[18px]"
            >
              중고마켓
            </Link>
          </div>
        </div>
        <div>
          {/* TODO: 버튼 많이 쓰이니까 컴포넌트로 분리하는 것도 괜찮아보임 */}
          <button className="cursor-pointer text-white bg-brand-blue px-[23px] py-[12px] rounded-[8px] whitespace-nowrap font-[600]">
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
