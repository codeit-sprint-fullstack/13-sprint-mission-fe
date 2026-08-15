"use client";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import {
  addCommentAction,
  updateCommentAction,
} from "@/lib/actions/productComments";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal/Modal";
import type { Comment } from "@/types/comment";

interface ICommentForm {
  productId: string | number;
  comments?: Comment;
  isEditMode?: boolean;
  setIsEditMode?: Dispatch<SetStateAction<boolean>>;
}

export default function CommentForm({
  productId,
  comments,
  isEditMode = false,
  setIsEditMode,
}: ICommentForm) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [content, setContent] = useState(comments?.content ?? "");
  const [isModalOpen, setIsModalOpen] = useState({
    login: false,
    edit: false,
  }); // 에러 모달 상태

  /**
   * 수정 모드: 기존 값과 달라야 true
   * 신규 작성: 입력이 있으면 true
   */
  const isChanged = isEditMode
    ? content.trim() !== (comments?.content ?? "").trim()
    : content.trim().length > 0;

  /** 댓글 form 제출 핸들러 */
  async function handleAddComment(formData: FormData) {
    const newContent = formData.get("comment")?.toString() ?? "";

    if (isEditMode) {
      // 댓글 수정 모드
      if (!comments) return;

      const result = await updateCommentAction({
        productId,
        commentId: comments.id,
        content: newContent,
      });

      if (result.success) {
        setIsModalOpen((prev) => ({ ...prev, edit: true }));
      } else if (result.code === "UNAUTHORIZED") {
        setIsModalOpen((prev) => ({ ...prev, login: true }));
      } else {
        console.error("댓글 수정 실패:", result.error);
      }

      // 댓글 추가 모드
    } else {
      const result = await addCommentAction({
        productId,
        content: newContent,
      });

      if (result.success) {
        setContent("");
        queryClient.invalidateQueries({
          queryKey: ["comment", productId],
        });
      } else if (result.code === "UNAUTHORIZED") {
        setIsModalOpen((prev) => ({ ...prev, login: true }));
      } else {
        console.error("댓글 등록 실패:", result.error);
      }
    }
  }

  return (
    <>
      <form
        action={handleAddComment}
        className='mb-[24px] md:mb-[32px] lg:mb-[40px]'
      >
        <p className='mb-[9px] text-[16px]/[calc(26/16)] font-semibold text-secondary-900'>
          {isEditMode ? "댓글 수정하기" : "문의하기"}
        </p>
        <textarea
          className='w-full h-[104px] py-[16px] px-[24px] mb-[16px] rounded-[12px] bg-cool-gray-100 resize-none text-[16px]/[calc(26/16)] placeholder:text-secondary-400'
          name='comment'
          placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button className='ml-auto' disabled={isChanged ? false : true}>
          {isEditMode ? "수정" : "등록"}
        </Button>
      </form>

      {/* 로그인 알림 모달 */}
      <Modal
        description='로그인이 필요합니다.'
        isOpen={isModalOpen.login}
        onClose={() => {
          setIsModalOpen((prev) => ({ ...prev, login: false }));
        }}
        buttons={
          <Button
            variant='tertiary'
            type='button'
            width='50%'
            onClick={() => {
              setIsModalOpen((prev) => ({ ...prev, login: false }));
              router.push("/signin");
            }}
          >
            로그인
          </Button>
        }
      />

      {/* 수정 완료 알림 모달 */}
      <Modal
        description='댓글이 수정되었습니다.'
        isOpen={isModalOpen.edit}
        onClose={() => {
          setIsModalOpen((prev) => ({ ...prev, edit: false }));
          setIsEditMode?.(false);
          queryClient.invalidateQueries({
            queryKey: ["comment", productId],
          });
        }}
      />
    </>
  );
}
