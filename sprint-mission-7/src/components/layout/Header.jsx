"use client";

import Image from "next/image";
import Link from "next/link";
import LogoFull from "../../../public/images/logo.png";
import LogoMini from "../../../public/images/logo-mini.png";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Button from "../ui/Button";
import NavLink from "../ui/NavLink";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="h-[70px]">
      <div
        className={clsx(
          "h-full flex mx-auto max-w-[1920px] ",
          "justify-between items-center px-4 tablet:px-6 pc:px-50",
        )}
      >
        <div className="flex">
          <Link href="/" aria-label="CatInfo 홈">
            <Image
              src={LogoMini}
              alt="CatInfo"
              width={81}
              height={40}
              priority
              className="block xs:hidden"
            />
            <Image
              src={LogoFull}
              alt="CatInfo"
              width={153}
              height={40}
              priority
              className="hidden xs:block"
            />
          </Link>
          <ul className="flex items-center ml-4 gap-2 tablet:ml-5">
            <li className="tablet:px-4">
              <NavLink href="/board">자유게시판</NavLink>
            </li>
            <li className="tablet:px-4">
              <NavLink href="/market">중고마켓</NavLink>
            </li>
          </ul>
        </div>
        <Button size={"small"}>로그인</Button>
      </div>
    </header>
  );
}
