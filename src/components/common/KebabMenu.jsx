"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function KebabMenu({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative po">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex justify-center items-center   "
      >
        <Image
          src="/ic_kebab.svg"
          alt="드롭다운 버튼"
          width={24}
          height={24}
          className="max-w-none"
        />
      </button>
      {isOpen && (
        <ul className="cursor-pointer absolute flex flex-col items-center w-[102px] right-6 border border-gray-300 bg-white rounded-lg">
          <li
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className=" pt-4 pb-3 text-md text-gray-500"
          >
            수정하기
          </li>
          <li
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="pb-4 pt-3 text-md text-gray-500"
          >
            삭제하기
          </li>
        </ul>
      )}
    </div>
  );
}
