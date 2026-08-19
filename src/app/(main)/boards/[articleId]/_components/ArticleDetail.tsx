"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import KebabMenu from "../../../../../components/KebabMenu";
import { useParams, useRouter } from "next/navigation";
import { deleteDetailArticle, getDetailArticleData } from "@/app/api/articles";
import EmptyState from "../../../../../components/EmptyState";
import { Article } from "@/types/article";

//TODO: ArticleParams타입 여러 컴포넌트에서 자주쓰이니 이것도 분리하는게 좋을듯
type ArticleParams = {
  articleId: string;
};

export default function ArticleDetail() {
  const router = useRouter();
  const { articleId } = useParams<ArticleParams>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDetailArticle(articleId: ArticleParams["articleId"]) {
      setIsLoading(true);
      const articleData = await getDetailArticleData(Number(articleId));
      setArticle(articleData.data);
      setIsLoading(false);
    }
    getDetailArticle(articleId);
  }, []);

  if (isLoading) return <EmptyState>상세 게시글 로딩 중...</EmptyState>;

  if (!article) return <EmptyState>게시글을 찾을 수 없습니다</EmptyState>;

  return (
    <section
      className="mt-[32px] flex w-full flex-col gap-[16px]"
      aria-label="상세 게시글"
    >
      {/* TODO: 인라인 요소 묶을 때는 span써도 되지만 flex justify-content같은 블록 스타일을 쓰고 있으면 div태그가 맞다 근데 다른곳에서도 이미 div안쓰고 span써서 다 바꾸기 귀찮은데 아.. */}
      <span className="flex justify-between">
        <p className="text-secondary-800 text-[20px] font-bold">
          {article.title}
        </p>
        <KebabMenu
          onSelect={(value) => {
            if (value === "update") router.push(`/boards/${articleId}/update`);
            if (value === "delete") {
              deleteDetailArticle(Number(articleId));
              router.replace("/boards");
            }
          }}
        />
      </span>
      <span className="border-cool-gray-200 flex items-center gap-[10px] border-b border-solid pb-[16px]">
        <Image
          src="/ic_profile.svg"
          alt="사용자 기본 프로필"
          width={40}
          height={40}
        />
        <p className="text-secondary-600 text-[14px] font-[500]">
          {article.userName}
        </p>
        <p className="text-secondary-400 mr-[30px] text-[14px] font-[400]">
          {article.createdAt.slice(0, 10)}
        </p>
        <Image
          src="/ic_separator.svg"
          alt=""
          width={1}
          height={34}
          className="mr-[30px]"
        />
        <span className="border-cool-gray-200 rounded-[35px] border px-[12px] py-[4px]">
          <p className="text-secondary-500 text-[16px] font-[500]">
            ❤ {article.favorite}
          </p>
        </span>
      </span>
      <span>
        <p className="text-secondary-800 text-[18px] font-[400]">
          {article.content}
        </p>
      </span>
    </section>
  );
}
