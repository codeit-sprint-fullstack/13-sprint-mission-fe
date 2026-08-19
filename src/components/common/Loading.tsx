"use client";
/**
 * 로딩 컴포넌트
 * @param {Object} props
 * @param {string} [props.message] - 로딩 메시지 (선택)
 */
export default function Loading({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="border-4 border-gray-100 border-t-primary-100 rounded-full animate-spin size-12" />
      {message && <p className="text-gray-400">{message}</p>}
    </div>
  );
}
