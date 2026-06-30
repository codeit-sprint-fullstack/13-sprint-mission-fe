"use client";

import Image from "next/image";
import KebabMenu from "../../../../../components/KebabMenu";
import { useState } from "react";
import { formatTimeAgo } from "@/app/utils/time";

export default function CommentItem({ comment, handleDelete, handleUpdate }) {
  const [updatedComment, setUpdatedComment] = useState("");
  const [updateCommentId, setUpdateCommentId] = useState(null);

  return (
    <li
      key={comment.id}
      className="border-cool-gray-200 mt-[40px] flex flex-col gap-[24px] border-b border-solid bg-[#FCFCFC] pb-[12px]"
    >
      <div>
        {updateCommentId !== comment.id ? (
          <div className="flex w-full justify-between">
            <p className="text-secondary-800 text-[14px] font-[400]">
              {comment.content}
            </p>
            <KebabMenu
              onSelect={(value) => {
                if (value === "delete") handleDelete(comment.id);
                if (value === "update") {
                  setUpdatedComment(comment.content);
                  setUpdateCommentId(comment.id);
                }
              }}
            />
          </div>
        ) : (
          <div className="flex w-full flex-col gap-[5px]">
            <textarea
              value={updatedComment}
              className="bg-cool-gray-200 resize-none rounded-[8px] border-none px-[12px] py-[5px] focus:border"
              onChange={(e) => setUpdatedComment(e.target.value)}
              autoFocus
            />
            <div className="flex gap-[8px]">
              <button
                className="bg-brand-blue text-cool-gray-200 cursor-pointer rounded-[8px] border-none px-[8px] py-[4px] text-[14px]"
                onClick={() => {
                  handleUpdate(comment.id, updatedComment);
                  setUpdateCommentId(null);
                }}
              >
                수정 완료
              </button>
              <button
                className="bg-brand-blue text-cool-gray-200 cursor-pointer rounded-[8px] border-none px-[8px] py-[4px] text-[14px]"
                onClick={() => setUpdateCommentId(null)}
              >
                수정 취소
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-[8px]">
        <Image
          src="/ic_profile.svg"
          alt="사용자 기본 프로필"
          width={32}
          height={32}
        />
        <div>
          <p className="text-secondary-600 text-[12px] font-[400]">
            {comment.article.userName}
          </p>
          <p className="text-secondary-400 text-[12px] font-[400]">
            {formatTimeAgo(comment.createdAt)}
          </p>
        </div>
      </div>
    </li>
  );
}
