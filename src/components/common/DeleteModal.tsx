"use client";

import Button from "@/components/ui/Button";
import Modal from "./Modal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  message?: string;
  isPending?: boolean;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  message = "정말 삭제하시겠습니까?",
  isPending = false,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} message={message} onClose={onClose}>
      <div className="mt-4 flex w-full justify-center gap-2">
        <Button
          type="button"
          size="small"
          variant="redOutline"
          rounded="square"
          onClick={onClose}
          disabled={isPending}
        >
          취소
        </Button>

        <Button
          type="button"
          size="small"
          variant="red"
          rounded="square"
          onClick={onDelete}
          disabled={isPending}
        >
          삭제
        </Button>
      </div>
    </Modal>
  );
}
