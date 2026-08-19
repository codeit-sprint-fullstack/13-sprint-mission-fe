"use client";

import React, { useRef } from "react";
import Button from "@/components/ui/Button";
import useClickOutside from "@/hooks/useClickOutside";

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({
  isOpen,
  message,
  onClose,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => {
    if (onClose) onClose();
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        ref={modalRef}
        className="flex h-full max-h-62.5 w-full max-w-135 flex-col items-center justify-center gap-2.5 rounded-lg bg-white px-43 py-10"
      >
        <div className="flex w-full flex-col items-center gap-10">
          <div className="text-secondary-800 text-2lg w-full justify-center text-center font-medium whitespace-nowrap">
            {message}
          </div>
          {children ? (
            children
          ) : (
            <Button
              size="small"
              variant="primary"
              rounded="square"
              className="w-full"
              onClick={onClose}
            >
              확인
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
