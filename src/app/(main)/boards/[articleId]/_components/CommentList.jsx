"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EmptyState from "../../../../../components/EmptyState";
import CommentItem from "./CommentItem";
import { deleteComment, getComment, updateComment } from "@/app/api/comments";

export default function CommentList({ refreshTrigger, onSuccess }) {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getComments() {
      setIsLoading(true);
      const commentData = await getComment(articleId);
      setComments(commentData.data);
      setIsLoading(false);
    }
    getComments();
  }, [refreshTrigger]);

  const handleDelete = async (commentId) => {
    const res = await deleteComment(articleId, commentId);
    if (!res.ok) return alert("삭제 실패");
    onSuccess();
  };

  const handleUpdate = async (commentId, updatedComment) => {
    const res = await updateComment(articleId, commentId, updatedComment);
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
