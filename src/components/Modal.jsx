"use client";

import { X } from "lucide-react";

export default function Modal({
  title,
  children,
  confirmText = "확인",
  cancelText,
  onConfirm,
  onClose,
  danger,
  busy,
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-gray-900/50 p-5"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="relative w-full max-w-[460px] rounded-lg bg-white p-7 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600"
          type="button"
          aria-label="닫기"
          onClick={onClose}
        >
          <X size={18} />
        </button>
        <h2 id="modal-title" className="mb-4 text-xl font-bold">
          {title}
        </h2>
        <div className="[&_p]:leading-relaxed">{children}</div>
        <div className="mt-6 flex justify-end gap-2.5">
          {cancelText ? (
            <button
              className="inline-flex min-h-[42px] items-center justify-center rounded-lg bg-[#f3f4f6] px-[18px] font-bold text-[#1f2937]"
              type="button"
              onClick={onClose}
            >
              {cancelText}
            </button>
          ) : null}
          <button
            className={`inline-flex min-h-[42px] items-center justify-center rounded-lg px-[18px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-70 ${danger ? "bg-[#ef4444]" : "bg-[#3692ff]"}`}
            type="button"
            onClick={onConfirm || onClose}
            disabled={busy}
          >
            {busy ? "처리 중..." : confirmText}
          </button>
        </div>
      </section>
    </div>
  );
}
