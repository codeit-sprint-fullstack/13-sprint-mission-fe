"use client";

import Image from "next/image";
import kebabIcon from "@/assets/icons/ic_kebab.svg";
import { useCallback, useRef, useState } from "react";
import { TOGGLE_OPTIONS } from "@/constants/dropdownOption";
import useClickOutside from "@/hooks/useClickOutside";

interface KebabDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function KebabDropdown({
  onEdit,
  onDelete,
}: KebabDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleDropdownOption(id: number) {
    console.log("드롭다운 선택됨:", id);
    setIsOpen(false);

    if (id === 1 && onEdit) {
      console.log("수정 호출");
      onEdit();
    }
    if (id === 2 && onDelete) {
      console.log("삭제 호출");
      onDelete();
    }
  }

  const handleCloseDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);
  useClickOutside(dropdownRef, handleCloseDropdown);

  return (
    <div
      ref={dropdownRef}
      className="relative flex h-6 w-6 shrink-0 items-center justify-center"
    >
      <button onClick={handleToggle} type="button" className="cursor-pointer">
        <Image src={kebabIcon} alt="케밥 아이콘"></Image>
      </button>

      {isOpen && (
        <ul className="border-cool-gray-300 absolute top-6 right-0 z-50 flex w-34.75 cursor-pointer flex-col items-center justify-center gap-[1em] rounded-lg border border-solid bg-white py-4">
          {TOGGLE_OPTIONS.map((option) => (
            <li
              key={option.id}
              className="text-secondary-500 w-full text-center text-[1rem] font-normal"
              onClick={() => handleDropdownOption(option.id)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
