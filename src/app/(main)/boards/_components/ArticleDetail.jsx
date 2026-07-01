"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { tokenRequest } from "../../../../lib/api";
import { formatDate } from "../../../../utils/formatDate";
import ArticleKebab from "./ArticleKebab";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../providers/AuthProvider";

export default function ArticleDetail({ id }) {
  const { user, isInitialized } = useAuth();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      router.push("/signin");
      return;
    }

    async function getArticleDetail() {
      try {
        const articleData = await tokenRequest(`/articles/${id}`);
        const commentsData = await tokenRequest(
          `/articles/${id}/comments?limit=10`,
        );
        setArticle(articleData);
        setComments(commentsData.list);
      } catch (err) {
        console.error(err.message);
      }
    }

    getArticleDetail();
  }, [id, router, user, isInitialized]);

  if (!article) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="max-w-page mx-auto flex flex-col gap-16 px-4 py-10 md:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <ArticleKebab id={id} title={article.title} />

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/ic_profile.svg"
                    alt="프로필"
                    width={40}
                    height={40}
                  />

                  <div className="flex items-center gap-2 text-body-sm">
                    <span className="text-gray-600">
                      {article.writer?.nickname}
                    </span>

                    <span className="text-gray-400">
                      {formatDate(article.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="h-[34px] w-px bg-gray-200" />

                <div className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1">
                  <Image
                    src="/images/ic_heart.svg"
                    alt="좋아요"
                    width={32}
                    height={32}
                  />

                  <span className="text-body-md text-gray-500">
                    {article.likeCount >= 1000 ? "1K+" : article.likeCount}
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-gray-200" />
            </div>

            <p className="text-body-lg text-gray-800">{article.content}</p>
          </div>

          <CommentForm articleId={id} />

          <CommentList comments={comments} />
        </div>

        <div className="flex justify-center">
          <Link
            href="/boards"
            className="flex items-center gap-2 rounded-full bg-brand-blue px-16 py-3 text-body-lg font-semibold text-white"
          >
            목록으로 돌아가기
            <Image src="/images/ic_back.svg" alt="" width={24} height={24} />
          </Link>
        </div>
      </div>
    </section>
  );
}
