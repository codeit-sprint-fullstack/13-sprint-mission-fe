"use client";

import { useState } from "react";
import Image from "next/image";

import { getRelativeTime } from "@/utils/getRelativeTime";

import CommentMoreButton from "@/components/common/MoreButton/CommentMoreButton";
import EditCommentForm from "./EditCommentForm";

import IcProfile from "@/app/assets/ic_profile.svg";
import clsx from "clsx";

export default function CommentItem({ productId, commentId, comments }) {
  const [isEditMode, setIsEditMode] = useState(false);

  if (isEditMode) {
    return (
      <EditCommentForm
        productId={productId}
        isEditMode={isEditMode}
        comments={comments}
        setIsEditMode={setIsEditMode}
      />
    );
  }

  return (
    <article className={clsx(isEditMode && "mb-[24px]")}>
      <header>
        <div className='flex justify-between gap-[8px] mb-[24px]'>
          <p className='text-[14px]/[calc(24/14)] text-secondary-800'>
            {comments.content}
          </p>
          <CommentMoreButton
            productId={productId}
            commentId={commentId}
            isMyComment={comments.isMyComment}
            setIsEditMode={setIsEditMode}
          />
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
            {comments.owner?.nickname ?? "익명"}
          </p>
          <span className='block text-[12px]/[calc(18/12)] text-secondary-400'>
            {getRelativeTime(comments.createdAt)}
          </span>
        </div>
      </div>
    </article>
  );
}
