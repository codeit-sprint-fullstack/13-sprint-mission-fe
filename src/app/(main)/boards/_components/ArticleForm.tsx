"use client";

import {
  getDetailArticleData,
  postArticle,
  updateArticle,
} from "@/app/api/articles";
import { FormSubmitHandler } from "@/types/events";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ArticleFormProps {
  mode: "update" | "create";
  modeTitle: string;
}

type ArticleData = {
  title: string;
  content: string;
};

type ArticleParams = {
  articleId: string;
};

export default function ArticleForm({ mode, modeTitle }: ArticleFormProps) {
  const [articleData, setArticleData] = useState<ArticleData>({
    title: "",
    content: "",
  });
  const router = useRouter();
  const { articleId } = useParams<ArticleParams>();

  const onSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    if (mode === "create") {
      const id = await postArticle(articleData);
      router.replace(`/boards/${id}`);
    }
    if (mode === "update") {
      updateArticle(articleData, Number(articleId));
      router.replace(`/boards/${articleId}`);
    }
  };

  useEffect(() => {
    if (mode === "update") {
      async function getArticleData(): Promise<void> {
        const articleData = await getDetailArticleData(Number(articleId));
        setArticleData({
          title: articleData.data.title,
          content: articleData.data.content,
        });
      }
      getArticleData();
    }
  }, []);
  return (
    <form className="mt-[20px]" onSubmit={onSubmit}>
      <div className="flex justify-between">
        <h1 className="text-secondary-800 text-[20px] font-bold">
          {modeTitle}
        </h1>
        <button
          className={`text-cool-gray-100 bg-brand-blue disabled:bg-secondary-400 rounded-[8px] px-[23px] py-[12px] text-[16px] font-[600] ${!articleData.title || !articleData.content ? "cursor-not-allowed" : "cursor-pointer"}`}
          disabled={!articleData.title || !articleData.content}
        >
          등록
        </button>
      </div>
      <div className="mt-[32px] flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[12px]">
          <label htmlFor="title" className="text-[18px] font-bold">
            *제목
          </label>
          <input
            id="title"
            className="bg-cool-gray-100 rounded-[12px] border border-none px-[24px] py-[16px] focus:outline-none"
            placeholder="제목을 입력해주세요"
            value={articleData.title}
            onChange={(e) =>
              setArticleData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col gap-[12px]">
          <label htmlFor="content" className="text-[18px] font-bold">
            *내용
          </label>
          <textarea
            id="content"
            className="bg-cool-gray-100 h-[282px] resize-none rounded-[12px] border-none px-[24px] py-[16px] focus:outline-none"
            placeholder="내용을 입력해주세요"
            value={articleData.content}
            onChange={(e) =>
              setArticleData((prev) => ({ ...prev, content: e.target.value }))
            }
          />
        </div>
      </div>
    </form>
  );
}
