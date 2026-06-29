"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function ConfirmModal({
  title,
  message,
  children,
  onClick,
  onExit,
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end bd:items-center justify-center bg-black/50"
      onClick={onExit}
    >
      <div
        className="w-full bd:w-135 bg-white rounded-t-2xl bd:rounded-2xl px-6 pt-6 pb-8 bd:pb-6 flex flex-col gap-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        </div>

        {message && (
          <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
        )}

        {children && <div>{children}</div>}

        <button
          type="button"
          onClick={onClick}
          className="w-full h-12 bg-primary text-white rounded-xl text-base font-semibold border-none cursor-pointer hover:bg-primary-200 transition-colors"
        >
          확인
        </button>
      </div>
    </div>,
    document.body
  );
}