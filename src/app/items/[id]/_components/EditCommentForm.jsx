"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { updateCommentAction } from "@/lib/services/actions/productComments";
import { renewToken } from "@/lib/services/fetchClient";
import { useAuth } from "@/providers/AuthProvider";
import isTokenExpired from "@/utils/isTokenExpired";
import { getRelativeTime } from "@/utils/getRelativeTime";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal/Modal";

import IcProfile from "@/app/assets/ic_profile.svg";

export default function EditCommentForm({ productId, comments, isEditMode, setIsEditMode }) {
  const { getToken } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState(comments?.content ?? "");
  const [isModalOpen, setIsModalOpen] = useState({
    login: false,
    edit: false,
  }); // 에러 모달 상태

  // 댓글 form 제출 핸들러
  async function handleEditComment(formData) {
    let token = getToken();

    // 토큰 없을 때, API요청 중단 및 모달 오픈
    if (!token || isTokenExpired(token)) {
      try {
        token = await renewToken(localStorage.getItem("refreshToken"));
      } catch {
        setIsModalOpen((prev) => ({ ...prev, login: true }));
        return;
      }
    }

    try {
      // TODO: 추후 직접 개발한 API로 수정
      const result = await updateCommentAction({
        token,
        productId: parseInt(productId, 10),
        commentId: comments.id,
        content: formData.get("comment"),
      });

      if (result.success) {
        setIsModalOpen((prev) => ({ ...prev, edit: true }));
      }
    } catch (error) {
      console.error("댓글 수정 실패:", error);
    }
  }

  return (
    <>
      <form action={handleEditComment} className='mb-[16px]'>
        <textarea
          className='w-full h-[80px] py-[16px] px-[24px] mb-[16px] rounded-[12px] bg-cool-gray-100 resize-none text-[16px]/[calc(26/16)] placeholder:text-secondary-400'
          type='text'
          name='comment'
          placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className='flex justify-between items-center pb-[16px]'>
          {/* 작성자 정보 */}
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
              <span className='block text-[12px]/[calc(18/12)] text-secondary-400'>
                {getRelativeTime(comments.createdAt)}
              </span>
            </div>
          </div>

          {/* 버튼 */}
          <div className='flex gap-[4px]'>
            <button
              className='h-[42px] py-[7px] px-[20px] text-[16px]/[calc(26/16)] font-semibold text-gray-500 cursor-pointer'
              type='button'
              onClick={() => setIsEditMode(false)}
            >
              취소
            </button>
            <Button variant='tertiary' size='sm'>
              수정 완료
            </Button>
          </div>
        </div>
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
          setIsEditMode(false);
          router.refresh();
        }}
      />
    </>
  );
}
