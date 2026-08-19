"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import dropdownIcon from "@/assets/icons/ic_arrow_down.svg";
import useClickOutside from "@/hooks/useClickOutside";

interface DropDownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options?: DropDownOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function Dropdown({
  options = [],
  value,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentOption = options.find((opt) => opt.value === value);
  const selectedLabel = currentOption ? currentOption.label : "최신 순";

  function handleDropdownOption(selectedValue: string) {
    setIsOpen(false);
    if (onChange) {
      onChange(selectedValue);
    }
  }

  const handleCloseDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);
  useClickOutside(dropdownRef, handleCloseDropdown);

  return (
    <div ref={dropdownRef} className="relative w-32.5">
      <button
        type="button"
        className="border-cool-gray-200 flex h-10.5 w-full cursor-pointer items-center justify-between rounded-xl border border-solid bg-white px-5 py-3 text-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-secondary-800 text-[1rem] font-normal">
          {selectedLabel}
        </span>
        <Image
          src={dropdownIcon}
          alt="드롭다운 아이콘"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="border-cool-gray-200 absolute left-0 z-50 mt-2 flex h-21 w-full flex-col overflow-hidden rounded-xl border border-solid bg-white py-[0.44rem]">
          {options.map((option, index) => (
            <li
              key={option.value}
              onClick={() => handleDropdownOption(option.value)}
              className={`text-secondary-800 flex h-full cursor-pointer items-center justify-center pt-[0.2rem] text-[1rem] font-normal ${index === 0 ? "border-cool-gray-200 border-b border-solid" : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
