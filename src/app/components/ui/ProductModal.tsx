"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ProductDeleteConfirmModalProps {
  message?: string;
  onClick: () => void;
  onExit: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export default function ProductDeleteConfirmModal({
  message,
  onClick,
  onExit,
  confirmLabel = "네",
  cancelLabel = "취소",
}: ProductDeleteConfirmModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center bd:items-center justify-center bg-black/50"
      onClick={onExit}
    >
      <div
        className="w-62.5 bg-white rounded-t-2xl bd:rounded-2xl px-6 pt-6 pb-6 flex flex-col items-center gap-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex rounded-full bg-red w-6 h-6 items-center justify-center">
          <Image
            src="/icons/Modal/Delete/Footer/icon/check.svg"
            alt=""
            width={12}
            height={12}
          />
        </div>
        {message && (
          <p className="text-center text-sm text-secondary-800 leading-relaxed">
            {message}
          </p>
        )}
        <div className="w-full flex flex-row justify-center items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="w-22 h-12 bg-secondary-100 text-red rounded-xl border-1 border-red text-base font-semibold cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onClick}
            className="w-22 h-12 bg-red text-white rounded-xl text-base font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
