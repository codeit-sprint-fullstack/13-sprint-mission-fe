"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
const ARROW_DOWN_ICON = "/icons/ic_arrow_down.svg";
const OPTIONS = [{ label: "최신순", value: "recent" }];

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
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:border-gray-300 transition-colors min-w-25 justify-between"
      >
        {current}
        <Image src={ARROW_DOWN_ICON} alt="dropdown" width={24} height={24} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl z-10 min-w-25">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                opt.value === value
                  ? "text-[#3692FF] font-medium"
                  : "text-gray-700"
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
