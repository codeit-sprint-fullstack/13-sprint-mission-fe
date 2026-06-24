"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function BoardDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const [openCommentMenuId, setOpenCommentMenuId] = useState(null);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "2000. 01. 01";
    return new Date(dateString)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .slice(0, -1);
  };

  const fetchPostAndComments = async () => {
    try {
      const postRes = await fetch(`http://localhost:4000/articles/${id}`);
      if (!postRes.ok) throw new Error("게시글 불러오기 실패");
      const postData = await postRes.json();
      setPost(postData);

      const commentRes = await fetch(
        `http://localhost:4000/articles/${id}/comments?limit=10`,
      );
      if (commentRes.ok) {
        const commentData = await commentRes.json();
        setComments(commentData.data || []);
      }
    } catch (error) {
      console.error("상세 페이지 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPostAndComments();
    }
  }, [id]);

  const handlePostDelete = async () => {
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`http://localhost:4000/articles/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("게시글 삭제 실패");

      alert("게시글이 성공적으로 삭제되었습니다.");
      router.push("/boards");
    } catch (error) {
      console.error("게시글 삭제 오류:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:4000/articles/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: commentInput,
          }),
        },
      );

      if (!response.ok) throw new Error("댓글 등록 실패");

      setCommentInput("");
      fetchPostAndComments();
    } catch (error) {
      console.error("댓글 등록 중 에러 발생:", error);
    }
  };

  const handleCommentUpdate = async (commentId) => {
    if (!editingCommentText.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:4000/articles/comments/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: editingCommentText,
          }),
        },
      );

      if (!response.ok) throw new Error("댓글 수정 실패");

      setEditingCommentId(null);
      setOpenCommentMenuId(null);
      fetchPostAndComments();
    } catch (error) {
      console.error("댓글 수정 오류:", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(
        `http://localhost:4000/articles/comments/${commentId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("댓글 삭제 실패");

      setOpenCommentMenuId(null);
      fetchPostAndComments();
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 ">로딩 중...</div>;
  }

  if (!post) {
    return <div className="text-center py-20 ">게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="w-full mx-auto px-6 py-10 box-border relative">
      {/* ──────────────────────────────────────────────────
         [구역 1] 상단 타이틀 및 게시글 정보 영역
      ────────────────────────────────────────────────── */}
      <div className="relative h-[104px] border-b border-[#E5E7EB] pb-[16px] mb-[24px]">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h1 className="text-[20px] font-bold text-[#1F2937] flex-1">
            {post.title}
          </h1>

          <div className="relative shrink-0 pt-1">
            <button
              onClick={() => setIsPostMenuOpen(!isPostMenuOpen)}
              className="p-1 cursor-pointer"
            >
              <img
                src="/ic_kebab.png"
                alt="더보기 메뉴"
                className="w-6 h-6 shrink-0 object-contain"
              />
            </button>

            {/* 게시글용 수정/삭제 상자 */}
            {isPostMenuOpen && (
              <div className="absolute right-0 mt-1 w-[139px] bg-white border border-[#D1D5DB] rounded-[8px] z-50 text-[16px]">
                <button
                  onClick={() => router.push(`/boards/${id}/edit`)}
                  className="w-full text-center py-3 text-[#6B7280] text-[16px] border-b border-[#D1D5DB] cursor-pointer"
                >
                  수정하기
                </button>
                <button
                  onClick={handlePostDelete}
                  className="w-full text-center py-3 text-[#6B7280] text-[16px] cursor-pointer"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[14px]">
          <div className="flex items-center gap-4">
            <img
              src="/ic_profile.png"
              alt="프로필"
              className="w-[40px] h-[40px] shrink-0 object-contain"
            />
            <span className="text-[#4B5563] font-medium">
              {post.writer || "총명한판다"}
            </span>
            <span className="text-[#9CA3AF]">{formatDate(post.createdAt)}</span>
          </div>
          <span className="text-[#E5E7EB]">|</span>
          <div className="flex items-center gap-1.5 border border-[#E5E7EB] rounded-full px-3 py-1 text-[#6B7280] bg-white font-[16px] font-medium">
            <img
              src="/ic_heart.png"
              alt="좋아요"
              className="w-[18px] h-[18px] shrink-0 object-contain"
            />
            <span className="text-[16px] text-[#6B7280] font-medium">
              {post.likes || "9999+"}
            </span>
          </div>
        </div>
      </div>
      <div className="text-[#1F2937] text-[18px] mt-[24px] mb-[32px] whitespace-pre-wrap">
        {post.content}
      </div>

      <div className="mb-10">
        <label className="block text-[16px] font-bold text-[#111827] mb-3">
          댓글달기
        </label>
        <div className="flex flex-col items-end gap-3 w-full">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력해주세요."
            className="w-full h-[104px] px-[24px] py-[16px] bg-[#F3F4F6] border-none rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px] resize-none box-border placeholder-[#9CA3AF]"
          />

          <button
            onClick={handleCommentSubmit}
            disabled={commentInput.trim() === ""}
            className={`px-6 py-2.5 rounded-[8px] mt-[16px] text-[15px] transition
        ${
          commentInput.trim() !== ""
            ? "bg-[#3692FF] text-white cursor-pointer"
            : "bg-[#D1D5DB] text-[#9CA3AF] "
        }`}
          >
            등록
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full mb-[48px]">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-10 w-full text-center">
            <img
              src="/Img_reply_empty.png"
              alt="아직 댓글이 없습니다"
              className="w-[120px] h-auto mb-4 object-contain"
            />
            <p className="text-[#9CA3AF] text-[16px] font-normal">
              아직 댓글이 없어요,
              <br />
              지금 댓글을 달아보세요!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="w-full flex flex-col py-5 border-b border-gray-100 relative group"
            >
              <div className="flex justify-between items-start w-full mb-3">
                {/* 댓글 일반 상태 vs 수정 활성화 상태 스위칭 조건문 */}
                {editingCommentId === comment.id ? (
                  <div className="flex flex-col gap-2 w-full pr-4">
                    <textarea
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 h-[80px] rounded-lg text-[15px] resize-none focus:outline-none"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="text-[16px] text-gray-400 h-[42px] w-[68px] px-3 py-1 bg-white border border-gray-200 rounded-md cursor-pointer"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleCommentUpdate(comment.id)}
                        className="text-[16px] text-white h-[42px] w-[106px] px-3 py-1 bg-[#3692FF] rounded-md cursor-pointer"
                      >
                        수정 완료
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#1F2937] text-[14px] font-normal flex-1 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                )}

                {editingCommentId !== comment.id && (
                  <div className="relative shrink-0">
                    <button
                      onClick={() =>
                        setOpenCommentMenuId(
                          openCommentMenuId === comment.id ? null : comment.id,
                        )
                      }
                      className="text-gray-400 cursor-pointer"
                    >
                      <img
                        src="/ic_kebab.png"
                        alt="더보기 메뉴"
                        className="w-6 h-6 shrink-0 object-contain"
                      />
                    </button>

                    {openCommentMenuId === comment.id && (
                      <div className="absolute right-0 mt-1 w-[139px] bg-white border border-[#D1D5DB] rounded-[8px] z-40 text-[16px]">
                        <button
                          onClick={() => {
                            setEditingCommentId(comment.id);
                            setEditingCommentText(comment.content);
                          }}
                          className="w-full text-center py-3 text-[#6B7280] border-b border-[#D1D5DB] text-[16px] cursor-pointer"
                        >
                          수정하기
                        </button>
                        <button
                          onClick={() => handleCommentDelete(comment.id)}
                          className="w-full text-center py-3 text-[#6B7280] border-[#D1D5DB] text-[16px] cursor-pointer"
                        >
                          삭제하기
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-[13px]">
                <img
                  src="/ic_profile.png"
                  alt="프로필"
                  className="w-[32px] h-[32px] rounded-full shrink-0 object-contain"
                />
                <span className="text-[#4B5563] font-normal">
                  {comment.writer || "똑똑한판다"}
                </span>
                <span className="text-[#9CA3AF] font-normal">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-full flex justify-center pt-[64px]">
        <Link href="/boards">
          {/* 기존 버튼과 아이콘을 지우고 이미지로 대체 */}
          <img
            src="/btn_medium.png"
            alt="목록으로 돌아가기 버튼"
            className="cursor-pointer object-contain"
          />
        </Link>
      </div>
    </div>
  );
}
