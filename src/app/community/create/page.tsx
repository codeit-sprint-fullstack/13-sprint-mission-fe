"use client";

import { marketAPI } from "@/lib/services/marketApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const isEnabled: string = title.trim() && desc.trim();
  const router = useRouter();

  async function handleSubmit(): Promise<void> {
    if (!isEnabled) return;
    const res = await marketAPI.postArticle({ title, content: desc });
    if (res) router.push(`${res.id}`);
  }

  return (
    <div className="flex gap-[2rem] flex-col items-start max-w-[75rem] mt-[1.5rem] mx-auto">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-pretendard text-[1.25rem] font-[700] leading-[2rem] text-[#1F2937]">
          게시글
        </h2>
        <button
          disabled={!isEnabled}
          className={`rounded-lg ${isEnabled ? "bg-[#3692FF]" : "bg-[#9CA3AF]"} h-10.5 px-[1.44rem] cursor-pointer`}
          onClick={handleSubmit}
        >
          <span className="text-white font-pretendard text-center text-[1rem] leading-10.5 font-semibold">
            등록
          </span>
        </button>
      </div>
      <div className="flex flex-col items-start gap-[1.5rem] self-stretch">
        <div className="flex w-full flex-col items-start gap-[0.75rem]">
          <h3 className="font-pretendard text-[1.125rem] font-[700] leading-[1.625rem] text-[#1F2937]">
            *제목
          </h3>
          <div className="flex gap-[0.625rem] w-full h-[3.5rem] items-stretch py-[1rem] px-[1.5rem] bg-[#F3F4F6] rounded-[0.75rem]">
            <input
              className="w-full font-pretendard text-[1rem] font-[400] leading-[1.625rem] text-[#9CA3AF]"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-[0.75rem]">
          <h3 className="font-pretendard text-[1.125rem] font-[700] leading-[1.625rem] text-[#1F2937]">
            *내용
          </h3>
          <div className="flex gap-[0.625rem]  w-full  h-[17.625rem] items-start py-[1rem] px-[1.5rem] bg-[#F3F4F6] rounded-[0.75rem]">
            <textarea
              className="flex-1 h-full resize-none font-pretendard text-[1rem] font-[400] leading-[1.625rem] text-[#9CA3AF]"
              placeholder="내용을 입력해주세요"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
