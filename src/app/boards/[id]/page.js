'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getArticle,
  deleteArticle,
  getArticleComments,
  createArticleComment,
  updateArticleComment,
  deleteArticleComment,
  getMockNickname,
  getMockLikeCount,
} from '@/lib/articles';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ArticleImage from '@/app/components/ArticleImage';

function formatDate(str) {
  const date = new Date(str);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toISOString().slice(0, 10).replace(/-/g, '.');
}

function formatLike(n) {
  return n > 9999 ? '9999+' : n;
}

export default function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    getArticle(id)
      .then((data) => {
        if (!data) { router.replace('/boards'); return; }
        setArticle(data);
        setLikeCount(data.likeCount ?? getMockLikeCount(data.id));
      })
      .catch(() => router.replace('/boards'));
  }, [id, router]);

  useEffect(() => {
    getArticleComments(id)
      .then((data) => setComments(data.list ?? []))
      .catch((error) => {
        console.error(error);
        setCommentError('댓글을 불러오지 못했습니다.');
      });
  }, [id]);

  async function handleDelete() {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    setIsDeleting(true);
    setDeleteError('');

    try {
      await deleteArticle(id);
      router.push('/boards');
    } catch (error) {
      console.error(error);
      setDeleteError('게시글을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setIsDeleting(false);
    }
  }

  async function handleCreateComment(event) {
    event.preventDefault();
    const content = commentInput.trim();
    if (!content || isCommentSubmitting) return;

    setIsCommentSubmitting(true);
    setCommentError('');

    try {
      const comment = await createArticleComment(id, { content });
      setComments((prev) => [comment, ...prev]);
      setCommentInput('');
    } catch (error) {
      console.error(error);
      setCommentError('댓글을 등록하지 못했습니다.');
    } finally {
      setIsCommentSubmitting(false);
    }
  }

  function startEditComment(comment) {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content ?? '');
  }

  async function handleUpdateComment(commentId) {
    const content = editingContent.trim();
    if (!content) return;

    try {
      const updated = await updateArticleComment(id, commentId, { content });
      setComments((prev) =>
        prev.map((comment) => (comment.id === commentId ? { ...comment, ...updated } : comment)),
      );
      setEditingCommentId(null);
      setEditingContent('');
    } catch (error) {
      console.error(error);
      setCommentError('댓글을 수정하지 못했습니다.');
    }
  }

  async function handleDeleteComment(commentId) {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      await deleteArticleComment(id, commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error(error);
      setCommentError('댓글을 삭제하지 못했습니다.');
    }
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header active="boards" />
        <p className="py-20 text-center text-sm text-slate-400">불러오는 중...</p>
      </div>
    );
  }

  const nickname = article.writer?.nickname ?? getMockNickname(article.id);
  const image    = article.image;

  return (
    <div className="min-h-screen bg-white">
      <Header active="boards" />

      <main className="mx-auto max-w-[1120px] px-6 py-8">
        {/* 브레드크럼 */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/boards" className="hover:text-[#3692FF] transition-colors">← 목록</Link>
        </div>

        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          {/* 제목 + 수정/삭제 */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-xl font-bold text-slate-900">{article.title}</h1>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/boards/${id}/edit`}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                수정
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 transition-colors"
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>

          {/* 작성자 + 날짜 + 좋아요 */}
          <div className="mt-3 flex items-center justify-between border-b border-slate-100 pb-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-500">
                {nickname?.[0] ?? "?"}
              </span>
              <span className="font-medium text-slate-500">{nickname}</span>
              <span>{formatDate(article.createdAt)}</span>
            </div>
            <span>♡ {formatLike(likeCount)}</span>
          </div>

          {/* 이미지 */}
          {deleteError && (
            <p role="alert" className="mt-4 text-sm text-rose-500">{deleteError}</p>
          )}

          <ArticleImage
            src={image}
            alt="게시글 이미지"
            width={1200}
            height={800}
            className="mt-5 w-full rounded-xl object-cover"
          />

          {/* 본문 */}
          <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
            {article.content}
          </p>

          {/* 좋아요 버튼 */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setLikeCount((n) => n + 1)}
              className="flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 hover:border-[#3692FF] hover:text-[#3692FF] transition-colors"
            >
              ♡ {formatLike(likeCount)}
            </button>
          </div>
        </article>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-[#1F2937]">댓글</h2>

          <form onSubmit={handleCreateComment} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <textarea
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
              placeholder="댓글을 입력해주세요"
              className="min-h-28 w-full resize-none rounded-xl border-0 bg-[#F3F4F6] px-4 py-3 text-base text-[#1F2937] placeholder:text-[#9CA3AF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3692FF]"
            />
            <div className="mt-3 flex items-center justify-between">
              <p role="alert" className="text-sm text-rose-500">{commentError}</p>
              <button
                type="submit"
                disabled={!commentInput.trim() || isCommentSubmitting}
                className="flex h-10 w-[72px] items-center justify-center rounded-lg bg-[#3692FF] text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
              >
                등록
              </button>
            </div>
          </form>

          <div className="mt-4 divide-y divide-[#E5E7EB]">
            {comments.length === 0 ? (
              <p className="py-10 text-center text-sm text-[#9CA3AF]">아직 댓글이 없습니다.</p>
            ) : (
              comments.map((comment) => {
                const isEditing = editingCommentId === comment.id;

                return (
                  <div key={comment.id} className="py-5">
                    {isEditing ? (
                      <div className="flex flex-col gap-3">
                        <textarea
                          value={editingContent}
                          onChange={(event) => setEditingContent(event.target.value)}
                          className="min-h-24 w-full resize-none rounded-xl border-0 bg-[#F3F4F6] px-4 py-3 text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3692FF]"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingCommentId(null)}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600"
                          >
                            취소
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateComment(comment.id)}
                            className="rounded-lg bg-[#3692FF] px-3 py-2 text-sm font-semibold text-white"
                          >
                            수정
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="whitespace-pre-wrap text-base text-[#1F2937]">{comment.content}</p>
                        <div className="mt-3 flex items-center justify-between text-sm text-[#9CA3AF]">
                          <span>{comment.createdAt ? formatDate(comment.createdAt) : '방금 전'}</span>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => startEditComment(comment)}
                              className="transition-colors hover:text-[#3692FF]"
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteComment(comment.id)}
                              className="transition-colors hover:text-rose-500"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
