"use client";
import { useState, useEffect } from "react";
import {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} from "@/api/articlesComments";
import { getMe } from "@/api/user";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentsSection({ initialComments, articleId }) {
  const [comments, setComments] = useState(initialComments);
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    getMe().then((me) => setMyId(me?.id)).catch(() => {});
  }, []);

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
        myId={myId}
      />
    </>
  );
}
