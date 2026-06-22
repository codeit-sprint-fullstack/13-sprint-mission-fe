import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 flex static h-[160px] justify-center">
      <div className="flex flex-col-reverse gap-[24px] px-[16px] py-[32px] justify-end ">
        <p className="text-gray-400">©codeit - 2024</p>
        <div className="flex gap-[68px]">
          <div className="flex gap-[30px]">
            <Link href="/" className="text-gray-200 text-lg">
              Privacy Policy
            </Link>
            <Link href="/" className="text-gray-200 text-lg">
              FAQ
            </Link>
          </div>
          <div className="flex gap-[12px]">
            <Link href="/" className="relative w-5 h-5">
              <Image src="/ic_facebook.svg" alt="페이스북으로 이동" fill />
            </Link>
            <Link href="/" className="relative w-5 h-5">
              <Image src="/ic_twitter.svg" alt="트위터로 이동" fill />
            </Link>
            <Link href="/" className="relative w-5 h-5">
              <Image src="/ic_youtube.svg" alt="유튜브로 이동" fill />
            </Link>
            <Link href="/" className="relative w-5 h-5">
              <Image src="/ic_instagram.svg" alt="인스타그램으로 이동" fill />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
