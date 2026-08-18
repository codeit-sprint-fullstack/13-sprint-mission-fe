"use client";

import { useEffect } from "react";

type ModalProps = {
  message: string;
  onClose: () => void;
};

export default function Modal({ message, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg px-[11.69rem] py-10 flex flex-col items-center gap-6 shadow-lg max-w-135"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-base text-gray-800 text-center whitespace-nowrap">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-primary-100 hover:bg-primary-200 text-white font-bold py-3 rounded-xl transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
}
