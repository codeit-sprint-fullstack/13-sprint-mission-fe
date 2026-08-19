"use client";
import { useState, useEffect } from "react";
import { createComment, updateComment, deleteComment, getComments } from "@/api/articlesComments";
import { getMe } from "@/api/user";
import CommentForm from "@/components/comments/CommentForm";
import CommentList from "@/components/comments/CommentList";
import type { ArticleComment } from "@/types/article";

interface CommentsSectionProps {
  initialComments: ArticleComment[];
  articleId: string | number;
}

export default function CommentsSection({ initialComments, articleId }: CommentsSectionProps) {
  const [comments, setComments] = useState<ArticleComment[]>(initialComments);
  const [myId, setMyId] = useState<number | null>(null);

  useEffect(() => {
    getMe()
      .then((me) => setMyId(me?.id ?? null))
      .catch(() => {});
  }, []);

  const refetchComments = async () => {
    const data = await getComments(articleId);
    setComments(data.list);
  };

  const handleSubmit = async (content: string) => {
    await createComment(articleId, content);
    refetchComments();
  };

  const handleEdit = async (commentId: number, newContent: string) => {
    await updateComment(commentId, newContent);
    refetchComments();
  };

  const handleDelete = async (commentId: number) => {
    await deleteComment(commentId);
    refetchComments();
  };

  return (
    <>
      <CommentForm onSubmit={handleSubmit} heading="댓글달기" placeholder="댓글을 입력해주세요." />
      <CommentList
        comments={comments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        myId={myId}
        emptyImageSrc="/image/Img_reply_empty.png"
        emptyImageAlt="댓글없음"
        emptyMessage={
          <>
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </>
        }
        emptyMessageClassName="text-2lg"
      />
    </>
  );
}