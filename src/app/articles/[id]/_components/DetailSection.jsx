"use client";

import Comment from "@/app/articles/[id]/_components/Comment.jsx";
import DetailCard from "@/app/articles/[id]/_components/DetailCard.jsx";
import ActionButton from "@/components/button/ActionButton.jsx";
import TextField from "@/components/common/TextField.jsx";
import { deleteArticle } from "@/lib/api/articles.js";
import useComments from "@/utils/useComments.js";
import clsx from "clsx";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
import commentNull from "@/asset/image/commentNull.png";
import Image from "next/image.js";

export default function DetailSection({ article, id }) {
  const [newComment, setNewComment] = useState("");
  const router = useRouter();

  const { comments, createComment, updateComment, deleteComment } =
    useComments(id);

  const isValid = (comment) => {
    if (comment.length > 100) return false;
    return true;
  };
  const newCommentIsValid = isValid(newComment);

  const handleSubmit = async () => {
    if (!(newComment.trim() && newCommentIsValid)) return;
    try {
      await createComment(newComment);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    router.push(`/articles/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(id);
      router.push("/articles");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DetailCard
        className={clsx("mb-8 md:mb-10 lg:mb-8")}
        content={article.content}
        id={article.id}
        title={article.title}
        createdAt={article.createdAt}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <TextField
        className={clsx(newCommentIsValid ? "mb-4" : "")}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        variant="comment"
        title="댓글달기"
        placeholder="댓글을 입력해주세요."
        isError={!newCommentIsValid}
        errorMessage={!newCommentIsValid ? "*댓글은 100자 이하여야 합니다" : ""}
      />
      <ActionButton
        className={clsx("mb-6 md:mb-8 lg:mb-10 flex justify-self-end")}
        text="등록"
        onClick={handleSubmit}
        disabled={!(newComment.trim() && newCommentIsValid)}
      />
      {comments.length < 1 ? (
        <Image
          className={clsx(
            "w-37.75 h-52 mb-10 md:mb-14 lg:mb-12 flex justify-self-center",
          )}
          src={commentNull}
          alt="댓글이 없음 이미지"
        />
      ) : (
        <div className={clsx("mb-10 md:mb-14 lg:mb-16")}>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              content={comment.content}
              id={comment.id}
              createdAt={comment.createdAt}
              onEdit={updateComment}
              onDelete={deleteComment}
            />
          ))}
        </div>
      )}
    </>
  );
}
