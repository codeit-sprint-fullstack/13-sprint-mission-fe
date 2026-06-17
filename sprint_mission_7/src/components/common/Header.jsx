"use client";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import Btn from "./Btn";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isArticlesActive = pathname.startsWith("/articles");
  return (
    <header className="w-full fixed border-b border-b-[#dfdfdf] min-w-[360px] bg-white">
      <div className="flex justify-between px-[16px] h-[70px] items-center">
        <div className="flex gap-[24px] items-center">
          <Link href="/" className="w-[81px] h-[40px] relative">
            <Image src="/logo.png" alt="로고" fill />
          </Link>
          <div className="flex items-center gap-[10px] text-gray-600 text-lg font-bold">
            <Link
              href="/articles"
              className={` ${isArticlesActive ? "text-primary-100" : "text-gray-600"}`}
            >
              자유게시판
            </Link>
            <Link href="/">중고마켓</Link>
          </div>
        </div>
        <Btn text="로그인" />
      </div>
    </header>
  );
}
