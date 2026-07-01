import Link from "next/link";
import React from "react";
import FacebookImg from "../../assets/social/ic_facebook.svg";
import InstagramImg from "../../assets/social/ic_instagram.svg";
import TwitterImg from "../../assets/social/ic_twitter.svg";
import YoutubeImg from "../../assets/social/ic_youtube.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" h-[10rem] py-[2rem] px-[12.5rem] items-start bg-[#111827]">
      <div className="flex justify-between items-center self-stretch max-w-[120rem]">
        <span className="font-pretendard text-[1rem] font-[400] leading-normal text-[#9CA3AF]">
          ©codeit - 2024
        </span>
        <div className="flex items-start gap-[1.875rem]">
          <span className="font-pretendard text-[1rem] font-[400] leading-normal text-[#E5E7EB]">
            ©codeit - 2024
          </span>
          <span className="font-pretendard text-[1rem] font-[400] leading-normal text-[#E5E7EB]">
            ©codeit - 2024
          </span>
        </div>
        <div className="flex w-[7.25rem] items-start gap-[0.75rem]">
          <Link href={"https://www.facebook.com"} target="_blank">
            <Image src={FacebookImg} alt="페이스북 아이콘" />
          </Link>
          <Link href={"https://x.com/home"} target="_blank">
            <Image src={TwitterImg} alt="트위터 아이콘" />
          </Link>
          <Link href={"https://www.youtube.com"} target="_blank">
            <Image src={YoutubeImg} alt="유튜브 아이콘" />
          </Link>
          <Link href={"https://www.instagram.com"} target="_blank">
            <Image src={InstagramImg} alt="인스타그램 아이콘" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
