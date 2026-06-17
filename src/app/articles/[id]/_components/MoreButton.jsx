"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

import IcKebab from "@/app/assets/ic_kebab.svg";
import { deleteArticleAction } from "@/lib/services/actions/articles";
import { deleteCommentAction } from "@/lib/services/actions/comments";

export default function MoreButton({
  type = "article",
  articleId,
  commentId = null,
  setIsEditMode,
}) {
  const router = useRouter();
  const modalRef = useRef(null);
  const [moreModal, setMoreModal] = useState(false);

  // 토글 더보기 모달
  function handleToggleModal(e) {
    e.stopPropagation();
    setMoreModal((prev) => !prev);
  }

  // 댓글 수정
  async function handleCommentUpdate() {
    console.log("click");
    setIsEditMode((prev) => !prev);
  }

  // 게시글 삭제
  async function handleArticleDelete() {
    try {
      const result = await deleteArticleAction(articleId);

      if (result?.success) {
        router.push("/articles");
        setMoreModal(false);
      }
    } catch (error) {
      console.error("❌ 게시글 삭제 실패:", error);
    }
  }

  // 댓글 삭제
  async function handleCommentDelete() {
    try {
      const result = await deleteCommentAction(articleId, commentId);
      if (result?.success) {
        setMoreModal(false);
      }
    } catch (error) {
      console.error("❌ 댓글 삭제 실패:", error);
    }
  }

  useEffect(() => {
    // Escape 키 닫기
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMoreModal(false);
    };

    // 버튼 외 여백 클릭 시 닫기
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
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
                type === "article" ? handleArticleDelete : handleCommentDelete
              }
            >
              삭제하기
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
