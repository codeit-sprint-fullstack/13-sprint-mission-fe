"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
const ARROW_DOWN_ICON = "/icons/ic_arrow_down.svg";
const OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "favorite" },
];

/**
 * 정렬 옵션 드롭다운 컴포넌트입니다.
 * @param {{ value: string, onChange: (value: string) => void }} props
 */
export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = OPTIONS.find((o) => o.value === value)?.label ?? "최신순";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2 border border-secondary-200 rounded-lg text-sm text-secondary-700 bg-white hover:border-secondary-400 transition-colors min-w-25 justify-between"
      >
        {current}
        <Image src={ARROW_DOWN_ICON} alt="dropdown" width={24} height={24} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-secondary-200 rounded-lg shadow-2xl z-10 min-w-25">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary-50 transition-colors ${
                opt.value === value
                  ? "text-primary font-medium"
                  : "text-secondary-700"
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
