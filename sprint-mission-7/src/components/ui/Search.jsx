import React from "react";
import { cn } from "@/lib/cn";
import SearchIcon from "../../../public/icons/search.svg";

export default function Search({ placeholder, className }) {
  return (
    <div className="relative w-full">
      <img
        src={SearchIcon.src}
        alt="검색"
        className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
      />
      <input
        placeholder={placeholder}
        className={cn(
          "w-full h-[42px] py-[9px] pl-12 pr-4 bg-Cool-Gray-100 rounded-xl text-[16px] font-normal text-Cool-Gray-400",
          className,
        )}
      />
    </div>
  );
}
