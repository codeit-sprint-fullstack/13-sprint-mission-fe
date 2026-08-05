"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "./api";
import { formatDate, getDisplayMeta } from "./meta";

const defaultImage = "/images/default-product.svg";

export default function PostDetail({ postId }) {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");

  async function fetchPost() {
    const response = await fetch(apiUrl(`/articles/${postId}`), {
      cache: "no-store",
    });

    if (!response.ok) {
      router.replace("/freeboard");
      return;
    }

    const article = await response.json();
    const commentsResponse = await fetch(
      apiUrl(`/articles/${postId}/comments?limit=50`),
      { cache: "no-store" },
    );
    const commentsData = commentsResponse.ok
      ? await commentsResponse.json()
      : { data: [] };
    setPost({
      ...article,
      comments: commentsData.data || [],
    });
  }

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const meta = useMemo(() => (post ? getDisplayMeta(post.id) : null), [post]);
  const canComment = commentText.trim().length > 0;

  async function handleDeletePost() {
    const response = await fetch(apiUrl(`/articles/${postId}`), {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/freeboard");
      router.refresh();
    }
  }

  async function handleCreateComment(event) {
    event.preventDefault();

    if (!canComment) {
      return;
    }

    const response = await fetch(apiUrl(`/articles/${postId}/comments`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: commentText }),
    });

    if (response.ok) {
      setCommentText("");
      fetchPost();
    }
  }

  if (!post || !meta) {
    return (
      <section className="mx-auto max-w-[900px] px-5 pb-16 pt-7 sm:px-6">
        <p className="my-7 text-center text-gray-400">
          게시글을 불러오는 중입니다.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[900px] px-5 pb-16 pt-7 sm:px-6">
      <article className="border-b border-gray-200 py-7">
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="mb-3 text-2xl font-bold leading-[1.4]">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-[13px] text-gray-400">
              <span>{meta.nickname}</span>
              <time>{formatDate(post.createdAt)}</time>
              <span>❤️ {meta.likes}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              className="inline-flex h-[34px] min-w-[54px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 font-bold text-gray-700"
              href={`/freeboard/${post.id}/edit`}
            >
              수정
            </Link>
            <button
              className="inline-flex h-[34px] min-w-[54px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 font-bold text-red-500"
              type="button"
              onClick={handleDeletePost}
            >
              삭제
            </button>
          </div>
        </div>
        <img
          className="size-[120px] rounded-lg border border-gray-200 object-cover"
          src={post.imageUrl || defaultImage}
          alt=""
        />
        <p className="mt-6 whitespace-pre-wrap leading-[1.8] text-gray-700">
          {post.content}
        </p>
      </article>

      <section className="pt-7" aria-labelledby="comments-heading">
        <h2 id="comments-heading" className="mb-5 text-xl font-bold">
          댓글
        </h2>
        <form
          className="mb-[18px] grid grid-cols-1 gap-3 sm:grid-cols-[1fr_72px]"
          onSubmit={handleCreateComment}
        >
          <input
            className="h-[42px] w-full rounded-lg border-0 bg-gray-100 px-3.5 text-gray-900 outline-none placeholder:text-gray-400"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="댓글을 입력해주세요"
          />
          <button
            className="inline-flex h-[42px] min-w-[72px] items-center justify-center rounded-lg bg-blue-500 px-[18px] font-bold text-white hover:bg-blue-600 disabled:bg-gray-400"
            type="submit"
            disabled={!canComment}
          >
            등록
          </button>
        </form>
        <div className="grid gap-2.5">
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                postId={post.id}
                comment={comment}
                onChange={fetchPost}
              />
            ))
          ) : (
            <p className="my-7 text-center text-gray-400">
              아직 댓글이 없습니다.
            </p>
          )}
        </div>
      </section>
    </section>
  );
}

function CommentItem({ postId, comment, onChange }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(comment.content);

  async function updateComment() {
    const response = await fetch(
      apiUrl(`/articles/${postId}/comments/${comment.id}`),
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: value }),
      },
    );

    if (response.ok) {
      setEditing(false);
      onChange();
    }
  }

  async function deleteComment() {
    const response = await fetch(
      apiUrl(`/articles/${postId}/comments/${comment.id}`),
      { method: "DELETE" },
    );

    if (response.ok) {
      onChange();
    }
  }

  return (
    <div className="grid grid-cols-1 items-center gap-3 rounded-lg border border-gray-200 p-3.5 sm:grid-cols-[1fr_auto]">
      {editing ? (
        <input
          className="h-[42px] w-full rounded-lg border-0 bg-gray-100 px-3.5 text-gray-900 outline-none"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      ) : (
        <p className="text-gray-700">{comment.content}</p>
      )}
      <div className="flex gap-2">
        {editing ? (
          <button
            className="inline-flex h-[34px] min-w-[54px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 font-bold text-gray-700 disabled:text-gray-300"
            type="button"
            onClick={updateComment}
            disabled={!value.trim()}
          >
            저장
          </button>
        ) : (
          <button
            className="inline-flex h-[34px] min-w-[54px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 font-bold text-gray-700 disabled:text-gray-300"
            type="button"
            onClick={() => setEditing(true)}
          >
            수정
          </button>
        )}
        <button
          className="inline-flex h-[34px] min-w-[54px] items-center justify-center rounded-lg border border-gray-200 bg-white px-3 font-bold text-red-500"
          type="button"
          onClick={deleteComment}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
