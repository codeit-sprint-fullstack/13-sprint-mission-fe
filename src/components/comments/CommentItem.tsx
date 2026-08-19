"use client";
import type { Comment } from "@/lib/types";
import { useAuth } from "@/providers/providers";
import Image from "next/image";
import { useState } from "react";
import KebabMenu from "./KebabMenu";

function timeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);
  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}개월 전`;
  return `${Math.floor(diff / 31536000)}년 전`;
}

export default function CommentItem({
  comment,
  onUpdate,
  onDelete,
}: {
  comment: Comment;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}) {
  const { user } = useAuth();
  const isOwner = user?.id === comment.writer.id;
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  const handleSave = async () => {
    await onUpdate(comment.id, content);
    setIsEditing(false);
  };

  return (
    <div className="border-b border-gray-200 pb-3">
      <div className="flex justify-between items-start">
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-100 w-full px-6 py-4 rounded-xl resize-none mt-10 mb-4"
          />
        ) : (
          <p>{comment.content}</p>
        )}

        {/* 수정 중이 아닐 때만 케밥 메뉴 노출 */}
        {!isEditing && isOwner && (
          <KebabMenu
            onEdit={() => setIsEditing(true)}
            onDelete={() => onDelete(comment.id)}
          />
        )}
      </div>

      {isEditing && (
        <div className="flex justify-end gap-6 mt-1 text-sm">
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-500 cursor-pointer"
          >
            취소
          </button>
          <button
            type="submit"
            onClick={handleSave}
            className="text-white rounded-lg bg-primary-100 py-3 px-5.75 cursor-pointer"
          >
            수정완료
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 mt-6 text-sm mb-3">
        <Image
          src={comment.writer?.image || "/images/ic_profile.png"}
          alt="profile"
          width={40}
          height={40}
        />
        <div className="flex flex-col gap-1">
          <span>{comment.writer?.nickname}</span>
          <span className="text-gray-500">{timeAgo(comment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
