"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getArticle, deleteArticle } from "../../../src/api/articleApi";
import { useComments } from "../../../src/hooks/useComments";
import CommentItem from "../../../src/components/CommentItem";
import type { Article } from "../../../src/types/article";

const nicknames = ["렌", "비숍", "호영", "라라", "은월", "아델", "카인", "칼리"];

const getNickname = (id: number) => {
  const index = Number(id) % nicknames.length;
  return nicknames[index] || "비숍";
};

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const { comments, addComment, editComment, removeComment } = useComments(articleId);

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        const data = await getArticle(articleId);
        // 참고: 백엔드 GET /articles/:id는 { ...article, isLiked }를 평탄하게 내려주는데
        // (POST/PATCH만 { article }로 감싸서 내려줌) 기존 코드는 data.article을 읽고 있어서
        // 게시글 상세가 항상 "찾을 수 없습니다"로 보이는 버그였다. TS 전환 중 발견해서 바로잡음.
        setArticle(data ?? null);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        alert("게시글을 불러올 수 없습니다: " + message);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [articleId]);

  async function handleDeleteArticle() {
    if (!confirm("게시글을 삭제하시겠습니까?")) return;

    try {
      await deleteArticle(articleId);
      alert("삭제되었습니다.");
      router.push("/community");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      alert("삭제 실패: " + message);
    }
  }

  async function handleAddComment() {
    if (commentText.trim() === "") return;
    await addComment(commentText.trim());
    setCommentText("");
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <p>불러오는 중...</p>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <p>게시글을 찾을 수 없습니다.</p>
      </main>
    );
  }

  const date = new Date(article.createdAt).toLocaleDateString("ko-KR");

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-8">
      <article className="mb-6 border-b border-gray-200 pb-6">
        <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
          <h1 className="text-xl font-bold text-gray-800 md:text-2xl">{article.title}</h1>
          <div className="flex shrink-0 gap-2">
            <Link href={`/articles/${articleId}/edit`} className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700">
              수정
            </Link>
            <button type="button" className="rounded-lg bg-red-100 px-4 py-2 text-sm text-red-600" onClick={handleDeleteArticle}>
              삭제
            </button>
          </div>
        </div>

        <div className="mb-6 flex gap-3 text-sm text-gray-400">
          <span>{getNickname(article.id)}</span>
          <span>{date}</span>
        </div>

        <p className="text-base leading-7 text-gray-700">{article.content}</p>
      </article>

      <section className="mt-6">
        <h2 className="mb-3 text-base font-bold text-gray-800">댓글 달기</h2>

        <div className="mb-6">
          <textarea
            className="mb-3 min-h-[100px] w-full resize-y rounded-xl bg-gray-100 px-6 py-4 text-base outline-none"
            placeholder="댓글을 입력해주세요"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            type="button"
            className="ml-auto block rounded-lg bg-panda-primary px-6 py-2.5 font-semibold text-white transition hover:bg-panda-hover active:bg-panda-active disabled:cursor-not-allowed disabled:bg-gray-400"
            onClick={handleAddComment}
            disabled={commentText.trim() === ""}
          >
            등록
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} onEdit={editComment} onDelete={removeComment} />
            ))
          ) : (
            <p className="py-10 text-center text-gray-400">아직 댓글이 없습니다.</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/community" className="inline-block rounded-[40px] bg-panda-primary px-10 py-3 font-semibold text-white transition hover:bg-panda-hover active:bg-panda-active">
            목록으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}
