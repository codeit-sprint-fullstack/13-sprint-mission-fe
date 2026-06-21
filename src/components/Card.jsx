import Image from "next/image";
import React from "react";
import defaultImg from "../assets/default.png";
import profileImg from "../assets/ic_profile.svg";
import heartImg from "../assets/ic_heart.svg";
import Link from "next/link";

export default function Card() {
  return (
    <Link href={"community/1"}>
      <div className="flex gap-[1rem] flex-col items-start self-stretch ">
        <div className="flex items-start gap-[0.5rem] self-stretch">
          <h2 className="w-full font-pretendard text-[1.25rem] font-[600] leading-[2rem] text-[#1F2937]">
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </h2>
          <Image
            className="py-[0.85713rem] px-[0.75rem] bg-white w-[4.5rem] h-[4.5rem] shrink-0 items-center justify-center border border-[#E5E7EB] rounded-[0.375rem]"
            src={defaultImg}
            alt="기본제품이미지"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-[0.5rem] items-center">
            <Image src={profileImg} alt="프로필 이미지" />
            <span className="font-pretendard text-[0.875rem] font-[400] leading-[1.5rem] text-[#4B5563]">
              총명한 판다
            </span>
            <span className="font-pretendard text-[0.875remrem] font-[400] leading-[1.5rem] text-[#9CA3AF]">
              2024. 04. 16
            </span>
          </div>
          <div className="flex gap-[0.5] justify-end items-center">
            <Image src={heartImg} alt="하트 이미지" />
            <span className="font-pretendard text-[1rem] font-[400] leading-[1.625rem] text-[#6B7280]">
              9999+
            </span>
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1200"
        height="1"
        viewBox="0 0 1200 1"
        fill="none"
      >
        <path d="M0 0.5L1200 0.500105" stroke="#E5E7EB" />
      </svg>
    </Link>
  );
}
