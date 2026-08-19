"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const OPTIONS = [
  { value: "recent", label: "최신순" },
  { value: "like", label: "좋아요순" },
  { value: "oldest", label: "오래된순" },
];

export default function SortDropDown({ current }: { current: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    localStorage.setItem("sortOrder", value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderBy", value);
    router.push(`?${params.toString()}`);
    setOpen(false);
  };

  const currentLabel =
    OPTIONS.find((opt) => opt.value === current)?.label ?? OPTIONS[0].label;

  return (
    <div className="relative w-13.5 shrink-0 tablet:w-34.5" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="정렬 순서 선택"
        className="w-full h-13.5 tablet:h-auto flex items-center justify-center tablet:justify-between border border-gray-200 rounded-xl px-3.5 tablet:px-5 py-3 cursor-pointer bg-white"
      >
        <span className="hidden tablet:inline">{currentLabel}</span>
        <span
          className={`transition-transform ${open ? "rotate-180" : ""} text-[24px] tablet:text-[16px] leading-none`}
        >
          <span className="tablet:hidden">
            <Image
              src="/images/ic_sort.png"
              width={24}
              height={24}
              alt="정렬 아이콘"
            />
          </span>
          <span className="hidden tablet:inline">▾</span>
        </span>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] right-0 w-34.5 bg-white border rounded-xl shadow-md overflow-hidden z-10">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`block w-full px-5 py-3 text-left hover:bg-gray-100 cursor-pointer ${
                opt.value === current ? "bg-gray-50 font-semibold" : ""
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
