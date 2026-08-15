"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ArrowDown from "@/assets/svg/ic_arrow_down.svg";
import SortIcon from "@/assets/svg/ic_sort.svg";

type SortOption = {
  value: string;
  label: string;
};

const DEFAULT_OPTIONS: SortOption[] = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순" },
];

type SortDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options?: SortOption[];
};

export default function SortDropdown({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="md:hidden w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg"
      >
        <Image src={SortIcon} alt="정렬" width={20} height={20} />
      </button>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="hidden md:flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-white text-sm font-medium text-gray-800 min-w-32 justify-between"
      >
        <span>{selected?.label}</span>
        <Image
          src={ArrowDown}
          alt="드롭다운"
          width={24}
          height={24}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-full right-0 mt-1 min-w-30 bg-white border border-gray-200 rounded-xl overflow-hidden z-20 shadow-md">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                  option.value === value ? "text-primary-100 font-medium" : "text-gray-800"
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
