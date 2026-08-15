"use client";

/** 에러 표시 컴포넌트 */
export default function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className='flex items-center justify-center min-h-[350px]'>
      {message}
    </div>
  );
}
