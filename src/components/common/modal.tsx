"use client";

import { ReactNode, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
  icon?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
  variant = "default",
  icon = false,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDanger = variant === "danger";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`w-[calc(100%-32px)] max-w-130 bg-white rounded-2xl shadow-lg px-6 py-8 tablet:p-10 ${
          icon ? "text-center" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {icon && (
          <div className="mx-auto mb-4 flex items-center justify-center rounded-full bg-error-red size-12">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {title && (
          <h2 className="text-[20px] font-bold text-gray-900 mb-4">{title}</h2>
        )}

        {children && (
          <div className="text-[16px] text-gray-600 mb-8">{children}</div>
        )}

        <div className="flex gap-4">
          {onConfirm && onClose && (
            <button
              onClick={onClose}
              className={`flex-1 py-3.5 font-semibold text-[16px] cursor-pointer ${
                isDanger
                  ? "rounded-lg border border-error-red text-error-red hover:bg-red-50"
                  : "rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm ?? onClose}
            className={`flex-1 py-3.5 font-semibold text-[16px] cursor-pointer ${
              isDanger
                ? "rounded-lg bg-error-red text-white hover:bg-red-600"
                : "rounded-lg bg-primary-100 text-white hover:bg-primary-200"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
