import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center gap-y-4 bg-secondary-900 text-secondary-400 px-[200px] pt-[32px] pb-[108px] whitespace-nowrap max-desktop:px-[24px] max-mobile:flex-wrap max-mobile:whitespace-normal">
      <div>@codeit-2024</div>
      <div className="ml-auto flex gap-[30px]">
        <Link href="/">Privacy Policy</Link>
        <Link href="/">FAQ</Link>
      </div>
      <div className="ml-auto w-fit flex gap-[12px]">
        <a href="https://www.facebook.com/">
          <Image
            src="/icons/ic_facebook.svg"
            alt="페이스북 아이콘"
            width={20}
            height={20}
          />
        </a>
        <a href="https://x.com/">
          <Image
            src="/icons/ic_twitter.svg"
            alt="트위터 아이콘"
            width={20}
            height={20}
          />
        </a>
        <a href="https://www.youtube.com/">
          <Image
            src="/icons/ic_youtube.svg"
            alt="유튜브 아이콘"
            width={20}
            height={20}
          />
        </a>
        <a href="https://www.instagram.com/">
          <Image
            src="/icons/ic_instagram.svg"
            alt="인스타그램 아이콘"
            width={20}
            height={20}
          />
        </a>
      </div>
    </footer>
  );
}
