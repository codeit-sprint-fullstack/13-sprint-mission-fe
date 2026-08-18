"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import IcKebab from "@/app/assets/ic_kebab.svg";

export default function MoreButtonBase({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [moreModal, setMoreModal] = useState(false);

  // 토글 더보기 모달
  function handleToggleModal() {
    setMoreModal((prev) => !prev);
  }

  useEffect(() => {
    // Escape 키 닫기
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreModal(false);
    };

    // 버튼 외 여백 클릭 시 닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setMoreModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className='relative z-10 h-[24px]' ref={modalRef}>
      <button
        className='relative cursor-pointer'
        type='button'
        aria-label='더보기 버튼'
        onClick={handleToggleModal}
      >
        <Image src={IcKebab} width={24} height={24} alt='' />
      </button>

      {/* 더보기 버튼 모달 */}
      {moreModal && (
        <ul className='absolute top-[24px] right-0 z-20 w-[120px] border border-cool-gray-300 rounded-[8px] text-[14px]/[calc(24/14)] text-secondary-500 bg-white'>
          <li className='border-b border-cool-gray-300 cursor-pointer'>
            <button
              className='flex justify-center items-center h-[45px] w-full cursor-pointer'
              type='button'
              onClick={onEdit}
            >
              수정하기
            </button>
          </li>
          <li>
            <button
              className='flex justify-center items-center h-[45px] w-full cursor-pointer'
              type='button'
              onClick={onDelete}
            >
              삭제하기
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
