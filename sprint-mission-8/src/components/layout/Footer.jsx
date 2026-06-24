import React from "react";
import FaceBook from "../../../public/svg/facebook.svg";
import Instagram from "../../../public/svg/instagram.svg";
import Youtube from "../../../public/svg/youtube.svg";
import Twitter from "../../../public/svg/twitter.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full h-40 bg-gray-900">
      <div className="flex flex-wrap gap-6.25 justify-between mx-auto w-full px-4 py-8 tablet:px-6 pc:max-w-480 pc:px-50">
        <div className="text-gray-400 order-last tablet:order-first">
          @codeit - 2024
        </div>
        <ul className="flex gap-7.5 text-gray-200">
          <li>Privacy Policy</li>
          <li>FAQ</li>
        </ul>
        <ul className="flex gap-3 items-center">
          <li>
            <Image alt="이미지" src={FaceBook} width={18} height={18} />
          </li>
          <li>
            <Image alt="이미지" src={Instagram} width={17} height={17} />
          </li>
          <li>
            <Image alt="이미지" src={Youtube} width={20} height={14} />
          </li>
          <li>
            <Link href={`https://www.naver.com`}>
              <Image alt="이미지" src={Twitter} width={19} height={16} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
