"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/constants/article";
import { formatDate } from "@/utils/formatDate";

export default function CommentList({ articleId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [openMenuId, setOpenMenuId] = useState(null); // 메뉴 열린 댓글 id
  const [editingId, setEditingId] = useState(null); // 수정 중인 댓글 id
  const [editValue, setEditValue] = useState(""); // 수정 입력값

  const isValid = newComment.trim() !== "";

  const loadComments = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/articles/${articleId}/comments`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error("댓글을 불러오지 못했습니다");
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  // 등록 (POST)
  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/articles/${articleId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newComment }),
        },
      );
      if (!res.ok) throw new Error("댓글 등록 실패");
      setNewComment("");
      loadComments();
    } catch (error) {
      console.error(error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  // 삭제 (DELETE) — 경로 주의: /articles/comments/:id
  const handleDelete = async (commentId) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/articles/comments/${commentId}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("댓글 삭제 실패");
      setOpenMenuId(null);
      loadComments();
    } catch (error) {
      console.error(error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  // 수정 시작 (입력창을 수정 모드로 전환)
  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditValue(comment.content);
    setOpenMenuId(null);
  };

  // 수정 저장 (PATCH)
  const handleUpdate = async (commentId) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/articles/comments/${commentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editValue }),
        },
      );
      if (!res.ok) throw new Error("댓글 수정 실패");
      setEditingId(null);
      loadComments();
    } catch (error) {
      console.error(error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  return (
    <div className="mt-8">
      {/* 댓글 입력 폼 */}
      <div className="mb-6">
        <p className="mb-3 font-bold text-gray-800">댓글달기</p>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="h-24 w-full resize-none rounded-lg bg-gray-100 px-6 py-4 text-sm placeholder:text-gray-400 focus:outline-none"
        />
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold text-white md:px-6 md:py-2 ${
              isValid ? "bg-primary-100" : "cursor-not-allowed bg-gray-400"
            }`}
          >
            등록
          </button>
        </div>
      </div>

      {/* 목록 또는 빈 상태 */}
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <img src="/img/main/img-empty.svg" alt="" />
          <p className="mt-4 text-center text-sm text-gray-400">
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-lg bg-gray-50 px-6 py-4">
              {editingId === comment.id ? (
                // 수정 모드
                <div>
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="h-20 w-full resize-none rounded-lg bg-gray-100 px-4 py-2 text-sm focus:outline-none"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="rounded-lg border border-gray-200 px-4 py-1 text-sm text-gray-600"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdate(comment.id)}
                      className="rounded-lg bg-primary-100 px-4 py-1 text-sm font-semibold text-white"
                    >
                      수정 완료
                    </button>
                  </div>
                </div>
              ) : (
                // 일반 모드
                <>
                  <div className="flex items-start justify-between">
                    <p className="text-gray-800">{comment.content}</p>
                    {/* 댓글 점3개 메뉴 */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === comment.id ? null : comment.id,
                          )
                        }
                        className="px-2 text-xl text-gray-400"
                      >
                        ⋮
                      </button>
                      {openMenuId === comment.id && (
                        <div className="absolute right-0 top-8 w-32 rounded-lg border border-gray-200 bg-white py-2 shadow">
                          <button
                            type="button"
                            onClick={() => startEdit(comment)}
                            className="block w-full px-4 py-2 text-center text-sm text-gray-600 hover:bg-gray-50"
                          >
                            수정하기
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(comment.id)}
                            className="block w-full px-4 py-2 text-center text-sm text-gray-600 hover:bg-gray-50"
                          >
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <img
                      src="/img/main/ic_profile.svg"
                      alt=""
                      className="h-8 w-8"
                    />
                    <div>
                      <p className="text-xs text-gray-600">똑똑한 판다</p>
                      <p className="text-xs text-gray-400">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
