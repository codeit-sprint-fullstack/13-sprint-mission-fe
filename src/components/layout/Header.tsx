"use client";

import Link from "next/link";
import Image from "next/image";
import logoPc from "@/assets/logo/logo.svg";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants/navigation";
import HeaderAuthStatus from "./HeaderAuthStatus";

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="border-b-header-border fixed top-0 left-0 z-1000 flex h-17.5 w-full max-w-480 items-center justify-between border-b border-solid bg-white px-50">
      <div className="flex items-center gap-[1.56rem]">
        <Link href="/">
          <Image src={logoPc} priority alt="판다마켓 홈" />
        </Link>
        <div className="flex flex-row">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <HeaderAuthStatus />
    </nav>
  );
}
