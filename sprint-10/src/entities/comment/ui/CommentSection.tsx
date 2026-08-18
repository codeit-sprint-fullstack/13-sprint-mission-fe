"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import AlertModal from "@/shared/ui/AlertModal";
import CommentItem from "./CommentItem";
import type { Comment } from "../model/types";

type CommentSectionProps = {
  comments: Comment[];
  currentUserId?: string;
  onCreate: (content: string) => Promise<void>;
  onUpdate: (commentId: string, content: string) => Promise<void>;
  onDelete: (commentId: string) => Promise<void>;
  title?: string;
  placeholder?: string;
  emptyImage: StaticImageData;
  emptyText: string;
};

export default function CommentSection({
  comments,
  currentUserId,
  onCreate,
  onUpdate,
  onDelete,
  title = "댓글달기",
  placeholder = "댓글을 입력해주세요.",
  emptyImage,
  emptyText,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const handleCreate = async () => {
    if (!newComment.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onCreate(newComment.trim());
      setNewComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    await onDelete(commentId);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-base">{title}</h2>

        <div className="flex flex-col gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none placeholder:text-gray-400 resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCreate}
              disabled={!newComment.trim() || isSubmitting}
              className="bg-primary-100 text-white font-medium px-5 py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-primary-200"
            >
              등록
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-10">
              <Image src={emptyImage} alt="댓글 없음" width={140} height={140} />
              <p className="text-sm text-gray-400 text-center whitespace-pre-line">
                {emptyText}
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUserId={currentUserId}
                onUpdate={onUpdate}
                onDelete={handleDelete}
                onUnauthorized={() => setShowPermissionModal(true)}
              />
            ))
          )}
        </div>
      </div>

      {showPermissionModal && (
        <AlertModal
          message="본인이 작성한 댓글만 수정, 삭제할 수 있습니다."
          onClose={() => setShowPermissionModal(false)}
        />
      )}
    </>
  );
}
