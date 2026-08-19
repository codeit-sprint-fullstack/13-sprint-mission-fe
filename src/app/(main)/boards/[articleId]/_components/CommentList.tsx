"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EmptyState from "../../../../../components/EmptyState";
import CommentItem from "./CommentItem";
import { deleteComment, getComment, updateComment } from "@/app/api/comments";
import { ArticleComment } from "@/types/comment";

interface CommentListProps {
  refreshTrigger: boolean;
  onSuccess: () => void;
}

type ArticleParams = {
  articleId: string;
};

export default function CommentList({
  refreshTrigger,
  onSuccess,
}: CommentListProps) {
  const { articleId } = useParams<ArticleParams>();
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getComments() {
      setIsLoading(true);
      const commentData = await getComment(Number(articleId));
      setComments(commentData.data);
      setIsLoading(false);
    }
    getComments();
  }, [refreshTrigger, articleId]);

  const handleDelete = async (
    commentId: ArticleComment["id"],
  ): Promise<void> => {
    const res = await deleteComment(Number(articleId), commentId);
    if (!res.ok) return alert("삭제 실패");
    onSuccess();
  };

  const handleUpdate = async (
    commentId: ArticleComment["id"],
    updatedComment: ArticleComment["content"],
  ): Promise<void> => {
    const res = await updateComment(
      Number(articleId),
      commentId,
      updatedComment,
    );
    if (!res.ok) return alert("수정 실패");
    onSuccess();
  };

  if (isLoading) return <EmptyState>댓글 로딩 중...</EmptyState>;

  return (
    <ul className="flex flex-col gap-[24px]">
      {!comments.length ? (
        <EmptyState>
          아직 댓글이 없어요,
          <br />
          지금 댓글을 달아보세요!
        </EmptyState>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))
      )}
    </ul>
  );
}
