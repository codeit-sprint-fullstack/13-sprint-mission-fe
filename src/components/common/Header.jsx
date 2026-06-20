"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import fandaLogo from "../../assets/pandaface.png";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  return (
    <header className="bg-white border-b border-[#DFDFDF] w-full h-17.5">
      <div className="flex justify-between items-center h-full ml-50 max-w-[120rem]">
        <nav>
          <div className="flex justify-center items-center gap-[0.537rem]">
            <Image
              src={fandaLogo}
              alt="판다로고이미지"
              width={40}
              height={40}
            />
            <Link
              href={"/"}
              className="font-sans font-bold text-[#3692ff] text-[1.60206rem]"
            >
              판다마켓
            </Link>
            <Link
              className={`ml-8 py-6 px-4 font-pretendard font-bold ${path === "/community" ? "text-[#3692FF]" : ""}`}
              href={"/community"}
            >
              자유게시판
            </Link>
            <Link
              className={`py-6 px-4 font-pretendard font-bold  ${path === "/product" ? "text-[#3692FF]" : ""}`}
              href={"/product"}
            >
              중고마켓
            </Link>
          </div>
        </nav>
        <Link
          href={"/"}
          className="mr-50 rounded-lg bg-[#3692FF] h-10.5 px-[1.44rem]"
        >
          <span className="text-white font-pretendard text-center text-[1rem] leading-10.5 font-semibold">
            로그인
          </span>
        </Link>
      </div>
    </header>
  );
}
