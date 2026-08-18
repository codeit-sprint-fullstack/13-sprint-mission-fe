"use client";

import { useEffect } from "react";
import Image from "next/image";

import Button from "@/components/common/Button";

import IcCheck from "@/app/assets/ic_check.svg";

export default function ConfirmModal({
  description = "",
  isOpen,
  onClose,
  onConfirm,
}: {
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  // ESC 키 감지
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
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
        className='inline-flex flex-col justify-center items-center max-w-[298px] p-[24px] rounded-[12px] bg-[#fff]'
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={IcCheck}
          alt=''
          width={24}
          height={24}
          sizes='(max-width: 744px) 196px, 396px'
          className='mb-[24px]'
        />
        <p className='mb-[32px] text-[16px]/[calc(26/16)] font-medium text-secondary-800'>
          {description}
        </p>
        <div className='flex items-center justify-between gap-[8px]'>
          <Button variant='quaternary' type='button' onClick={onClose}>
            취소
          </Button>
          <Button variant='quinary' type='button' onClick={onConfirm}>
            네
          </Button>
        </div>
      </div>
    </article>
  );
}
