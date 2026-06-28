"use client";

import Image from "next/image";
import { useState } from "react";

export default function ArticleSortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  // 좋아요 순 보류
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-body-md text-gray-800"
      >
        최신순
        <Image src="/images/ic_arrow_down.svg" alt="" width={16} height={16} />
      </button>

      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-0 top-full z-10 mt-2 w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-left text-body-md text-gray-800 hover:bg-gray-50"
        >
          좋아요순
        </button>
      )}
    </div>
  );
}
