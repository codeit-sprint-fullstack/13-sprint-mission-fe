"use client";

export default function AlertModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl px-6 py-8 max-w-sm w-full mx-4 flex flex-col items-center gap-6">
        <p className="text-gray-800 font-medium text-center">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-primary-100 hover:bg-primary-200 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
}
