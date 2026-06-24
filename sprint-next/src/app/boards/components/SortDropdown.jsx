"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SortIcon from "@/assets/svg/ic_sort.svg";

const SORT_OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "favorite" },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOrder = searchParams.get("orderBy") ?? "recent";

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selected =
    SORT_OPTIONS.find((o) => o.value === currentOrder) ?? SORT_OPTIONS[0];

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (option) => {
    setIsOpen(false);
    router.push(`?orderBy=${option.value}`);
  };

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg"
      >
        <Image src={SortIcon} alt="정렬" width={20} height={20} />
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden z-10">
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  selected.value === option.value
                    ? "text-primary-100 font-medium"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
