"use client";

import Image from "next/image";
import { useState } from "react";

import { getRelativeTime } from "@/utils/getRelativeTime";

import MoreButton from "../MoreButton";
import CommentForm from "./CommentForm";

import IcProfile from "@/app/assets/ic_profile.svg";
import { Comment } from "@/types/comment";

export default function CommentItem({
  id,
  commentId,
  comments,
}: {
  id: string;
  commentId: number;
  comments: Comment;
}) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <article>
      <header className='mb-[24px]'>
        <div className='w-full'>
          {isEditMode ? (
            <CommentForm
              articleId={id}
              isEditMode={isEditMode}
              comments={comments}
              setIsEditMode={setIsEditMode}
            />
          ) : (
            <div className='flex justify-between gap-[8px] '>
              <p className='text-[14px]/[calc(24/14)] text-secondary-800'>
                {comments.content}
              </p>
              <MoreButton
                type='comment'
                articleId={id}
                commentId={commentId}
                isMyComment={comments.isMyComment}
                setIsEditMode={setIsEditMode}
              />
            </div>
          )}
        </div>
      </header>

      <div className='flex items-start'>
        <Image
          src={IcProfile}
          width={32}
          height={32}
          alt='작성자 프로필 사진'
        />
        <div className='ml-[8px] md:ml-[12px]'>
          <p className='mb-[4px] text-[12px]/[calc(18/12)] text-secondary-600'>
            {comments.owner.nickname ?? ""}
          </p>
          <span className='text-[12px]/[calc(18/12)] text-secondary-400'>
            {getRelativeTime(comments.createdAt)}
          </span>
        </div>
      </div>
    </article>
  );
}
