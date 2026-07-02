"use client";

import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { articleApi, commentApi, getErrorMessage } from "@/lib/api";
import { queryKeys } from "@/lib/queries";

const shellClass =
  "mx-auto w-[min(100%-32px,640px)] tablet:w-[min(100%-48px,900px)] desktop:w-[min(100%-48px,900px)]";

export default function ArticleDetailPage() {
  const { articleId } = useParams();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const articleQuery = useQuery({
    queryKey: queryKeys.article(articleId),
    queryFn: () => articleApi.detail(articleId),
  });
  const commentsQuery = useQuery({
    queryKey: queryKeys.articleComments(articleId),
    aueryFn: () => commentApi.listArticle(articleId),
  });

  const toggleLike = useMutation({
    mutationFn: () =>
      articleQuery.data?.isFavorite || articleQuery.data?.isLiked
        ? articleApi.unfavorite(articleId)
        : articleApi.favorite(articleId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.article(articleId) }),
    onError: (err) => setError(getErrorMessage(err)),
  });
  const createComment = useMutation({
    mutationFn: () => commentApi.createArticle(articleId, comment.trim()),
    onSuccess: () => {
      (setComment(""),
        queryClient.invalidateQueries({
          queryKey: queryKeys.articleComments(articleId),
        }));
    },
    onError: (err) => setError(getErrorMessage(err)),
  });

  const article = articleQuery.data;

  return (
    <div className="bg-white text-[#1f2937]">
      <Header />
      <main
        className={`${shellClass} min-h-[calc(100vh-170px)] pb-[120px] pt-8`}
      >
        {articleQuery.isLoading ? (
          <p className="rounded-lg bg-[#f3f4f6] p-[18px] tetx-[#6b7280]">
            게시글을 불러오는 중...
          </p>
        ) : null}
        {articleQuery.isError ? (
          <p className="rounded-lg bg-red-50 p-[18px] text-red-700">
            게시글을 불러오지 못했어요.
          </p>
        ) : null}
        {article ? (
          <>
            <article className="border-b border-[#e5e7eb] pb-8">
              <h1 className="mb-3 text-[26px] font-bold">{article.title}</h1>
              <span className="text-sm text-gray-400">
                {article.writer?.nickname || "익명"} ·{" "}
                {article.createdAt?.slice(0, 10)}
              </span>
              <p className="mt-7 whitespace-pre-line leading-[1.7] text-gray-700">
                {article.content}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {(article.imageUrls || article.images || []).map((src) => (
                  <img
                    className="h-[160px] w-[220px] rounded-lg object-cover"
                    src={src}
                    alt=""
                    key={src}
                  />
                ))}
              </div>
              <button
                className="mt-7 inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#e5e7eb] px-[18px] font-bold text-gray-600"
                type="button"
                onClick={() => toggleLike.mutate()}
              >
                <Heart size={18} />
                {(article.favoriteCount ?? 0).toLocaleString("ko-KR")}
              </button>
            </article>
            <section className="pt-[30px]">
              <h2 className="mb-3.5 text-base font-bold">댓글</h2>
              <form
                className="grid gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (comment.trim()) createComment.mutate();
                }}
              >
                <textarea
                  className="min-h-[96px] w-full resize-y rounded-lg border-0 bg-[#f3f4f6] p-4 outline-none"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="댓글을 입력해주세요"
                />
                <button
                  className="inline-flex h-[42px] min-w-[74px] items-center justify-center justify-self-end rounded-lg bg-[#3692ff] px-[18px] font-bold text-white disabled:bg-gray-400"
                  disabled={!comment.trim() || createComment.isPending}
                >
                  등록
                </button>
              </form>
              <div className="mt-[18px]">
                {commentsQuery.data?.list?.map((item) => (
                  <article
                    className="flex gap-3 border-b border-[#e5e7eb] py-5"
                    key={item.id}
                  >
                    <MessageCircle className="mt-1 text-gray-400" size={16} />
                    <div>
                      <p className="mb-2">{item.content}</p>
                      <span className="text-xs text-gray-400">
                        {item.writer?.nickname || "익명"} ·{" "}
                        {item.createdAt?.slice(0, 10)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
              {error ? (
                <p className="mt-3 text-[13px] font-semibold text-[#ef4444]">
                  {error}
                </p>
              ) : null}
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
