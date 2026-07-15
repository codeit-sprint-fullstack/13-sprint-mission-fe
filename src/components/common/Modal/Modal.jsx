'use client';

import { useEffect } from "react";

import Button from "@/components/common/Button";

export default function Modal({
  description = "",
  isOpen,
  onClose,
  buttons = null,
}) {
  // ESC 키 감지
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <article
      className='fixed top-0 left-0 z-modal flex flex-col justify-center items-center w-full h-full bg-[rgba(0,0,0,0.70)]'
      onClick={onClose}
    >
      <div
        className='inline-flex flex-col justify-center items-center gap-[40px] max-w-[327px] md:max-w-[540px] py-[52px] px-[67.5px] md:py-[68px] md:px-[162px] rounded-[8px] bg-[#fff]'
        onClick={(e) => e.stopPropagation()}
      >
        <p className='text-[16px]/[calc(26/16)] md:text-[18px]/[calc(26/18)] text-center font-medium text-secondary-800'>
          {description}
        </p>
        <div className='flex items-center justify-between gap-[8px]'>
          {buttons && buttons}
          <Button
            variant='tertiary'
            type='button'
            onClick={onClose}
            width='50%'
          >
            확인
          </Button>
        </div>
      </div>
    </article>
  );
}
