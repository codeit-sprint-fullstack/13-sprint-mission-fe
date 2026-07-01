"use client";

import { useState } from "react";
import Image from "next/image";

export default function CommentKebab({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <Image src="/images/ic_kebab.svg" alt="더보기" width={24} height={24} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-[139px] z-10 flex flex-col border border-gray-300 rounded-lg overflow-hidden bg-white">
          <button
            type="button"
            onClick={onEdit}
            className="h-[46px] flex items-center justify-center text-body-md text-gray-500 hover:bg-gray-50 border-b border-gray-300"
          >
            수정하기
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="h-[46px] flex items-center justify-center text-body-md text-gray-500 hover:bg-gray-50"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
