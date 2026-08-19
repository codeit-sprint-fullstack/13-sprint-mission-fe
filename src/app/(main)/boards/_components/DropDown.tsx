"use client";

import Image from "next/image";
import { useState } from "react";

interface DropDownProps {
  onSelect: (options: "latest" | "oldest" | "favoritest") => void;
}

const options = [
  { label: "최신순", value: "latest" },
  { label: "오래된순", value: "oldest" },
  { label: "좋아요순", value: "favoritest" },
] as const;

export default function DropDown({ onSelect }: DropDownProps) {
  const [sortOptions, setSortOptions] = useState<
    "최신순" | "오래된순" | "좋아요순"
  >(options[0].label);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <button
      className="border-cool-gray-200 relative flex h-[42px] w-[130px] cursor-pointer rounded-[12px] border border-solid px-[20px] py-[12px]"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="flex w-full items-center justify-between">
        <p className="whitespace-nowrap">{sortOptions}</p>
        <Image
          src="/ic_arrow_down.svg"
          alt="드롭다운 버튼"
          width={24}
          height={24}
        />
      </span>
      {isOpen && (
        <div className="border-cool-gray-200 absolute top-[45px] left-0 flex w-full flex-col gap-[2px] rounded-[8px] rounded-[12px] border border-solid bg-[#FFF]">
          {options.map((option) => (
            <span
              key={option.value}
              className={`border-cool-gray-200 w-full border-b py-[5px] ${option.value === "favoritest" && "border-b-0"}`}
              onClick={() => {
                setSortOptions(option.label);
                onSelect(option.value);
              }}
            >
              <p>{option.label}</p>
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
