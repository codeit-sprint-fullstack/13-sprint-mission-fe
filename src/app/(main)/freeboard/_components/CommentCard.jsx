"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getRelativeTime } from "@/utils/dateUtils";

// 실제 유저 데이터가 없어 comment.id 기반으로 닉네임을 결정
const RANDOM_NICKNAMES = ["총명한판다", "든든한판다", "귀여운판다"];

// 개별 댓글 카드 - 수정 모드 토글, 케밥 메뉴(수정/삭제) 포함
export default function CommentCard({ comment, onEdit, onDelete }) {
  // 케밥 메뉴 열림/닫힘 상태
  const [isOpen, setIsOpen] = useState(false);
  // 수정 모드 여부
  const [isEditing, setIsEditing] = useState(false);
  // 수정 중인 내용 (취소 시 원래 내용으로 복원)
  const [editContent, setEditContent] = useState(comment?.content ?? "");

  if (!comment) return null;

  const nickname = RANDOM_NICKNAMES[comment.id % 3];
  const content = comment.content;
  const time = getRelativeTime(comment.createdAt);

  return (
    <div className="border-b border-gray-300 bg-[#FCFCFC] p-4">
      {/* 댓글 내용 영역 - 수정 중이면 textarea로 전환 */}
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

        {/* 케밥 메뉴 - 수정/삭제 드롭다운 */}
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Image
              src="/image/ic_kebab.svg"
              alt="kebab"
              width={24}
              height={24}
            />
          </button>
          {isOpen && (
            <ul className="absolute right-0 z-50 mt-1 w-28 rounded-lg border border-gray-200 bg-white shadow-md">
              <li
                onClick={() => {
                  setIsEditing(true);
                  setIsOpen(false);
                }}
                className="cursor-pointer px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
              >
                수정하기
              </li>
              <li
                onClick={() => {
                  onDelete(comment.id);
                  setIsOpen(false);
                }}
                className="cursor-pointer px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
              >
                삭제하기
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* 작성자 정보 - 프로필 아이콘, 닉네임, 상대 시간 */}
      <div className="mt-2 flex items-center gap-2">
        <Image
          src="/image/ic_profile.svg"
          alt="프로필"
          width={24}
          height={24}
          className="object-cover"
        />
        <div className="flex items-center gap-1">
          <span className="text-xs font-normal text-gray-600">{nickname}</span>
          <span className="text-xs font-normal text-gray-400">{time}</span>
        </div>
      </div>

      {/* 수정 모드일 때만 표시되는 취소/완료 버튼 */}
      {isEditing && (
        <div className="mt-2 flex items-center justify-end gap-1">
          <button
            onClick={() => {
              setIsEditing(false);
              setEditContent(content); // 취소 시 원래 내용으로 복원
            }}
            className="px-5 py-1.5 text-2lg text-gray-500"
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
