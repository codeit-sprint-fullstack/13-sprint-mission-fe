"use client";

import { useEffect, useRef, useState } from "react";

type KebabMenuOption = {
  label: string;
  onClick: () => void;
};

type KebabMenuProps = {
  options: KebabMenuOption[];
};

export default function KebabMenu({ options }: KebabMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="w-6 h-6 flex items-center justify-center text-gray-400 text-xl"
      >
        ⋮
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded-lg shadow-md z-10 overflow-hidden">
          {options.map(({ label, onClick }) => (
            <li key={label}>
              <button
                onClick={() => {
                  onClick();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
