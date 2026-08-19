"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/common/Footer";
import Logo from "@/components/common/Logo";
import { getAccessToken } from "@/lib/auth";

export default function HomePage() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(Boolean(getAccessToken()));
  }, []);

  return (
    <div className="bg-white text-[#374151]">
      <header className="sticky top-0 z-10 border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex h-[70px] w-[min(100%-32px,1120px)] items-center justify-between">
          <Logo href={hasToken ? "/items" : "/"} />
          <Link
            className="inline-flex h-[42px] min-w-[88px] items-center justify-center rounded-lg bg-[#3692ff] px-6 text-[15px] font-bold text-white"
            href={hasToken ? "/items" : "/signin"}
          >
            {hasToken ? "중고마켓" : "로그인"}
          </Link>
        </div>
      </header>

      <main>
        <Link href="/items" className="block bg-[#cfe6ff]">
          <img
            className="mx-auto block w-full max-w-[1120px]"
            src="/images/hero.png"
            alt="일상의 모든 물건을 거래해 보세요"
          />
        </Link>

        <section className="py-20">
          <img
            className="mx-auto block w-full max-w-[980px]"
            src="/images/section1.png"
            alt="인기 상품을 확인해 보세요"
          />
        </section>

        <section className="py-20">
          <img
            className="mx-auto block w-full max-w-[980px]"
            src="/images/section2.png"
            alt="구매를 원하는 상품을 검색하세요"
          />
        </section>

        <section className="py-20">
          <img
            className="mx-auto block w-full max-w-[980px]"
            src="/images/section3.png"
            alt="판매를 원하는 상품을 등록하세요"
          />
        </section>

        <section className="bg-[#cfe5ff]">
          <img
            className="mx-auto block w-full max-w-[1120px]"
            src="/images/bottom.png"
            alt="믿을 수 있는 판다마켓 중고 거래"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
