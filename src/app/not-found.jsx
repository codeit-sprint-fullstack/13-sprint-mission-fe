import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2>404 Not Found</h2>
      <p>요청한 페이지를 찾을 수 없습니다.</p>
      <p className="text-blue-500 bg-blue-100 px-4 py-2 rounded-md hover:bg-blue-200">
        <Link href="/">홈으로 이동</Link>
      </p>
    </div>
  );
}
