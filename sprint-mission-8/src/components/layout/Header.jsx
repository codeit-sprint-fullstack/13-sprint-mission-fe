"use client";
import React from "react";
import LogoFull from "../../../public/logo/logo.png";
import LogoMini from "../../../public/logo/logo-mini.png";

import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import { useAuth } from "@/providers/AuthProvider";
import Button from "../ui/Button";
import Profile from "../ui/Profile";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="w-full h-17.5 tablet:h-17 border-b border-[#dfdfdf]">
      <div className="w-full flex justify-between mx-auto items-center h-full px-4 tablet:px-6 pc:max-w-480 pc:px-50">
        <div className="flex justify-center">
          <Link className="flex items-center" href="/" aria-label="CatInfo 홈">
            <Image
              src={LogoMini}
              alt="CatInfo"
              width={309}
              height={153}
              priority
              className="block xs:hidden w-20.25 h-auto"
            />
            <Image
              src={LogoFull}
              alt="CatInfo"
              width={1188}
              height={396}
              priority
              className="hidden xs:block w-38.25 h-auto"
            />
          </Link>

          <ul className="flex ml-2 gap-2 items-center tablet:ml-5 pc:ml-8">
            <li className="tablet:px-4 py-6">
              <NavLink href={"/board"}>자유게시판</NavLink>
            </li>
            <li className="tablet:px-4 py-6">
              <NavLink href={"/market"}>중고마켓</NavLink>
            </li>
          </ul>
        </div>
        {user ? (
          // <Button size="small">로그아웃</Button>
          <Profile></Profile>
        ) : (
          <Button
            size="small"
            onClick={() => {
              window.location.href = "/signin";
            }}
          >
            로그인
          </Button>
        )}
        {/* <button>로그인</button> */}
      </div>
    </header>
  );
}
