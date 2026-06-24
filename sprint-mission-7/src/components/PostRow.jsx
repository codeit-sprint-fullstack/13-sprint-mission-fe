import React from "react";
import Link from "next/link";

export default function PostRow({ post }) {
  const id = post?.id;
  const title = post?.title || "게시글 제목이 없습니다.";
  const createdAt = post?.createdAt;

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
      className="w-full flex items-start justify-between py-[24px] border-b border-[#F3F4F6] bg-[#FCFCFC] box-border select-none cursor-pointer"
    >
      <div className="flex flex-col flex-1 pr-6">
        <div className="h-[72px] flex items-start">
          <h3 className="text-[#1F2937] text-[20px] font-semibold line-clamp-1 leading-snug">
            {title}
          </h3>
        </div>

        <div className="flex items-center text-[14px] text-[#9CA3AF] font-medium mt-3">
          <div className="flex items-center gap-2">
            <img
              src="ic_profile.png"
              alt="profile"
              className="w-[24px] h-[24px] shrink-0 object-contain"
            />
            <span className="text-[#4B5563] font-normal">총명한판다</span>
            <span className="text-[#9CA3AF] font-normal">
              {formatDate(createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end shrink-0">
        <div className="w-[72px] h-[72px] bg-[#FFF] border border-[#F3F4F6] rounded-[8px] flex items-center justify-center overflow-hidden p-[12px]">
          <img
            src="/notebook.png"
            alt="게시글 썸네일"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex items-center gap-[8px] mt-3">
          <img
            src="/ic_heart.png"
            alt="heart"
            className="w-[24px] h-[24px] shrink-0 object-contain"
          />
          <span className="text-[16px] font-normal text-[#6B7280]">9999+</span>
        </div>
      </div>
    </Link>
  );
}
