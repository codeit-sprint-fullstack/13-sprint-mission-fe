"use client";

export default function Modal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl px-16 py-12 flex flex-col items-center gap-8 shadow-lg">
        <p className="text-lg font-medium text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white px-16 py-3 rounded-xl font-medium transition"
        >
          확인
        </button>
      </div>
    </div>
  );
}
