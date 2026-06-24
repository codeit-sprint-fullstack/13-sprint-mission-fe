import Link from "next/link";
import React from "react";

export default function BestPostCard({ postData }) {
  const id = postData?.id;
  const title = postData?.title || "게시글 제목이 없습니다.";
  const createdAt = postData?.createdAt;

  const formatDate = (dateString) => {
    if (!dateString) return "2000. 01. 01";
    return new Date(dateString)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .slice(0, -1);
  };

  return (
    <Link
      href={`/boards/${id}`}
      className="relative flex flex-col justify-between w-[336px] h-[169px] bg-[#F9FAFB] rounded-[8px] px-6 pt-[46px] pb-[9px] box-border cursor-pointer"
    >
      <div className="absolute top-0 left-[24px] w-[102px] h-[30px] bg-[#3692FF] text-white text-[16px] font-semibold rounded-b-[16px] flex items-center justify-center gap-[4px] z-10 ">
        <span>🏅</span>Best
      </div>

      <div className="flex justify-between items-start w-full gap-[8px]">
        <h3 className="text-[#1F2937] text-[20px] font-semibold leading-[32px] line-clamp-2 word-break break-all">
          {title}
        </h3>

        <div className="w-[72px] h-[72px] bg-white border border-[#E5E7EB] rounded-[6px] flex items-center justify-center shrink-0 overflow-hidden p-[12px]">
          <img
            src="/notebook.png"
            alt="기본 이미지"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.src = "/notebook.png";
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between w-full text-[14px] text-[#9CA3AF] font-normal pt-1">
        <div className="flex items-center gap-[8px]">
          <span className="text-[#4B5563] ">총명한판다</span>
          <div className="flex items-center gap-1">
            <img
              src="/ic_heart.png"
              alt="하트 아이콘"
              className="w-[16px] h-[16px]"
            />
            <span className="text-[14px] ">9999+</span>
          </div>
        </div>
        <span className="text-[#9CA3AF] text-[14px]">
          {formatDate(createdAt)}
        </span>
      </div>
    </Link>
  );
}
