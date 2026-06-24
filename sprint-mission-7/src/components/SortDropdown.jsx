"use client";

import React, { useState, useEffect, useRef } from "react";

export default function SortDropdown({ onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("최신순");

  const dropdownRef = useRef(null);
  const options = ["최신순", "좋아요순"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSortChange) {
      onSortChange(option);
    }
  };

  return (
    <div
      className="relative inline-block text-left select-none"
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-[12px] px-[20px] py-[12px] w-[130px] h-[42px] text-[16px] font-normal text-[#1F2937] cursor-pointer"
      >
        <span>{selected}</span>

        <div
          className={`w-[24px] h-[24px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <img
            src="/ic_arrow_down.png"
            alt="arrow down"
            className="w-full h-full"
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[130px] origin-top-right bg-white border border-[#E5E7EB] rounded-[12px] box-border overflow-hidden z-50">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-4 py-2.5 text-[16px] cursor-pointer ${
                  selected === option
                    ? "bg-[#F3F4F6] font-semibold text-[#1F2937]"
                    : "text-[#4B5563]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
