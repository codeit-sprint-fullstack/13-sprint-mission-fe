"use client";

import { useRouter } from "next/navigation";
import { deleteArticle } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";

// 게시글 삭제 버튼 (케밥 메뉴용). client에서 직접 API 호출
export default function DeleteArticleButton({
  articleId,
}: {
  articleId: number | string;
}) {
  const router = useRouter();

  async function handleDelete() {
    try {
      await deleteArticle(articleId);
      router.push("/boards");
      router.refresh(); // 목록에서 삭제된 글 제거 반영
    } catch (err) {
      alert(getErrorMessage(err, "삭제에 실패했어요."));
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="w-full py-3 hover:bg-gray-50"
    >
      삭제하기
    </button>
  );
}
