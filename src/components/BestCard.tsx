import Image from "next/image";
import React from "react";
import medal from "../assets/icon/ic_medal.png";
import defaultImg from "../assets/default.png";
import heartImg from "../assets/icon/ic_heart.svg";
import Link from "next/link";

export default function BestCard({ id, title, date }: CardType) {
  return (
    <Link
      href={`community/${id}`}
      className="flex flex-col gap-[0.625rem] items-start bg-[#F9FAFB] w-[24rem] h-42.25 px-[1.5rem] rounded-[0.5rem]"
    >
      <div className="flex justify-center items-center gap-[0.25rem] bg-[#3692FF] w-[6.375rem] py-[0.125rem] px-[1.5rem] rounded-b-[1rem]">
        <Image src={medal} alt="메달 이미지" />
        <span className="font-pretendard font-semibold text-[1rem] leading-[1.625rem] text-white">
          Best
        </span>
      </div>

      <div className="flex w-[21rem] justify-center items-start gap-[0.5rem]">
        <p className="shrink-0 w-[16rem] font-pretendard text-[1.25rem] font-[600] leading-[2rem]">
          {title}
        </p>
        <Image
          className="py-[0.85713rem] px-[0.75rem] bg-white w-[4.5rem] h-[4.5rem] shrink-0 items-center justify-center border border-[#E5E7EB] rounded-[0.375rem]"
          src={defaultImg}
          alt="기본제품이미지"
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="inline-flex items-start gap-[0.5rem]">
          <span className="font-pretendard text-[0.875rem] font-[400] leading-[1.5rem]">
            총명한 판다
          </span>
          <div className="flex gap-[0.25rem] justify-end items-center">
            <Image src={heartImg} alt="하트 이미지" />
            <span className="font-pretendard text-[0.875rem] font-[400] leading-[1.5rem] text-[#6B7280]">
              9999+
            </span>
          </div>
        </div>
        <span className="font-pretendard text-[0.875rem] font-[400] leading-[1.5rem] text-[#9CA3AF]">
          {new Date(date)
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .slice(0, -1)}
        </span>
      </div>
    </Link>
  );
}
