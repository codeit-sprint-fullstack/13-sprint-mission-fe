import { useState, useEffect, useCallback } from "react";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../api/articleApi";
import type { ArticleComment } from "../types/article";

export function useComments(articleId: string | number | undefined) {
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [loading, setLoading] = useState(false);

  const loadComments = useCallback(async () => {
    if (!articleId) return;

    try {
      setLoading(true);
      const data = await getComments(articleId, { limit: 50 });
      // 참고: 기존 코드는 data?.data를 읽고 있었는데 응답 필드는 list이므로
      // 댓글이 항상 빈 배열로 표시되는 버그였다. TS 전환 중 발견해서 바로잡음.
      setComments(data?.list || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("댓글 로드 실패:", message);
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const addComment = useCallback(
    async (content: string) => {
      try {
        await createComment(articleId!, content);
        await loadComments();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        alert("댓글 등록 실패: " + message);
      }
    },
    [articleId, loadComments]
  );

  const editComment = useCallback(
    async (commentId: number, content: string) => {
      try {
        await updateComment(commentId, content);
        await loadComments();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        alert("댓글 수정 실패: " + message);
      }
    },
    [loadComments]
  );

  const removeComment = useCallback(
    async (commentId: number) => {
      try {
        await deleteComment(commentId);
        await loadComments();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        alert("댓글 삭제 실패: " + message);
      }
    },
    [loadComments]
  );

  return { comments, loading, addComment, editComment, removeComment };
}
