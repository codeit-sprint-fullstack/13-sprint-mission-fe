"use client";
import React, { useEffect } from "react";

export default function AuthModal({
  isOpen,
  onClose,
  message = "가입 완료되었습니다.",
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `15px`;
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg flex flex-col gap-[42px] w-[327px] h-[220px] justify-center items-center md:w-[540px] md:h-[250px]">
        <p className="text-gray-800 text-lg font-medium md:text-2lg">
          {message}
        </p>
        <button
          onClick={onClose} 
          className="bg-primary-100 rounded-lg w-[120px] h-[48px] text-gray-100 text-lg font-semibold md:w-[165px]"
        >
          확인
        </button>
      </div>
    </div>
  );
}
