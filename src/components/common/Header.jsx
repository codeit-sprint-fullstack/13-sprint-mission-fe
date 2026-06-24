"use client";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import Btn from "./Btn";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/imgs/logo.png";
import text_logo from "@/assets/imgs/text_logo.png";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isArticlesActive = pathname.startsWith("/articles");
  return (
    <header className="w-full fixed border-b border-b-[#dfdfdf] min-w-[360px] bg-white z-50">
      <div className="flex justify-between px-[16px] h-[70px] items-center max-w-[1200px] mx-auto md:px-6">
        <div className="flex gap-[24px] items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="로고"
              width={81}
              height={40}
              className="block md:hidden"
            />
            <Image
              alt="로고"
              src={text_logo}
              width={153}
              height={51}
              className="hidden md:block"
            />
          </Link>
          <div className="flex items-center gap-[8px] text-gray-600 text-lg font-bold md:gap-0 md:text-2lg md:font-bold">
            <Link
              href="/articles"
              className={` ${isArticlesActive ? "text-primary-100" : "text-gray-600"} md:px-[15px] md:py-[21px]`}
            >
              자유게시판
            </Link>
            <Link href="/products">중고마켓</Link>
          </div>
        </div>
        <Btn
          text="로그인"
          onClick={() => {
            router.push("/signin");
          }}
        />
      </div>
    </header>
  );
}
