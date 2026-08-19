import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthHeader() {
  return (
    <header className="mb-[24px] flex items-center justify-center md:mb-[40px]">
      <Link className="flex gap-[8px] md:gap-[20px]" href="/">
        <Image
          src="/panda.svg"
          width={104}
          height={104}
          alt=""
          className="h-[52px] w-[52px] md:h-[104px] md:w-[104px]"
        />
        <p className="text-brand-blue text-[33.172px] font-bold md:text-[66.344px]">
          판다마켓
        </p>
      </Link>
    </header>
  );
}
