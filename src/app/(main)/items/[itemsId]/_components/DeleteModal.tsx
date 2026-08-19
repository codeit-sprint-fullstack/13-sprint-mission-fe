import Image from "next/image";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex w-[298px] flex-col items-center gap-8 rounded-2xl bg-white p-6">
        <div className="bg-error flex h-6 w-6 items-center justify-center rounded-full">
          <Image src="/image/check.svg" alt="back" width={12} height={12} />
        </div>

        <p className="text-center text-lg font-medium text-gray-800">정말로 상품을 삭제하시겠어요?</p>

        <div className="flex w-[184px] gap-2">
          <button onClick={onCancel} className="border-error text-error h-12 flex-1 rounded-xl border text-lg font-semibold">
            취소
          </button>
          <button onClick={onConfirm} className="bg-error h-12 flex-1 rounded-xl text-lg font-semibold text-white">
            네
          </button>
        </div>
      </div>
    </div>
  );
}