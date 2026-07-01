"use client";
import Link from "next/link";
import React, { use } from "react";

import Image from "next/image";
import Btn from "./Btn";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/imgs/logo.png";
import text_logo from "@/assets/imgs/text_logo.png";
import { useAuth } from "@/providers/AuthProvider";
import ic_profile from "@/assets/icons/ic_profile.svg";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signout } = useAuth();
  const isArticlesActive = pathname.startsWith("/articles");
  const isProductActive = pathname.startsWith("/items");
  return (
    <header className="w-full fixed border-b border-b-[#dfdfdf] min-w-[360px] bg-white z-50 lg:mx-[]">
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
            <Link
              href="/items"
              className={` ${isProductActive ? "text-primary-100" : "text-gray-600"} md:px-[15px] md:py-[21px]`}
            >
              중고마켓
            </Link>
          </div>
        </div>
        {user ? (
          <div className="flex justify-center items-center gap-1.5 text-2lg text-gray-600 font-Inter ">
            <Image
              alt={`${user.nickname}의 프로필 사진`}
              src={ic_profile}
              width={40}
              height={40}
            />
            <p className="hidden text-2lg text-gray-600 md:block">
              {user.nickname}
            </p>
          <Btn
          text="로그아웃"
          onClick={signout}/>
          </div>
        ) : (
          <Btn
            text="로그인"
            onClick={() => {
              router.push("/signin");
            }}
          />
        )}
      </div>
    </header>
  );
}
