"use client";
import { useEffect, useRef, useState } from "react";

export default function KebabMenu({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-max" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
        aria-label="수정/삭제 메뉴"
      >
        ⋮
      </button>
      {open && (
        <div className="absolute right-0 top-6 bg-white border rounded shadow-md text-sm z-10 whitespace-nowrap w-max">
          <button
            onClick={() => {
              onEdit?.();
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 border-b whitespace-nowrap"
          >
            수정하기
          </button>
          <button
            onClick={() => {
              onDelete?.();
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100 whitespace-nowrap"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
