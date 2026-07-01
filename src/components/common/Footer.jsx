import Image from "next/image";
import Link from "next/link";
import React from "react";
import ic_facebook from "../../assets/icons/ic_facebook.svg";
import ic_twitter from "../../assets/icons/ic_twitter.svg";
import ic_youtube from "../../assets/icons/ic_youtube.svg";
import ic_instagram from "../../assets/icons/ic_instagram.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-900 w-full h-[160px] flex items-center md:items-start justify-center">
      <div className="w-full max-w-[1200px] px-4 py-8 grid grid-cols-2 gap-y-6 items-center md:flex md:justify-between md:items-start ">
        <p className="text-gray-400 text-sm col-span-2 text-left md:text-left order-3 md:col-span-1 md:order-1">
          ©codeit - 2024
        </p>

        <div className="flex gap-[30px] order-1 md:order-2">
          <Link
            href="/"
            className="text-gray-200 text-md hover:text-white transition"
          >
            Privacy Policy
          </Link>
          <Link
            href="/"
            className="text-gray-200 text-md hover:text-white transition"
          >
            FAQ
          </Link>
        </div>

        <div className="flex gap-[12px] justify-end order-2 md:order-3">
          <Link
            href="/"
            className="relative w-5 h-5 block hover:opacity-80 transition"
          >
            <Image src={ic_facebook} alt="페이스북으로 이동" fill />
          </Link>
          <Link
            href="/"
            className="relative w-5 h-5 block hover:opacity-80 transition"
          >
            <Image src={ic_twitter} alt="트위터로 이동" fill />
          </Link>
          <Link
            href="/"
            className="relative w-5 h-5 block hover:opacity-80 transition"
          >
            <Image src={ic_youtube} alt="유튜브로 이동" fill />
          </Link>
          <Link
            href="/"
            className="relative w-5 h-5 block hover:opacity-80 transition"
          >
            <Image src={ic_instagram} alt="인스타그램으로 이동" fill />
          </Link>
        </div>
      </div>
    </footer>
  );
}
