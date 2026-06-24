"use client";
import KebabMenu from "@/components/common/KebabMenu";
import Image from "next/image";
import React, { useState } from "react";

export default function CommentCard({ comment, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const handleEditClick = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleDeleteClick = () => {
    if (confirm("이 댓글을 정말 삭제하시겠습니까?")) {
      onDelete(comment.id);
    }
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    onUpdate(comment.id, editContent.trim());
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  return (
    <div className="w-[343px] flex flex-col gap-6 pb-2 border-b border-b-gray-200">
      {isEditing ? (
        <form
          onSubmit={handleUpdateSubmit}
          className="flex flex-col gap-2 w-full"
        >
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-[70px] p-3 bg-gray-50 border border-gray-200 rounded-xl resize-none outline-none text-md focus:bg-white focus:border-gray-300 transition"
            placeholder="수정할 내용을 입력해주세요."
          />
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Image
                alt="프로필 사진"
                src="/ic_profile.svg"
                width={32}
                height={32}
              />
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-600">user</p>
                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt)
                    .toLocaleDateString()
                    .replace(/\.$/, "")}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={handleCancel}
                className="px-[20px] py-[7px]  text-lg font-semibold text-gray-500 cursor-pointer "
              >
                취소
              </button>
              <button
                type="submit"
                disabled={
                  !editContent.trim() || editContent.trim() === comment.content
                }
                className={`rounded-lg text-white px-[23px] py-3 text-lg font-semibold ${
                  editContent.trim() && editContent.trim() !== comment.content
                    ? "bg-primary-100 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                수정완료
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex justify-between">
            <p className="text-md text-gray-800 w-[312px]">{comment.content}</p>
            <KebabMenu onEdit={handleEditClick} onDelete={handleDeleteClick} />
          </div>
          <div className="flex gap-2">
            <Image
              alt="프로필 사진"
              src="/ic_profile.svg"
              width={32}
              height={32}
            />
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-600">user</p>
              <p className="text-xs text-gray-400">
                {new Date(comment.createdAt)
                  .toLocaleDateString()
                  .replace(/\.$/, "")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
