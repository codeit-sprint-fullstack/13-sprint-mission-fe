"use client";

import Button from "@/components/common/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import type { Comment } from "@/lib/types";
import CommentItem from "./CommentItem";

interface CommentBoardProps {
  queryKey: unknown[];
  queryFn: () => Promise<Comment[]>;
  createFn: (content: string) => Promise<unknown>;
  updateFn: (commentId: string, content: string) => Promise<unknown>;
  deleteFn: (commentId: string) => Promise<unknown>;
  heading: string;
  placeholder: string;
  deleteConfirmText: string;
  emptyImageSrc: string;
  emptyImageAlt: string;
  emptyImageWidth: number;
  emptyImageHeight: number;
  emptyText: ReactNode;
  backHref: string;
}

export default function CommentBoard({
  queryKey,
  queryFn,
  createFn,
  updateFn,
  deleteFn,
  heading,
  placeholder,
  deleteConfirmText,
  emptyImageSrc,
  emptyImageAlt,
  emptyImageWidth,
  emptyImageHeight,
  emptyText,
  backHref,
}: CommentBoardProps) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const {
    data: comments = [],
    isLoading,
    isError,
  } = useQuery({ queryKey, queryFn });

  const invalidate = () => queryClient.invalidateQueries({ queryKey });

  const { mutate: createMutate } = useMutation({
    mutationFn: createFn,
    onSuccess: () => {
      setContent("");
      invalidate();
    },
    onError: (err) => alert(err.message),
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: ({
      commentId,
      content: updatedContent,
    }: {
      commentId: string;
      content: string;
    }) => updateFn(commentId, updatedContent),
    onSuccess: invalidate,
    onError: (err) => alert(err.message),
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteFn,
    onSuccess: invalidate,
    onError: (err) => alert(err.message),
  });

  const handleCreate = () => {
    if (!content.trim()) return;
    createMutate(content);
  };

  const handleUpdate = (commentId: string, updatedContent: string) =>
    updateMutate({ commentId, content: updatedContent });

  const handleDelete = (commentId: string) => {
    if (!confirm(deleteConfirmText)) return;
    deleteMutate(commentId);
  };

  return (
    <div>
      <header className="mt-10">
        <h1 className="mb-2.25 text-base font-semibold">{heading}</h1>
      </header>
      <main>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="rounded-xl bg-gray-100 h-26 resize-none w-full px-6 py-4 focus:outline-none mb-4"
        />
      </main>
      <footer className="flex justify-end">
        <Button onClick={handleCreate} disabled={!content.trim()}>
          등록
        </Button>
      </footer>

      {isLoading ? (
        <p className="mt-6 text-gray-400">불러오는 중...</p>
      ) : isError ? (
        <p className="mt-6 text-red-400">
          목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </p>
      ) : !comments.length ? (
        <div className="mt-4 flex flex-col justify-center items-center">
          <Image
            src={emptyImageSrc}
            width={emptyImageWidth}
            height={emptyImageHeight}
            alt={emptyImageAlt}
          />
          <p className="text-gray-400 mt-4 text-center">{emptyText}</p>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {comments.map((comment: Comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Link
          href={backHref}
          className="rounded-[40px] bg-primary-100 px-16 py-3 font-semibold text-white mt-12 mb-14 cursor-pointer flex items-center gap-2"
        >
          목록으로 돌아가기
          <Image
            src="/images/ic_back.png"
            width={24}
            height={24}
            alt="목록으로 돌아가기"
          />
        </Link>
      </div>
    </div>
  );
}
