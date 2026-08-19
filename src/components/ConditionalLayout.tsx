"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Gnb from "./Gnb";
import Footer from "./Footer";

const AUTH_PATHS = ["/signin", "/signup"];

export default function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_PATHS.includes(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Gnb />
      <main className="pt-[60px] md:pt-[70px]">{children}</main>
      <Footer />
    </>
  );
}
