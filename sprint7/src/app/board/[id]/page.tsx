"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 1. 임시 더미 데이터
const dummyComments = [
  {
    id: 1,
    content: "정말 유익한 글이네요! 잘 읽었습니다. 다음 포스팅도 기대할게요.",
    author: "판다마스터",
    time: "1시간 전",
  },
  {
    id: 2,
    content: "이 부분 레이아웃 잡는 게 헷갈렸는데 감사합니다.",
    author: "프론트초보",
    time: "3시간 전",
  },
];

// 2. 개별 댓글 컴포넌트
function CommentItem({
  data,
}: {
  data: { id: number; content: string; author: string; time: string };
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex w-full max-w-[1200px] flex-col border-b border-[#E5E7EB] bg-[#FCFCFC] pb-[12px]">
      {/* 상단: 댓글 내용 & 케밥 메뉴 */}
      <div className="flex w-full items-start justify-between gap-[9px]">
        <p className="flex-1 font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#1F2937]">
          {data.content}
        </p>

        <div className="relative shrink-0">
          <button
            type="button"
            className="relative h-[24px] w-[24px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Image
              src="/images/ic_kebab.svg"
              alt="메뉴"
              fill
              className="object-contain"
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-[32px] z-10 flex w-[139px] flex-col items-start overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white shadow-md">
              <button className="w-full px-[16px] py-[8px] text-center font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#6B7280] transition-colors hover:bg-gray-50">
                수정하기
              </button>
              <button className="w-full px-[16px] py-[8px] text-center font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#6B7280] transition-colors hover:bg-gray-50">
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 하단: 프로필 정보 (내부 패딩 24px) */}
      <div className="mt-[24px] flex items-center">
        <div className="relative h-[32px] w-[32px] shrink-0 overflow-hidden rounded-full bg-gray-100">
          <Image
            src="/images/ic_profile.svg"
            alt="프로필"
            fill
            className="object-cover"
          />
        </div>

        <div className="ml-[8px] flex flex-col items-start gap-[4px]">
          <span className="font-['Pretendard'] text-[12px] font-normal leading-[18px] text-[#4B5563]">
            {data.author}
          </span>
          <span className="font-['Pretendard'] text-[12px] font-normal leading-[18px] text-[#9CA3AF]">
            {data.time}
          </span>
        </div>
      </div>
    </div>
  );
}

// 3. 메인 페이지 컴포넌트
export default function BoardDetailPage() {
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center py-8">
      {/* (프레임-1) 상단 게시글 정보 영역 */}
      <div className="flex w-full flex-col items-start gap-[16px]">
        <div className="flex w-full items-center justify-between">
          <h1 className="font-['Pretendard'] text-[20px] font-bold leading-[32px] text-[#1F2937]">
            작성한 글 제목
          </h1>
          <div className="relative">
            <button
              type="button"
              className="relative h-[24px] w-[24px]"
              onClick={() => setIsPostMenuOpen(!isPostMenuOpen)}
            >
              <Image
                src="/images/ic_kebab.svg"
                alt="메뉴"
                fill
                className="object-contain"
              />
            </button>
            {isPostMenuOpen && (
              <div className="absolute right-0 top-[32px] z-10 flex w-[139px] flex-col items-start overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white shadow-md">
                <button className="w-full px-[16px] py-[8px] text-center font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#6B7280] transition-colors hover:bg-gray-50">
                  수정하기
                </button>
                <button className="w-full px-[16px] py-[8px] text-center font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#6B7280] transition-colors hover:bg-gray-50">
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full items-center">
          <div className="relative mr-[16px] h-[32px] w-[32px] overflow-hidden rounded-full bg-gray-100">
            <Image
              src="/images/ic_profile.svg"
              alt="프로필"
              fill
              className="object-cover"
            />
          </div>
          <span className="mr-[8px] font-['Pretendard'] text-[14px] text-[#4B5563]">
            작성자이름
          </span>
          <span className="mr-[32px] font-['Pretendard'] text-[14px] text-[#9CA3AF]">
            2024. 01. 01
          </span>
          <div className="mr-[32px] h-[14px] w-[1px] bg-[#E5E7EB]" />
          <button className="flex h-[36px] items-center gap-[6px] rounded-[18px] border border-[#E5E7EB] bg-white px-[12px] transition-colors hover:bg-gray-50">
            <div className="relative h-[18px] w-[18px]">
              <Image
                src="/images/ic_heart.svg"
                alt="좋아요"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-['Pretendard'] text-[14px] font-medium text-[#4B5563]">
              12
            </span>
          </button>
        </div>

        <div className="h-[1px] w-full bg-[#E5E7EB]" />

        <div className="w-full">
          <p className="font-['Pretendard'] text-[18px] font-normal leading-[26px] text-[#1F2937]">
            이곳은 사용자가 작성한 본문 내용이 출력되는 공간입니다.
          </p>
        </div>
      </div>

      {/* (프레임-2) 댓글 입력 영역 */}
      <div className="mt-[32px] flex w-full flex-col items-end gap-[16px]">
        <h2 className="w-full text-left font-['Pretendard'] text-[16px] font-semibold text-[#111827]">
          댓글달기
        </h2>
        <textarea
          className="flex h-[104px] w-full flex-1 resize-none items-start rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#1F2937] outline-none placeholder:text-[#9CA3AF]"
          placeholder="댓글을 입력해주세요."
        />
        <button
          type="button"
          className="flex h-[42px] items-center justify-center gap-[10px] rounded-[8px] bg-[#9CA3AF] px-[23px] py-[12px] font-['Pretendard'] text-[16px] font-semibold leading-[26px] text-[#F3F4F6] transition-colors hover:bg-gray-400"
        >
          등록
        </button>
      </div>

      {/* (프레임-3) 댓글 리스트 영역 */}
      {/* 등록 버튼 밑 패딩 mt-[40px], 댓글 간 패딩 gap-[24px]로 수정 적용 */}
      <div className="mt-[40px] flex w-full flex-col gap-[24px]">
        {dummyComments.length > 0 ? (
          dummyComments.map((comment) => (
            <CommentItem key={comment.id} data={comment} />
          ))
        ) : (
          <div className="flex flex-col items-center gap-[16px] py-[40px]">
            <Image
              src="/images/Img_reply_empty.svg"
              alt="댓글 없음"
              width={100}
              height={100}
              className="object-contain"
            />
            <p className="text-center font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#9CA3AF]">
              아직 댓글이 없어요,
              <br />
              지금 댓글을 달아보세요!
            </p>
          </div>
        )}
      </div>

      {/* (프레임-4) 목록으로 돌아가기 버튼 */}
      <div className="mt-[48px] flex w-full justify-center">
        <Link
          href="/board"
          className="flex h-[48px] w-[240px] shrink-0 items-center justify-center gap-[8px] rounded-[40px] bg-[#3692FF] py-[12px] transition-colors hover:bg-blue-600"
        >
          <span className="whitespace-nowrap text-center font-['Pretendard'] text-[18px] font-semibold leading-[26px] text-[#F3F4F6]">
            목록으로 돌아가기
          </span>
          <div className="relative h-[24px] w-[24px] shrink-0">
            <Image
              src="/images/ic_back.svg"
              alt="목록으로"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
