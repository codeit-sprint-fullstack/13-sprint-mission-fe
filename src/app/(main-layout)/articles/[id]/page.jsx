"use client";
import KebabMenu from "@/components/common/KebabMenu";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import CommentForm from "../_components/CommentForm";
import CommentCard from "../_components/CommentCard";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { deleteArticle, getArticle } from "@/api/article";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "@/api/comment";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  // 게시글 상세 데이터 가져오기
  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await getArticle(id);
        if (data && data.success) {
          setArticle(data.data);
        }
      } catch (error) {
        console.error("상세 데이터 로딩 실패:", error.message);
      }
    }
    fetchArticle();
  }, [id]);
  //  댓글 목록 가져오기 함수
  const fetchCommentsData = useCallback(
    async (pageNum) => {
      try {
        setIsFetching(true);
        const commentData = await getComments(id, pageNum, 5);

        if (commentData && commentData.success) {
          const { data, pagination } = commentData;

          if (pageNum === 1) {
            setComments(data);
          } else {
            setComments((prev) => [...prev, ...data]);
          }

          if (pagination.page >= pagination.totalPages) {
            setHasMore(false);
          } else {
            setHasMore(true); // 다음 데이터가 남아있으면 true 유지
          }
        }
      } catch (error) {
        console.error("댓글 로딩 실패:", error.message);
      } finally {
        setIsFetching(false);
      }
    },
    [id],
  );

  // page 상태 변화 감지
  useEffect(() => {
    if (id) fetchCommentsData(page);
  }, [page, id, fetchCommentsData]);

  // 더보기 버튼

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 댓글 등록
  const handleCommentSubmit = async (content) => {
    try {
      const result = await createComment(id, content);
      if (result && result.success) {
        setComments((prev) => [result.data, ...prev]);
      }
    } catch (error) {
      alert("댓글 등록 실패: " + error.message);
    }
  };
  //댓글 수정 기능
  const handleCommentUpdate = async (commentId, newContent) => {
    try {
      const result = await updateComment(id, commentId, newContent);
      if (result && result.success) {
        setComments((prev) =>
          prev.map((item) => (item.id === commentId ? result.data : item)),
        );
      }
    } catch (error) {
      alert("댓글 수정 실패: " + error.message);
    }
  };

  // 댓글 삭제 기능
  const handleCommentDelete = async (commentId) => {
    try {
      const result = await deleteComment(id, commentId);
      if (result && result.success) {
        alert("댓글이 삭제되었습니다.");
        setComments((prev) => prev.filter((item) => item.id !== commentId));
      }
    } catch (error) {
      alert("댓글 삭제 실패: " + error.message);
    }
  };
  const handleEdit = () => {
    router.push(`/articles/${id}/edit`);
  };
  // 게시글 삭제
  const handleDelete = async () => {
    if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        const data = await deleteArticle(id);
        if (data && data.success) {
          alert("삭제되었습니다.");
          router.push("/articles");
        }
      } catch (error) {
        alert("삭제 실패: " + error.message);
      }
    }
  };

  return (
    <main className="mt-[86px] mx-auto flex flex-col gap-[32px] justify-center items-center mb-40">
      <section className="flex flex-col gap-4 w-[344px]">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex justify-between">
            <h2 className="w-[312px] text-xl font-bold text-gray-800">
              {article?.title?.replace(/\.$/, "")}
            </h2>
            <KebabMenu onDelete={handleDelete} onEdit={handleEdit} />
          </div>
          <div className="flex gap-4">
            <div className="flex gap-4 justify-center items-center pr-4 border-r border-r-gray-200">
              <Image
                alt="프로필 사잔"
                src="/ic_profile.svg"
                width={40}
                height={40}
              />
              <div className="flex gap-0.5">
                <p className="text-md text-gray-600 font-medium">user</p>
                <p className="text-md text-gray-400 ">
                  {article?.createdAt
                    ? new Date(article.createdAt)
                        .toLocaleDateString()
                        .replace(/\.$/, "")
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex gap-1 justify-center items-center border border-gray-200 rounded-[35px] px-3  h-8 ">
              <Image
                alt="좋아요수"
                src="/ic_heart.svg"
                width={24}
                height={24}
              />
              <p className="text-lg font-medium text-gray-500">999</p>
            </div>
          </div>
        </div>
        <div className="text-lg text-gray-800">
          <p>{article?.content}</p>
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <CommentForm onSubmit={handleCommentSubmit} />
        <div>
          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                key={item.id}
                comment={item}
                onUpdate={handleCommentUpdate}
                onDelete={handleCommentDelete}
              />
            ))
          ) : (
            <></>
          )}
          {hasMore && comments.length > 0 && (
            <button
              onClick={handleLoadMore}
              disabled={isFetching}
              className="mt-2 w-[343px] h-11 border border-gray-300 rounded-xl text-md font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer flex justify-center items-center disabled:bg-gray-100"
            >
              {isFetching ? "불러오는 중... " : "댓글 더보기 "}
            </button>
          )}
        </div>
      </section>
      <Link
        href="/articles"
        className="flex justify-center py-3 bg-primary-100 w-60 h-12 rounded-[40px] gap-2"
      >
        <p className="text-2lg font-semibold text-gray-100">
          목록으로 돌아가기
        </p>
        <Image
          alt="게시글 목록으로 돌아가기"
          src="/ic_back.svg"
          width={24}
          height={24}
        />
      </Link>
    </main>
  );
}
