"use client";

import Image from "next/image";
import { useState } from "react";
import KebabMenu from "@/shared/ui/KebabMenu";
import { formatRelativeTime } from "@/shared/lib/formatRelativeTime";
import DefaultProfile from "@/assets/png/img_default_profile.png";
import type { Comment } from "@/entities/product";

type CommentItemProps = {
  comment: Comment;
  currentUserId?: string;
  onUpdate: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => void;
  onUnauthorized: () => void;
};

export default function CommentItem({
  comment,
  currentUserId,
  onUpdate,
  onDelete,
  onUnauthorized,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const isOwner = comment.user.id === currentUserId;

  const handleUpdate = async () => {
    if (!editContent.trim()) return;
    await onUpdate(comment.id, editContent);
    setIsEditing(false);
  };

  const menuOptions = [
    { label: "수정하기", onClick: () => (isOwner ? setIsEditing(true) : onUnauthorized()) },
    { label: "삭제하기", onClick: () => (isOwner ? onDelete(comment.id) : onUnauthorized()) },
  ];

  return (
    <div className="flex flex-col gap-3 py-4 border-b border-gray-100">
      <div className="flex items-start justify-between gap-2">
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm outline-none resize-none"
            rows={2}
          />
        ) : (
          <p className="flex-1 text-sm text-gray-700">{comment.content}</p>
        )}
        <KebabMenu options={menuOptions} />
      </div>

      {isEditing && (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="text-sm text-gray-400 px-3 py-1"
          >
            취소
          </button>
          <button
            onClick={handleUpdate}
            className="text-sm text-white bg-primary-100 px-3 py-1 rounded-lg"
          >
            수정
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Image
          src={comment.user.image ?? DefaultProfile}
          alt="프로필"
          width={24}
          height={24}
          className="rounded-full w-6 h-6 shrink-0 object-cover"
          unoptimized={!!comment.user.image}
        />
        <div className="flex flex-col">
          <span>{comment.user.nickname}</span>
          <span className="text-xs">{formatRelativeTime(comment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
