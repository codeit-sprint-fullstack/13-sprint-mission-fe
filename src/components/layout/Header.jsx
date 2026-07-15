"use client";

import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/user";
import { useState, useEffect } from "react";

export default function Header() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    enabled: !!token,
  });

  return (
    <header className="sticky top-0 z-50 flex h-17.5 w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 md:px-6 lg:px-50 lg:py-2.25">
      <div className="flex items-center">
        <Link className="flex items-center gap-2.5" href="/">
          <Image
            className="hidden md:block"
            src="/image/header.png"
            width={40}
            height={40}
            alt="판다마켓"
            style={{ width: "40px", height: "40px" }}
          />
          <h1
            className="text-primary-100 pt-1.5 pb-1.75 text-xl leading-normal font-bold md:text-[26px]"
            style={{ fontFamily: "ROKAF Sans" }}
          >
            판다마켓
          </h1>
        </Link>
        <NavLinks />
      </div>

      {user ? (
        <div className="flex items-center gap-2">
          <Image
            src={user.image ?? "/image/ic_profile.svg"}
            alt="프로필"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="hidden text-gray-600 md:block">{user.nickname}</span>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.location.href = "/signin";
            }}
            className="hidden md:block btn_small_40"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link href="/signin">
          <button className="btn_small_40">로그인</button>
        </Link>
      )}
    </header>
  );
}
