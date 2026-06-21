"use client";

import Image from "next/image";
import React, { useState } from "react";
import kebabImg from "../../../assets/ic_kebab.png";
import DropDownList from "@/components/common/DropDownList";
import profileImg from "../../../assets/ic_profile.svg";
import heartImg from "../../../assets/ic_heart.svg";
import backImg from "../../../assets/ic_back.svg";
import CommentItem from "./_components/CommentItem";
import Link from "next/link";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, isOpen] = useState(false);
  return (
    <div className="flex flex-col items-start gap-[2rem] self-stretch max-w-[75rem] mt-[1.5rem] mx-auto">
      <section className="flex flex-col items-start gap-[1rem] self-stretch">
        <div className="flex justify-between items-start gap-[0.5rem] self-stretch relative">
          <h2 className="font-pretendard text-[1.25rem] font-[700] leading-[2rem] text-[#1F2937]">
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </h2>
          <Image
            className="cursor-pointer"
            src={kebabImg}
            alt="옵션 이미지"
            onClick={() => isOpen(!open)}
          ></Image>
          {open && <DropDownList></DropDownList>}
        </div>
        <div className="flex gap-[2rem] self-stretch items-center">
          <div className="flex gap-[1rem] items-center">
            <Image
              className="w-[2.5rem] h-[2.5rem]"
              src={profileImg}
              alt="프로필 이미지"
            />
            <div className="flex gap-[0.5rem] items-center">
              <span className="font-pretendard text-[0.875rem] font-[400] leading-[1.5rem] text-[#4B5563]">
                총명한 판다
              </span>
              <span className="font-pretendard text-[0.875remrem] font-[400] leading-[1.5rem] text-[#9CA3AF]">
                2024. 04. 16
              </span>
            </div>
          </div>

          <div className="flex gap-[2rem] items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1"
              height="34"
              viewBox="0 0 1 34"
              fill="none"
            >
              <path d="M0.5 0V34" stroke="#E5E7EB" />
            </svg>
            <div className="flex gap-[0.25rem] justify-center items-center h-[2.5rem] py-[0.25rem] px-[0.75rem] bg-[#fff] border border-[#E5E7EB] rounded-[2.1875rem]">
              <Image
                className="w-[2rem] h-[2rem]"
                src={heartImg}
                alt="하트 이미지"
              />
              <span className="font-pretendard text-[1rem] font-[500] leading-[1.625rem] text-[#6B7280]">
                123
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
          <path d="M0 0.5H1200" stroke="#E5E7EB" />
        </svg>
        <span className="font-pretendard text-[1.125rem] font-[400] leading-[1.625rem] text-[#1F2937]">
          맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
        </span>
      </section>
      <section className="flex flex-col items-start gap-[2.5rem] self-stretch">
        <div className="flex flex-col items-end gap-[1rem]  self-stretch">
          <div className="flex flex-col gap-[0.5625rem]  self-stretch">
            <h2 className="font-pretendard text-[1rem] font-[600] leading-[1.625rem] text-[#111827]">
              댓글달기
            </h2>
            <div className="flex gap-[0.625rem]  w-full  h-[6.5rem] items-start py-[1rem] px-[1.5rem] bg-[#F3F4F6] rounded-[0.75rem]">
              <textarea
                className="flex-1 h-full resize-none font-pretendard text-[1rem] font-[400] leading-[1.625rem] text-[#9CA3AF]"
                placeholder="댓글을 입력해주세요."
              />
            </div>
          </div>
          <button className="rounded-lg bg-[#9CA3AF] h-10.5 px-[1.44rem] cursor-pointer">
            <span className="text-white font-pretendard text-center text-[1rem] leading-10.5 font-semibold">
              등록
            </span>
          </button>
        </div>
        <div className="flex flex-col flex-wrap items-start gap-[1.5rem] w-full">
          <CommentItem />
          <CommentItem />
          <CommentItem />
        </div>
      </section>
      <Link
        href={"/community"}
        className="flex w-[15rem] h-[3rem] py-[0.75rem] px-[4rem] justify-center items-center gap-[0.5rem] bg-[#3692FF] rounded-[2.5rem] mx-auto"
      >
        <span className="whitespace-nowrap text-[#F3F4F6] text-center font-pretendard text-[1.125rem] leading-[1.625rem] font-[600]">
          목록으로 돌아가기
        </span>
        <Image src={backImg} alt="돌아가기 이미지" />
      </Link>
    </div>
  );
}
