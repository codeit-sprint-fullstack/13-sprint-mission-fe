"use client";

import Image from "next/image";
import { useState } from "react";
import { formatRelativeTime } from "@/services/articleService";
import { useAuth } from "@/providers/AuthProvider";
import KebabMenu from "@/components/ui/KebabMenu";
import AlertModal from "@/components/ui/AlertModal";
import DefaultProfile from "@/assets/png/img_default_profile.png";
import EmptyReply from "@/assets/png/Img_reply_empty.png";

function CommentItem({ comment, currentUserId, onUpdate, onDelete, onUnauthorized }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const isOwner = comment.writer?.id === currentUserId;

  const handleUpdate = async () => {
    if (!editContent.trim()) return;
    await onUpdate(comment.id, editContent);
    setIsEditing(false);
  };

  const menuOptions = [
    {
      label: "수정하기",
      onClick: () => (isOwner ? setIsEditing(true) : onUnauthorized()),
    },
    {
      label: "삭제하기",
      onClick: () => (isOwner ? onDelete(comment.id) : onUnauthorized()),
    },
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
          src={DefaultProfile}
          alt="프로필"
          width={24}
          height={24}
          className="rounded-full w-6 h-6 shrink-0"
        />
        <div className="flex flex-col">
          <span>{comment.writer?.nickname || "판다마켓"}</span>
          <span className="text-xs">{formatRelativeTime(comment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default function CommentSection({
  initialComments,
  createAction,
  updateAction,
  deleteAction,
  title = "댓글달기",
  placeholder = "댓글을 입력해주세요.",
  notice = null,
  emptyImage = EmptyReply,
  emptyText = "아직 댓글이 없어요,\n지금 댓글을 달아보세요!",
}) {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const handleCreate = async () => {
    if (!newComment.trim() || isSubmitting) return;
    setIsSubmitting(true);
    const content = newComment.trim();
    try {
      const created = await createAction(content);
      setComments((prev) => [
        { id: `temp-${Date.now()}`, content, createdAt: new Date().toISOString(), ...created },
        ...prev,
      ]);
      setNewComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (commentId, content) => {
    const updated = await updateAction(commentId, content);
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, content: updated.content } : c))
    );
  };

  const handleDelete = async (commentId) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    await deleteAction(commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-base">{title}</h2>

        <div className="flex flex-col gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={notice ?? placeholder}
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
                currentUserId={user?.id}
                onUpdate={handleUpdate}
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
