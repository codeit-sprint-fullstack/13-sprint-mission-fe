"use client";

import { useModal } from "../../providers/ModalProvider";

export default function Modal() {
  const { isOpen, message, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={closeModal} />
      <div className="relative flex h-[250px] w-[540px] items-center justify-center rounded-lg bg-white px-10 py-10">
        <div className="flex flex-col items-center gap-10">
          <p className="text-center text-[18px] font-medium text-gray-800">
            {message}
          </p>
          <button
            type="button"
            onClick={closeModal}
            className="h-[48px] w-[165px] rounded-lg bg-brand-blue text-body-md font-semibold text-gray-100"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
