"use client";

import { useState } from "react";
import type { ArticleComment } from "../types/article";

interface CommentItemProps {
  comment: ArticleComment;
  onEdit: (id: number, content: string) => Promise<void>;
  onDelete: (id: number) => void;
}

export default function CommentItem({ comment, onEdit, onDelete }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const nickname = "판다유저";
  const date = new Date(comment.createdAt).toLocaleDateString("ko-KR");

  const handleSave = async () => {
    if (editText.trim() === "") return;
    await onEdit(comment.id, editText.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(comment.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("댓글을 삭제하시겠습니까?")) {
      onDelete(comment.id);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-6 py-4">
      {isEditing ? (
        <div>
          <textarea
            className="mb-2 min-h-[60px] w-full resize-y rounded-lg border border-panda-primary p-3 text-[15px] outline-none"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={handleCancel} className="rounded-md bg-gray-100 px-4 py-1.5 text-sm text-gray-700">
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-panda-primary px-4 py-1.5 text-sm text-white disabled:bg-gray-400"
              disabled={editText.trim() === ""}
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-4 text-[15px] leading-relaxed text-gray-700">{comment.content}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-[13px]">
              <span className="font-medium text-gray-600">{nickname}</span>
              <span className="text-gray-400">{date}</span>
            </div>
            <div className="flex gap-2">
              <button type="button" className="text-[13px] text-gray-500" onClick={() => setIsEditing(true)}>
                수정
              </button>
              <button type="button" className="text-[13px] text-red-600" onClick={handleDelete}>
                삭제
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
