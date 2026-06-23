// src/components/ArticleDetail.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/constants/article";
import { formatDate } from "@/utils/formatDate";
import CommentList from "./CommentList";

export default function ArticleDetail({ article }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/articles/${article.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 실패");
      router.push("/"); // 삭제 후 목록으로
    } catch (error) {
      console.error(error);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleEdit = () => {
    router.push(`/boards/${article.id}/edit`);
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
      {/* 제목 + 점3개 메뉴 */}
      <div className="flex items-start justify-between border-b border-gray-200 pb-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-800">{article.title}</h1>
          <div className="mt-4 flex items-center gap-3">
            <img
              src="/img/main/ic_profile.svg"
              alt=""
              className="h-9 w-9 shrink-0"
            />
            <span className="whitespace-nowrap text-sm text-gray-600">
              {" "}
              총명한 판다
            </span>
            <span className="whitespace-nowrap text-sm text-gray-400">
              {formatDate(article.createdAt)}
            </span>

            {/* 구분선 + 좋아요 */}
            <span className="mx-2 text-gray-200">|</span>
            <span className="flex shrink-0 items-center gap-1 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-500">
              <img
                src="/img/main/ic_heart.svg"
                alt="좋아요"
                className="h-4 w-4"
              />
              123
            </span>
          </div>
        </div>

        {/* 점3개 메뉴 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="px-2 text-xl text-gray-400"
          >
            ⋮
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 w-32 rounded-lg border border-gray-200 bg-white py-2 shadow">
              <button
                type="button"
                onClick={handleEdit}
                className="block w-full px-4 py-2 text-center text-sm text-gray-600 hover:bg-gray-50"
              >
                수정하기
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="block w-full px-4 py-2 text-center text-sm text-gray-600 hover:bg-gray-50"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 내용 */}
      <CommentList articleId={article.id} />

      {/* // ArticleDetail.jsx — CommentList 아래 */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-2 rounded-full bg-primary-100 px-8 py-2.5 text-sm font-semibold text-white md:px-10 md:py-3 md:text-base"
        >
          목록으로 돌아가기
          <span>↩</span>
        </button>
      </div>
    </div>
  );
}
