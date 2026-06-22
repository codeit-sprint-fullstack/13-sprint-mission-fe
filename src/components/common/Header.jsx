"use client";
import ActionButton from "@/components/button/ActionButton.jsx";
import LinkButton from "@/components/button/LinkButton.jsx";
import { usePathname } from "next/navigation.js";

export default function Header() {
  const pathname = usePathname();
  return (
    <div className="h-17 px-4 md:px-6 lg:px-50 flex justify-between items-center border-b border-[#dfdfdf]">
      <div className="flex flex-row items-center gap-2 md:gap-8.75 lg:gap-9.75">
        <LinkButton
          href="/"
          text="판다마켓"
          variant="home"
          className="mr-2 md:mr-0 lg:mr-2"
        />
        <LinkButton
          href="/articles"
          pathname={pathname}
          text="자유게시판"
          variant="header"
          className="md:mr-1 lg:mr-0"
        />
        <LinkButton href="/market" text="중고마켓" variant="header" />
      </div>
      <ActionButton href="/login" text="로그인" />
    </div>
  );
}
