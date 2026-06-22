"use client";

import ActionButton from "@/components/button/ActionButton.jsx";
import TextField from "@/components/common/TextField.jsx";
import { updateArticles } from "@/lib/api/articles.js";
import useGetarticleById from "@/utils/useGetarticleById.js";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation.js";
import { useEffect, useRef, useState } from "react";

export default function UpdateSection() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isValid =
    title.length <= 20 && content.length >= 10 && content.length <= 1000;
  const router = useRouter();
  const initialized = useRef(false);
  const { id } = useParams();
  const article = useGetarticleById(id);

  useEffect(() => {
    if (article && !initialized.current) {
      setTitle(article.title);
      setContent(article.content);
      initialized.current = true;
    }
  }, [article]);

  const isChanged =
    article && (article.title !== title || article.content !== content);

  const handleSubmit = async () => {
    if (!isChanged || !isValid) return;
    try {
      const payload = {};
      if (article.title !== title) payload.title = title;
      if (article.content !== content) payload.content = content;
      const data = await updateArticles({ payload, id });
      router.push(`/articles/${data.article.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={clsx("mb-6 md:mb-8 flex items-center justify-between")}>
        <span className={clsx("text-700-20 text-secondary-gray-800")}>
          게시물 수정
        </span>
        <ActionButton
          onClick={handleSubmit}
          text="수정"
          disabled={!isChanged || !isValid}
        />
      </div>
      <TextField
        className={clsx("mb-4 md:mb-6")}
        isError={title.length > 20}
        errorMessage={title.length > 20 ? "제목은 20글자 이하여야 합니다" : ""}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        variant="input"
        title="*제목"
        placeholder="제목을 입력하세요"
      />
      <TextField
        isError={content.length < 10 || content.length > 1000}
        errorMessage={
          // 다음에 할 땐 따로 검증함수 뺄 듯
          content.length < 10
            ? "내용은 10글자 이상이어야 합니다"
            : content.length > 1000
              ? "내용은 1000자 이하여야 합니다"
              : ""
        }
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        variant="textarea"
        title="*내용"
        placeholder="내용을 입력해주세요"
      />
    </>
  );
}
