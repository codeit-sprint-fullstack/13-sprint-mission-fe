"use client";

import { useState } from "react";

import Button from "@/components/common/Button";
import {
  addCommentAction,
  updateCommentAction,
} from "@/lib/services/actions/comments";

export default function CommentForm({
  articleId,
  comments,
  isEditMode,
  setIsEditMode,
}) {
  const [content, setContent] = useState(comments?.content ?? "");

  // 수정 모드: 기존 값과 달라야 true / 신규 작성: 입력이 있으면 true
  const isChanged = isEditMode
    ? content.trim() !== (comments?.content ?? "").trim()
    : content.trim().length > 0;

  // 댓글 form 제출 핸들러
  async function handleAddComment(formData) {
    const newContent = formData.get("comment");

    // 댓글 수정 모드
    if (isEditMode) {
      const result = await updateCommentAction({
        articleId: parseInt(articleId, 10),
        commentId: comments.id,
        content: newContent,
      });

      if (!result.success) console.error(result.error);

      if (result.success) setIsEditMode(false);
      // 댓글 추가 모드
    } else {
      const result = await addCommentAction({
        articleId,
        content: newContent,
      });

      if (!result.success) console.error(result.error);
      setContent("");
    }
  }

  return (
    <form
      action={handleAddComment}
      className='mb-[24px] md:mb-[32px] lg:mb-[40px]'
    >
      <p className='mb-[9px] text-[16px]/[calc(26/16)] font-semibold text-secondary-900'>
        {isEditMode ? "댓글 수정하기" : "댓글달기"}
      </p>
      <textarea
        className='w-full h-[104px] py-[16px] px-[24px] mb-[16px] rounded-[12px] bg-cool-gray-100 resize-none text-[16px]/[calc(26/16)] placeholder:text-secondary-400'
        type='text'
        name='comment'
        placeholder='댓글을 입력해주세요.'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button className='ml-auto' disabled={isChanged ? false : true}>
        {isEditMode ? "수정" : "등록"}
      </Button>
    </form>
  );
}
