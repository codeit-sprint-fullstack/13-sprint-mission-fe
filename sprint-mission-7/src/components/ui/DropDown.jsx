"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Kebob from "../../../public/icons/kebob.svg";

export default function DropDown({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleEdit = () => {
    setOpen(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setOpen(false);
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete?.();
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Image width={20} height={20} src={Kebob} alt="더보기" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-10 mt-1 w-28 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
        >
          <button
            role="menuitem"
            onClick={handleEdit}
            className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-50"
          >
            수정하기
          </button>
          <button
            role="menuitem"
            onClick={handleDelete}
            className="block w-full px-4 py-2 text-center text-sm text-red-600 hover:bg-red-50"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
