"use client";

import React from "react";
import { useParams } from "next/navigation"; // 💡 주소창의 id를 읽어오는 훅

export default function ArticleDetailPage() {
  const params = useParams();
  const { id } = params; // 주소창의 [id] 값이 쏙 들어옴

  return (
    <main className="mt-[86px] mx-auto max-w-[1200px] px-4">
      <h1 className="text-3xl font-bold text-gray-800">
        게시글 상세 페이지 준비 중! 🛠️
      </h1>
      <p className="text-xl text-gray-500 mt-4">
        현재 클릭한 게시글의 ID 번호는{" "}
        <span className="text-blue-600 font-bold">{id}</span> 번입니다.
      </p>
    </main>
  );
}
