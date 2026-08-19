"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment, deleteComment } from "@/services/productCommentService";
import Image from "next/image";
import defaultProfile from "@/assets/icons/ic_profile.svg";
import KebabDropdown from "./KebabDropdown";
import timeAgoFormat from "@/utils/timeAgoFormat";
import { useAuth } from "@/providers/AuthProvider";
import DeleteModal from "./DeleteModal";
import { Comment } from "@/types";
import { getErrorMessage } from "@/lib/error";

type CommentReplyListType = "post" | "item";

interface CommentReplyListProps {
  comment: Comment;
  productId: number;
  type?: CommentReplyListType;
}

export default function CommentReplyList({
  comment,
  productId,
  type = "item",
}: CommentReplyListProps) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { user } = useAuth();

  const deleteMutation = useMutation<unknown, Error, void>({
    mutationFn: () => {
      return deleteComment(comment.id);
    },
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["comments", type, productId],
      });
    },
    onError: (err) => {
      alert(getErrorMessage(err, "댓글 삭제에 실패했습니다."));
    },
  });

  const editMutation = useMutation<
    { success: boolean; data: Comment },
    Error,
    void
  >({
    mutationFn: () =>
      updateComment(comment.id, { content: editContent.trim() }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["comments", type, productId],
      });
    },
    onError: (err) => alert(getErrorMessage(err, "댓글 수정에 실패했습니다.")),
  });

  const handleEditComment = () => {
    if (!editContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    editMutation.mutate();
  };

  return (
    <>
      <div className="border-secondary-300 flex w-full content-start border-b border-solid pt-2 pb-4">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-start justify-between">
            {isEditing ? (
              <div className="mr-4 w-full">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  maxLength={400}
                  className="bg-cool-gray-100 text-cool-gray-800 h-20 w-full resize-none rounded-xl px-6 py-4 text-[0.875rem] font-normal outline-none"
                />
              </div>
            ) : (
              <div className="text-secondary-800 pr-4 text-[0.875rem] font-normal break-all">
                {comment.content}
              </div>
            )}

            {!isEditing && user?.id === comment.writer?.id && (
              <KebabDropdown
                onEdit={() => setIsEditing(true)}
                onDelete={() => {
                  setIsDeleteModalOpen(true);
                }}
              />
            )}
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image
                  fill
                  className="rounded-full object-cover"
                  src={comment.writer?.image || defaultProfile}
                  alt="프로필"
                />
              </div>
              <div className="flex flex-col items-start">
                <div className="text-secondary-600 text-[0.75rem] font-medium">
                  {comment.writer?.nickname || "똑똑한 판다"}
                </div>
                <div className="text-secondary-400 text-[0.75rem] font-normal">
                  {timeAgoFormat(comment.createdAt)}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(comment.content);
                  }}
                  className="btn-white"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleEditComment}
                  className="btn"
                  disabled={editMutation.isPending}
                >
                  수정 완료
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        message="정말로 댓글을 삭제하시겠어요?"
        isPending={deleteMutation.isPending}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => deleteMutation.mutate()}
      />
    </>
  );
}
