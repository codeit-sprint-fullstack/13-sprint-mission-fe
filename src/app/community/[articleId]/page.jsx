"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getArticle,
  deleteArticle,
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../../lib/api.js";
const PROFILE_ICON = "/icons/ic_profile.svg";
const HEART_ICON = "/icons/ic_heart.svg";
const KEBAB_ICON = "/icons/ic_kebab.svg";
const VECTOR_IMG = "/images/Img_Vector_683.svg";

const MOCK_NICKNAME = "총명한판다"; // TODO:
const MOCK_COMMENT_NICKNAME = "똑똑한판다"; // TODO:
const MOCK_LIKES = 123; // TODO: 이거 내 데이터로 바꿔야할것 같음 ㅇㅇ

// ── Kebab dropdown menu ──────────────────────────────────────────────────

function KebabMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="더보기"
      >
        <Image src={KEBAB_ICON} alt="" width={20} height={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-md z-10 min-w-[100px] overflow-hidden">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            수정하기
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ArticleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.articleId);

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  // inline edit state for comments
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // TODO: fetchData() 가 무슨 역할인지 알아봐
    async function fetchData() {
      try {
        const [articleRes, commentsRes] = await Promise.all([
          getArticle(articleId),
          getComments(articleId),
        ]);
        setArticle(articleRes.data);
        setComments(commentsRes.data);
      } catch {
        setError("게시글을 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [articleId]);

  // ── Article actions ──────────────────────────────────────────────────────

  const handleDeleteArticle = async () => {
    if (!confirm("게시글을 삭제할까요?")) return;
    await deleteArticle(articleId);
    router.push("/community");
  };

  const handleEditArticle = () => {
    router.push(`/community/${articleId}/edit`);
  };

  // ── Comment actions ──────────────────────────────────────────────────────

  const handleCreateComment = async () => {
    if (!commentInput.trim() || submittingComment) return;
    setSubmittingComment(true);
    try {
      const res = await createComment(articleId, {
        content: commentInput.trim(),
      });
      setComments((prev) => [...prev, res.data]);
      setCommentInput("");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleStartEditComment = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleUpdateComment = async (commentId) => {
    if (!editContent.trim()) return;
    const res = await updateComment(articleId, commentId, {
      content: editContent.trim(),
    });
    setComments((prev) => prev.map((c) => (c.id === commentId ? res.data : c)));
    setEditingId(null);
    setEditContent("");
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("댓글을 삭제할까요?")) return;
    await deleteComment(articleId, commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  // ── Render ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-sm text-gray-400">
        불러오는 중...
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-sm text-gray-500 mb-4">
          {error || "게시글을 찾을 수 없습니다."}
        </p>
        <Link href="/boards" className="text-blue-500 text-sm hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
      {/* ── Article ── */}
      <article className="pb-6 border-b border-gray-100 mb-8">
        {/* Title + kebab */}
        <div className="flex items-start justify-between gap-3 mb-4 mt-17.5">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug flex-1 ">
            {article.title}
          </h1>
          <KebabMenu
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
          <Image
            src={PROFILE_ICON}
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-gray-700">{MOCK_NICKNAME}</span>

          <span>
            {new Date(article.createdAt)
              .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\. /g, ". ")}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image src={VECTOR_IMG} alt="" width={1} height={34} />
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1 border border-gray-200 rounded-full text-gray-500">
            <Image src={HEART_ICON} alt="" width={16} height={16} />
            <span>{MOCK_LIKES}</span>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </p>
      </article>

      {/* ── Comment Input ── */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-gray-900 mb-3">댓글달기</h2>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="댓글을 입력해주세요."
          rows={4}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleCreateComment}
            disabled={!commentInput.trim() || submittingComment}
            className="px-6 py-2 bg-gray-300 text-white text-sm font-medium rounded-lg transition-colors enabled:bg-blue-500 enabled:hover:bg-blue-600 disabled:cursor-not-allowed"
          >
            {submittingComment ? "등록 중..." : "등록"}
          </button>
        </div>
      </section>

      {/* ── Comments ── */}
      <section className="mb-12">
        {comments.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-8">
            아직 댓글이 없어요. 첫 댓글을 남겨보세요!
          </p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="py-5 border-b border-gray-100">
                {editingId === comment.id ? (
                  /* inline edit */
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-2"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleUpdateComment(comment.id)}
                        disabled={!editContent.trim()}
                        className="px-4 py-1.5 text-xs bg-blue-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
                      >
                        수정 완료
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Comment text + kebab */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <p className="text-sm text-gray-800 flex-1">
                        {comment.content}
                      </p>
                      <KebabMenu
                        onEdit={() => handleStartEditComment(comment)}
                        onDelete={() => handleDeleteComment(comment.id)}
                      />
                    </div>

                    {/* Author + time */}
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Image
                        src={PROFILE_ICON}
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-gray-600">
                        {MOCK_COMMENT_NICKNAME}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>{timeAgo(comment.createdAt)}</span>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── Back to list ── */}
      <div className="flex justify-center">
        <Link
          href="/boards"
          className="flex items-center gap-2 px-8 py-3 bg-blue-500 text-white text-sm font-medium rounded-xl hover:bg-blue-600 transition-colors"
        >
          목록으로 돌아가기
          <span aria-hidden>↩</span>
        </Link>
      </div>
    </main>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────

function timeAgo(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay}일 전`;
}
