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
const VECTOR_IMG = "/images/Img_vector_683.svg";
const ARROW_BACK_ICON = "/icons/ic_back.svg";
const EMPTY_COMMENT_IMG = "/images/Img_article.svg";

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
        className="p-1 text-secondary-400 hover:text-secondary-600 transition-colors"
        aria-label="더보기"
      >
        <Image src={KEBAB_ICON} alt="" width={20} height={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-secondary-200 rounded-lg shadow-md z-10 min-w-25 overflow-hidden">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
          >
            수정하기
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-secondary-700 hover:bg-secondary-50 transition-colors"
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

  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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
      <p className="text-center text-sm text-secondary-400 py-20">
        불러오는 중...
      </p>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-secondary-500 mb-4">
          {error || "게시글을 찾을 수 없습니다."}
        </p>
        <Link href="/community" className="bg-primary text-sm hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* ── Article ── */}
      <article className="pb-6 border-b border-secondary-100 mb-8">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-secondary-900 leading-snug flex-1">
            {article.title}
          </h1>
          <KebabMenu
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
          />
        </div>

        <div className="flex items-center gap-3 text-sm text-secondary-500 mb-6">
          <Image
            src={PROFILE_ICON}
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-secondary-700">{MOCK_NICKNAME}</span>
          <span>
            {new Date(article.createdAt)
              .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\. /g, ". ")}
          </span>
          <Image src={VECTOR_IMG} alt="" width={1} height={34} />
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1 border border-secondary-200 rounded-full text-secondary-500">
            <Image src={HEART_ICON} alt="" width={16} height={16} />
            <span>{MOCK_LIKES}</span>
          </div>
        </div>

        <p className="text-sm text-secondary-700 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </p>
      </article>

      {/* ── Comment Input ── */}
      <section className="mb-8">
        <h2 className="text-sm font-bold text-secondary-900 mb-3">댓글달기</h2>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="댓글을 입력해주세요."
          rows={3}
          className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm resize-none placeholder:text-secondary-400"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleCreateComment}
            disabled={!commentInput.trim() || submittingComment}
            className="px-6 py-2 bg-secondary-400 text-white text-sm font-medium rounded-lg transition-colors enabled:bg-primary enabled:hover:bg-primary disabled:cursor-not-allowed"
          >
            {submittingComment ? "등록 중..." : "등록"}
          </button>
        </div>
      </section>

      {/* ── Comments ── */}
      <section className="mb-12">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-2">
            <Image
              src={EMPTY_COMMENT_IMG}
              alt="댓글 없음"
              width={140}
              height={140}
            />
            <p className="text-sm text-secondary-400 mt-2">
              아직 댓글이 없어요,
            </p>
            <p className="text-sm text-secondary-400">
              지금 댓글을 달아보세요!
            </p>
          </div>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="py-5 border-b border-secondary-100"
              >
                {editingId === comment.id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary transition mb-2"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-1.5 text-xs border border-secondary-200 rounded-lg transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleUpdateComment(comment.id)}
                        disabled={!editContent.trim()}
                        className="px-4 py-1.5 text-xs bg-primary text-white rounded-lg disabled:bg-secondary-400 transition-colors"
                      >
                        수정 완료
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <p className="text-sm text-secondary-800 flex-1">
                        {comment.content}
                      </p>
                      <KebabMenu
                        onEdit={() => handleStartEditComment(comment)}
                        onDelete={() => handleDeleteComment(comment.id)}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary-400">
                      <Image
                        src={PROFILE_ICON}
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-secondary-600">
                        {MOCK_COMMENT_NICKNAME}
                      </span>
                      <span className="text-secondary-400">|</span>
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
          href="/community"
          className="flex w-60 h-12 px-16 py-3 items-center justify-center gap-2 shrink-0 rounded-[40px] bg-primary text-white font-medium transition-colors whitespace-nowrap"
        >
          목록으로 돌아가기
          <Image
            src={ARROW_BACK_ICON}
            alt="목록으로 돌아가기"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────

/**
 * 날짜 문자열을 "n분 전" 형태로 변환합니다.
 * @param {string} dateString - ISO 8601 날짜 문자열
 * @returns {string}
 */
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
