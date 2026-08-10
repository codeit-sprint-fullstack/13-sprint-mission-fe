"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface KebabMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function KebabMenu({ onEdit, onDelete }: KebabMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1 text-secondary-400 hover:text-secondary-600 transition-colors"
        aria-label="더보기"
      >
        <Image src="/icons/ic_kebab.svg" alt="" width={20} height={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-secondary-200 rounded-lg shadow-md z-10 min-w-25 overflow-hidden">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
          >
            수정하기
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
