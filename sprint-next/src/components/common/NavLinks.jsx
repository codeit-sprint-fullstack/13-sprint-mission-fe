"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const navLinkClass = (href) =>
    `text-[1rem] font-bold transition-colors  ${
      pathname.startsWith(href) ? "text-primary-100" : "text-gray-400"
    }`;

  return (
    <nav className="flex gap-6 ">
      <Link href="/boards" className={navLinkClass("/boards")}>
        자유게시판
      </Link>
      <Link href="/items" className={navLinkClass("/items")}>
        중고마켓
      </Link>
    </nav>
  );
}
