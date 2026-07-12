"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";

import MoreButtonBase from "@/components/common/MoreButton/MoreButtonBase";

/** 게시글 상세페이지 상단 영역 - 게시글 정보 섹션 더보기 버튼 컴포넌트 */
export default function ArticleMoreButton({ articleId }) {
  const router = useRouter();
  const { user, getToken } = useAuth();
  const [isMyArticle, setIsMyArticle] = useState(false);

  /** 게시글 삭제 핸들러 */
  async function handleArticleDelete() {
    try {
      const token = getToken();
      const result = await deleteArticleAction(articleId, token);

      if (result?.success) {
        router.push("/articles");
        setMoreModal(false);
      }
    } catch (error) {
      console.error("❌ 게시글 삭제 실패:", error);
    }
  }

  useEffect(() => {
    /** 사용자가 작성한 게시글 확인 핸들러 */
    const checkIsMyContent = async () => {
      if (!user) return;

      try {
        const myArticles = await userService.getMyArticles();
        setIsMyArticle(
          myArticles.list.some((p) => p.id === parseInt(articleId, 10)),
        );
      } catch (error) {
        console.error("사용자 게시글 정보를 가져오는데 실패했습니다:", error);
      }
    };

    checkIsMyContent();
  }, [user, articleId]);

  if (!isMyArticle) return null;

  return (
    <MoreButtonBase
      onEdit={() => router.push(`/articles/${articleId}/edit`)}
      onDelete={handleArticleDelete}
    />
  );
}
