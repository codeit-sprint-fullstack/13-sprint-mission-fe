"use client";

export default function Modal({
  open,
  title,
  message,
  onClose,
  onConfirm,
  labelledBy = "modal-title",
  hideTitle = false,
  confirmText = "확인",
  cancelText = "취소",
  showCancel = false,
  isConfirmDisabled = false,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div className="flex h-[250px] w-[calc(100vw-32px)] max-w-[540px] flex-col items-center justify-center rounded-lg bg-white px-6 text-center shadow-xl">
        <h2
          id={labelledBy}
          className={
            hideTitle ? "sr-only" : "text-lg font-bold text-[#111827]"
          }
        >
          {title}
        </h2>
        <p
          className={
            hideTitle
              ? "text-base leading-6 text-[#111827]"
              : "mt-4 text-base leading-6 text-[#374151]"
          }
        >
          {message}
        </p>
        <div className="mt-6 flex w-full justify-center gap-3">
          {showCancel && (
            <button
              type="button"
              onClick={onClose}
              className="h-12 w-full max-w-[120px] rounded-lg bg-panda-200 text-base font-semibold text-panda-600 transition-colors hover:bg-panda-300"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm || onClose}
            disabled={isConfirmDisabled}
            className="h-12 w-full max-w-[120px] rounded-lg bg-[#3692FF] text-base font-semibold text-white transition-colors hover:bg-[#1967D6] disabled:cursor-not-allowed disabled:bg-panda-300"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
