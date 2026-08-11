'use client';

import { useEffect, useState, useSyncExternalStore, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ArticleImage from '@/app/components/ArticleImage';
import {
  createProductComment,
  deleteProduct,
  deleteProductComment,
  getProduct,
  getProductComments,
  getProductImageUrl,
  likeProduct,
  unlikeProduct,
  updateProductComment,
} from '@/lib/products';
import { getStoredUser, subscribeToAuthChange } from '@/lib/auth';
import { isResourceOwner, removeComment, replaceComment } from '@/app/items/product-detail-state';
import type { Comment, Product, User } from '@/types';

function formatPrice(price?: number): string {
  return Number(price ?? 0).toLocaleString('ko-KR');
}

function formatDate(value?: string): string {
  if (!value) return '방금 전';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toISOString().slice(0, 10).replaceAll('-', '.');
}

function getServerUser(): User | null {
  return null;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const user = useSyncExternalStore(subscribeToAuthChange, getStoredUser, getServerUser);
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [updatingCommentId, setUpdatingCommentId] = useState<number | null>(null);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState('');
  const [likeError, setLikeError] = useState('');
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    getProduct(id)
      .then((data) => {
        if (isCurrent) setProduct(data);
      })
      .catch(() => {
        if (isCurrent) router.replace('/items');
      });

    return () => {
      isCurrent = false;
    };
  }, [id, router]);

  useEffect(() => {
    let isCurrent = true;

    getProductComments(id)
      .then((data) => {
        if (isCurrent) setComments(data.list ?? []);
      })
      .catch((error: unknown) => {
        console.error(error);
        if (isCurrent) setCommentError('댓글을 불러오지 못했습니다.');
      });

    return () => {
      isCurrent = false;
    };
  }, [id]);

  const canManageProduct = isResourceOwner(user?.id, product?.ownerId);

  async function handleDelete() {
    if (isDeleting || !window.confirm('정말 삭제하시겠습니까?')) return;

    setIsDeleting(true);
    setDeleteError('');

    try {
      await deleteProduct(id);
      router.push('/items');
    } catch (error) {
      console.error(error);
      setDeleteError('상품을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setIsDeleting(false);
    }
  }

  async function handleToggleLike() {
    if (isLiking) return;
    if (!user) {
      router.push('/login');
      return;
    }

    setIsLiking(true);
    setLikeError('');

    try {
      const updated = product?.isLiked ? await unlikeProduct(id) : await likeProduct(id);
      setProduct((current) => (current ? { ...current, ...updated } : updated));
    } catch (error) {
      console.error(error);
      setLikeError('좋아요 처리에 실패했습니다.');
    } finally {
      setIsLiking(false);
    }
  }

  function requireLogin(): boolean {
    if (user) return false;
    router.push('/login');
    return true;
  }

  async function handleCreateComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requireLogin()) return;

    const content = commentInput.trim();
    if (!content || isCommentSubmitting) return;

    setIsCommentSubmitting(true);
    setCommentError('');

    try {
      const comment = await createProductComment(id, { content });
      setComments((current) => [...current, comment]);
      setCommentInput('');
    } catch (error) {
      console.error(error);
      setCommentError('댓글을 등록하지 못했습니다.');
    } finally {
      setIsCommentSubmitting(false);
    }
  }

  function startEditComment(comment: Comment) {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
    setCommentError('');
  }

  function cancelEditComment() {
    setEditingCommentId(null);
    setEditingContent('');
  }

  async function handleUpdateComment(commentId: number) {
    const content = editingContent.trim();
    if (!content || updatingCommentId !== null) return;

    setUpdatingCommentId(commentId);
    setCommentError('');

    try {
      const updated = await updateProductComment(id, commentId, { content });
      setComments((current) => replaceComment(current, updated));
      cancelEditComment();
    } catch (error) {
      console.error(error);
      setCommentError('댓글을 수정하지 못했습니다.');
    } finally {
      setUpdatingCommentId(null);
    }
  }

  async function handleDeleteComment(commentId: number) {
    if (deletingCommentId !== null || !window.confirm('정말 삭제하시겠습니까?')) return;

    setDeletingCommentId(commentId);
    setCommentError('');

    try {
      await deleteProductComment(id, commentId);
      setComments((current) => removeComment(current, commentId));
      if (editingCommentId === commentId) cancelEditComment();
    } catch (error) {
      console.error(error);
      setCommentError('댓글을 삭제하지 못했습니다.');
    } finally {
      setDeletingCommentId(null);
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header active="market" />
        <p className="py-20 text-center text-sm text-[#9CA3AF]">불러오는 중...</p>
      </div>
    );
  }

  const likeCount = product.likeCount ?? product.favoriteCount ?? 0;

  return (
    <div className="min-h-screen bg-white">
      <Header active="market" />
      <main className="mx-auto max-w-[1120px] px-6 py-8">
        <div className="mb-6 text-sm text-[#9CA3AF]">
          <Link href="/items" className="transition-colors hover:text-[#3692FF]">← 목록</Link>
        </div>

        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold text-[#1F2937]">{product.name}</h1>
            {canManageProduct ? (
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/items/${id}/edit`}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  수정
                </Link>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-500 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-3 flex items-center justify-between border-b border-slate-100 pb-4 text-sm text-[#6B7280]">
            <strong className="text-xl text-[#1F2937]">{formatPrice(product.price)}원</strong>
            <span>♡ {likeCount}</span>
          </div>

          {deleteError ? <p role="alert" className="mt-4 text-sm text-rose-500">{deleteError}</p> : null}

          <ArticleImage
            src={getProductImageUrl(product)}
            alt={product.name}
            width={720}
            height={720}
            className="mt-5 w-full rounded-xl object-cover"
          />

          {Array.isArray(product.tags) && product.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#F3F4F6] px-3 py-1 text-sm text-[#6B7280]">
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}

          <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleToggleLike}
              disabled={isLiking}
              aria-pressed={product.isLiked ?? false}
              aria-label={product.isLiked ? '상품 좋아요 취소' : '상품 좋아요'}
              className={`flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                product.isLiked
                  ? 'border-[#3692FF] text-[#3692FF]'
                  : 'border-slate-200 text-slate-600 hover:border-[#3692FF] hover:text-[#3692FF]'
              }`}
            >
              {product.isLiked ? '♥' : '♡'} {likeCount}
            </button>
            {likeError ? <p role="alert" className="text-sm text-rose-500">{likeError}</p> : null}
          </div>
        </article>

        <section className="mt-8" aria-labelledby="product-comments-heading">
          <h2 id="product-comments-heading" className="mb-4 text-xl font-bold text-[#1F2937]">댓글</h2>

          <form onSubmit={handleCreateComment} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <label htmlFor="product-comment" className="sr-only">댓글 내용</label>
            <textarea
              id="product-comment"
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
              onClick={() => {
                if (!user) requireLogin();
              }}
              onFocus={() => {
                if (!user) requireLogin();
              }}
              placeholder={user ? '댓글을 입력해주세요' : '로그인 후 댓글을 작성할 수 있습니다.'}
              className="min-h-28 w-full resize-none rounded-xl border-0 bg-[#F3F4F6] px-4 py-3 text-base text-[#1F2937] placeholder:text-[#9CA3AF] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3692FF]"
            />
            <div className="mt-3 flex items-center justify-between gap-4">
              {commentError ? <p role="alert" className="text-sm text-rose-500">{commentError}</p> : <span />}
              <button
                type="submit"
                disabled={!user || !commentInput.trim() || isCommentSubmitting}
                aria-label="댓글 등록"
                className="flex h-10 w-[72px] items-center justify-center rounded-lg bg-[#3692FF] text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
              >
                {isCommentSubmitting ? '등록 중' : '등록'}
              </button>
            </div>
          </form>

          <div className="mt-4 divide-y divide-[#E5E7EB]">
            {comments.length === 0 ? (
              <p className="py-10 text-center text-sm text-[#9CA3AF]">아직 댓글이 없습니다.</p>
            ) : (
              comments.map((comment) => {
                const canManageComment = isResourceOwner(user?.id, comment.writer?.id);
                const isEditing = canManageComment && editingCommentId === comment.id;
                const isUpdating = updatingCommentId === comment.id;
                const isDeletingComment = deletingCommentId === comment.id;

                return (
                  <div key={comment.id} className="py-5">
                    {isEditing ? (
                      <div className="flex flex-col gap-3">
                        <label htmlFor={`comment-${comment.id}-edit`} className="sr-only">댓글 수정 내용</label>
                        <textarea
                          id={`comment-${comment.id}-edit`}
                          value={editingContent}
                          onChange={(event) => setEditingContent(event.target.value)}
                          className="min-h-24 w-full resize-none rounded-xl border-0 bg-[#F3F4F6] px-4 py-3 text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3692FF]"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={cancelEditComment}
                            disabled={isUpdating}
                            aria-label="댓글 수정 취소"
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            취소
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateComment(comment.id)}
                            disabled={!editingContent.trim() || updatingCommentId !== null}
                            aria-label="댓글 수정 저장"
                            className="rounded-lg bg-[#3692FF] px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
                          >
                            {isUpdating ? '수정 중' : '수정'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="whitespace-pre-wrap text-base text-[#1F2937]">{comment.content}</p>
                        <div className="mt-3 flex items-center justify-between gap-4 text-sm text-[#9CA3AF]">
                          <div className="flex items-center gap-2">
                            <span>{comment.writer?.nickname ?? '알 수 없음'}</span>
                            <span>{formatDate(comment.createdAt)}</span>
                          </div>
                          {canManageComment ? (
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={() => startEditComment(comment)}
                                disabled={updatingCommentId !== null || deletingCommentId !== null}
                                aria-label={`${comment.writer?.nickname ?? '내'} 댓글 수정`}
                                className="transition-colors hover:text-[#3692FF] disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                수정
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteComment(comment.id)}
                                disabled={deletingCommentId !== null || updatingCommentId !== null}
                                aria-label={`${comment.writer?.nickname ?? '내'} 댓글 삭제`}
                                className="transition-colors hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {isDeletingComment ? '삭제 중' : '삭제'}
                              </button>
                            </div>
                          ) : null}
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
