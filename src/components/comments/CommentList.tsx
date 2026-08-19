"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import CommentCard from "./CommentCard";
import type { BaseComment } from "@/types/comment";

interface CommentListProps {
  comments: BaseComment[];
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  myId: number | null;
  emptyImageSrc: string;
  emptyImageAlt: string;
  emptyMessage: ReactNode;
  emptyMessageClassName?: string;
}

export default function CommentList({
  comments,
  onEdit,
  onDelete,
  myId,
  emptyImageSrc,
  emptyImageAlt,
  emptyMessage,
  emptyMessageClassName = "text-lg",
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <Image src={emptyImageSrc} alt={emptyImageAlt} width={140} height={140} priority />
        <p className={`text-center text-gray-400 ${emptyMessageClassName}`}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="h-100 overflow-y-auto">
      <ul className="flex flex-col gap-6">
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentCard
              comment={comment}
              onEdit={onEdit}
              onDelete={onDelete}
              isOwner={Boolean(myId && comment.author?.id === myId)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}