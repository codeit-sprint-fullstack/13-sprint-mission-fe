"use client";
import { useState } from "react";
import {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} from "@/api/comments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

// 서버에서 받은 초기 댓글을 상태로 관리하며 CRUD를 처리하는 클라이언트 컴포넌트
export default function CommentsSection({ initialComments, articleId }) {
  const [comments, setComments] = useState(initialComments);

  const refetchComments = async () => {
    const data = await getComments(articleId);
    setComments(data.list ?? []);
  };

  const handleSubmit = async (content) => {
    await createComment(articleId, content);
    refetchComments();
  };

  const handleEdit = async (commentId, newContent) => {
    await updateComment(commentId, newContent);
    refetchComments();
  };

  const handleDelete = async (commentId) => {
    await deleteComment(commentId);
    refetchComments();
  };

  return (
    <>
      <CommentForm onSubmit={handleSubmit} />
      <CommentList
        comments={comments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}
