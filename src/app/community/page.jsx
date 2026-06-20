import BestCard from "@/components/BestCard";
import Card from "@/components/Card";
import DropDown from "@/components/common/DropDown";
import Input from "@/components/common/Input";
import Link from "next/link";
import React from "react";

const BEST_DATA = [
  {
    id: 1,
    desc: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
  },
  {
    id: 2,
    desc: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
  },
  {
    id: 3,
    desc: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
  },
];

export default function ComuunityPage() {
  return (
    <div className="flex gap-[2.5rem] flex-col items-start max-w-[75rem] mt-[1.5rem] mx-auto">
      <section className="flex flex-col gap-[1.5rem] items-start self-stretch">
        <h2 className="font-pretendard text-[1.25rem] font-[700] leading-normal text-[#111827]">
          베스트 게시글
        </h2>
        <div className="grid grid-cols-3 gap-[1.5rem] items-start">
          {BEST_DATA.map((best) => (
            <BestCard desc={best.desc} key={best.id} />
          ))}
        </div>
      </section>
      <section className="flex flex-col items-start gap-[1.5rem] self-stretch">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-pretendard text-[1.25rem] font-[700] leading-[2rem] text-[#1F2937]">
            게시글
          </h2>
          <Link
            href={"/community/create"}
            className="rounded-lg bg-[#3692FF] h-10.5 px-[1.44rem]"
          >
            <span className="text-white font-pretendard text-center text-[1rem] leading-10.5 font-semibold">
              글쓰기
            </span>
          </Link>
        </div>
        <div className="flex items-start justify-between w-full">
          <Input />
          <DropDown />
        </div>
        <div className="flex w-full gap-[1.5rem] flex-col">
          {BEST_DATA.map(({}, i) => (
            <Card key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
