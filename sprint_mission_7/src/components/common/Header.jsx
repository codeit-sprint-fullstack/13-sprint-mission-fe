import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full fixed border-b border-b-[#dfdfdf] min-w-[360px]">
      <div className="flex justify-between px-[16px] h-[70px] items-center">
        <div className="flex gap-[24px] items-center">
          <Link href="/" className="w-[81px] h-[40px] relative">
            <Image src="/logo.png" alt="로고" fill />
          </Link>
          <div className="flex items-center gap-[10px] text-gray-600 text-lg font-bold">
            <Link href="/article">자유게시판</Link>
            <Link href="/">중고마켓</Link>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center h-[42px] px-[23px] py-[12px] bg-primary-100 rounded-[8px] text-lg font-semibold text-gray-100"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
