"use client";

import { useRef, useState, useEffect } from "react";
const DEBOUNCE_DELAY = 500;

/**
 * 디바운스가 적용된 검색 입력 컴포넌트입니다. DELAY = 500
 * @param {{ value: string, onChange: (value: string) => void, placeholder?: string }} props
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "검색할 상품을 입력해주세요",
}) {
  const [local, setLocal] = useState(value);
  const timer = useRef(null);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  const handleChange = (e) => {
    const debouncedValue = e.target.value;
    setLocal(debouncedValue);
    if (timer.current) clearTimeout(timer.current);
    if (debouncedValue.length === 0) {
      onChange("");
    } else if (debouncedValue.length >= 1) {
      timer.current = setTimeout(
        () => onChange(debouncedValue),
        DEBOUNCE_DELAY,
      );
    }
  };

  return (
    <div className="relative flex-1">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
      <input
        type="text"
        value={local}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 bg-secondary-50 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition"
      />
    </div>
  );
}
