"use client";

import ActionButton from "@/components/button/ActionButton.jsx";
import TextField from "@/components/common/TextField.jsx";
import { createArticles } from "@/lib/api/articles.js";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostSection() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isValid =
    title.trim() &&
    title.length <= 20 &&
    content.trim() &&
    content.length >= 10 &&
    content.length <= 1000;
  const [touched, setTouched] = useState({});
  const router = useRouter();

  const handleSubmit = async () => {
    if (!isValid) {
      setTouched({ title: true, content: true });
      return;
    }
    try {
      const data = await createArticles({ payload: { title, content } });
      router.push(`/articles/${data.article.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={clsx("mb-6 md:mb-8 flex items-center justify-between")}>
        <span className={clsx("text-700-20 text-secondary-gray-800")}>
          게시물 쓰기
        </span>
        <ActionButton onClick={handleSubmit} text="등록" disabled={!isValid} />
      </div>
      <TextField
        className={clsx("mb-4 md:mb-6")}
        isError={touched.title && !isValid}
        errorMessage={
          !title.trim()
            ? "*제목은 필수입니다"
            : title.length > 20
              ? "*제목은 20글자 이하여야 합니다"
              : ""
        }
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setTouched((prev) => ({ ...prev, title: true }));
        }}
        variant="input"
        title="*제목"
        placeholder="제목을 입력하세요"
      />
      <TextField
        isError={touched.content && !isValid}
        errorMessage={
          // 다음에 할 땐 따로 검증함수 뺄 듯
          !content.trim()
            ? "*내용은 필수입니다"
            : content.length < 10
              ? "*내용은 10글자 이상이어야 합니다"
              : content.length > 1000
                ? "*내용은 1000자 이하여야 합니다"
                : ""
        }
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setTouched((prev) => ({ ...prev, content: true }));
        }}
        variant="textarea"
        title="*내용"
        placeholder="내용을 입력해주세요"
      />
    </>
  );
}
