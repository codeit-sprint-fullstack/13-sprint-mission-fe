"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
  Dispatch,
  MouseEvent as ReactMouseEvent,
  SetStateAction,
} from "react";
import { useEffect, useRef, useState } from "react";

import IcKebab from "@/app/assets/ic_kebab.svg";
import ConfirmModal from "@/components/common/Modal/ConfirmModal";
import { deleteCommentAction } from "@/lib/actions/articleComments";
import { deleteArticleAction } from "@/lib/actions/articles";
import { useAuth } from "@/providers/AuthProvider";

interface IMoreButton {
  type: "article" | "product" | "comment";
  articleId: string;
  ownerId?: number | null;
  commentId?: number | null;
  isMyComment?: boolean;
  setIsEditMode?: Dispatch<SetStateAction<boolean>>;
}

export default function MoreButton({
  type = "article",
  articleId,
  ownerId = null,
  commentId = null,
  isMyComment = false,
  setIsEditMode,
}: IMoreButton) {
  const { user } = useAuth();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [moreModal, setMoreModal] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 게시글 삭제 확인 모달

  // 게시글은 작성자 본인, 댓글은 isMyComment로 소유 여부 판단
  const isOwner =
    type === "article" ? !!user && user.id === ownerId : isMyComment;

  // 토글 더보기 모달
  function handleToggleModal(e: ReactMouseEvent) {
    e.stopPropagation();
    setMoreModal((prev) => !prev);
  }

  // 댓글 수정
  async function handleCommentUpdate() {
    setIsEditMode?.((prev) => !prev);
  }

  // 게시글 삭제 확인 모달 오픈
  function handleArticleDeleteModal() {
    setMoreModal(false);
    setIsConfirmOpen(true);
  }

  // 게시글 삭제
  async function handleArticleDelete() {
    try {
      const result = await deleteArticleAction(articleId);

      if (result?.success) {
        router.push("/articles");
      }
    } catch (error) {
      console.error("❌ 게시글 삭제 실패:", error);
    } finally {
      setIsConfirmOpen(false);
    }
  }

  // 댓글 삭제
  async function handleCommentDelete() {
    if (commentId == null) return;

    try {
      const result = await deleteCommentAction({
        articleId,
        commentId,
      });
      if (result?.success) {
        setMoreModal(false);
      }
    } catch (error) {
      console.error("❌ 댓글 삭제 실패:", error);
    }
  }

  useEffect(() => {
    // Escape 키 닫기
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreModal(false);
    };

    // 버튼 외 여백 클릭 시 닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setMoreModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isOwner) return null;

  return (
    <div className='relative z-10' ref={modalRef}>
      <button
        className='relative cursor-pointer'
        type='button'
        aria-label='더보기 버튼'
        onClick={(e) => handleToggleModal(e)}
      >
        <Image src={IcKebab} width={24} height={24} alt='' />
      </button>

      {/* 더보기 버튼 모달 */}
      {moreModal && (
        <ul className='absolute top-[24px] right-0 z-20 w-[120px] border border-cool-gray-300 rounded-[8px] text-[14px]/[calc(24/14)] text-secondary-500 bg-white'>
          <li className='border-b-1 border-b-cool-gray-300 cursor-pointer'>
            {type === "article" ? (
              <Link
                className='flex justify-center items-center h-[45px] w-full'
                href={`/articles/${articleId}/edit`}
              >
                수정하기
              </Link>
            ) : (
              <button
                className='flex justify-center items-center h-[45px] w-full cursor-pointer'
                type='button'
                onClick={handleCommentUpdate}
              >
                수정하기
              </button>
            )}
          </li>
          <li>
            <button
              className='flex justify-center items-center h-[45px] w-full cursor-pointer'
              type='button'
              onClick={
                type === "article"
                  ? handleArticleDeleteModal
                  : handleCommentDelete
              }
            >
              삭제하기
            </button>
          </li>
        </ul>
      )}

      {/* 게시글 삭제 확인 모달 */}
      {type === "article" && (
        <ConfirmModal
          description='정말로 게시글을 삭제하시겠어요?'
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleArticleDelete}
        />
      )}
    </div>
  );
}
