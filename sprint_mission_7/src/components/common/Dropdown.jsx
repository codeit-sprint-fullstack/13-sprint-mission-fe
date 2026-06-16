"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center w-10.5 h-10.5 rounded-xl border border-gray-200 bg-white"
      >
        <Image
          src="/ic_sort.svg"
          alt="드롭다운 버튼"
          width={24}
          height={24}
          className="max-w-none"
        />
      </button>
      {isOpen && (<ul>
        <li>최신순</li>
        <li>좋아요순</li>
      </ul>
      )}
    </div>
  );
}
