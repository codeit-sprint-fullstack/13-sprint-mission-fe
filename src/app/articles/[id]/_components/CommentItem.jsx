"use client";

import { useState } from "react";
import Image from "next/image";

import { getRelativeTime } from "@/utils/getRelativeTime";

import MoreButton from "@/app/articles/[id]/_components/MoreButton";
import CommentForm from "@/app/articles/[id]/_components/CommentForm";

import IcProfile from "@/app/assets/ic_profile.svg";

export default function CommentItem({ id, commentId, comments }) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <article>
      <header className='mb-[24px]'>
        <div className='w-full'>
          {isEditMode ? (
            <CommentForm
              id={id}
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
                id={id}
                commentId={commentId}
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
            {comments.writer.nickname}
          </p>
          <span className='text-[12px]/[calc(18/12)] text-secondary-400'>
            {getRelativeTime(comments.createdAt)}
          </span>
        </div>
      </div>
    </article>
  );
}
