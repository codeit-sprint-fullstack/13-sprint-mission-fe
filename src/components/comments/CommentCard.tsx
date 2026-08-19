"use client";

import { useState } from "react";
import Image from "next/image";
import { getRelativeTime } from "@/utils/dateUtils";
import type { BaseComment } from "@/types/comment";

interface CommentCardProps {
  comment: BaseComment;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  isOwner: boolean;
}

export default function CommentCard({ comment, onEdit, onDelete, isOwner }: CommentCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const nickname = comment.author?.nickname ?? "판다";
  const content = comment.content;
  const time = getRelativeTime(comment.createdAt);

  return (
    <div className="border-b border-gray-300 bg-[#FCFCFC] p-4">
      <div className="flex items-start justify-between">
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full resize-none rounded-xl bg-gray-100 p-3 outline-none"
          />
        ) : (
          <span className="text-md font-normal text-gray-800">{content}</span>
        )}

        {isOwner && (
          <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)}>
              <Image src="/image/ic_kebab.svg" alt="kebab" width={24} height={24} />
            </button>
            {isOpen && (
              <ul className="absolute right-0 z-50 mt-1 w-28 rounded-lg border border-gray-200 bg-white shadow-md">
                <li
                  onClick={() => {
                    setIsEditing(true);
                    setIsOpen(false);
                  }}
                  className="text-md cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  수정하기
                </li>
                <li
                  onClick={() => {
                    onDelete(comment.id);
                    setIsOpen(false);
                  }}
                  className="text-md cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  삭제하기
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <Image
          src={comment.author?.image ?? "/image/ic_profile.svg"}
          alt="프로필"
          width={24}
          height={24}
          className="rounded-full object-cover"
        />
        <div className="flex items-center gap-1">
          <span className="text-xs font-normal text-gray-600">{nickname}</span>
          <span className="text-xs font-normal text-gray-400">{time}</span>
        </div>
      </div>

      {isEditing && (
        <div className="mt-2 flex items-center justify-end gap-1">
          <button
            onClick={() => {
              setIsEditing(false);
              setEditContent(content);
            }}
            className="text-2lg px-5 py-1.5 text-gray-500"
          >
            취소
          </button>
          <button
            onClick={() => {
              onEdit(comment.id, editContent);
              setIsEditing(false);
            }}
            className="btn_small_40"
          >
            수정 완료
          </button>
        </div>
      )}
    </div>
  );
}