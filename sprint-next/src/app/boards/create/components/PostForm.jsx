"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/app/boards/create/actions";
import { updateArticle } from "@/app/boards/[id]/actions";
import { articleSchema } from "@/schemas/articleSchema";

const TITLE_MAX = 10;
const CONTENT_MAX = 100;

function validate(title, content) {
  const result = articleSchema.safeParse({ title: title.trim(), content: content.trim() });
  if (result.success) return {};
  const errors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}

export default function PostForm({
  articleId,
  initialTitle = "",
  initialContent = "",
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [touched, setTouched] = useState({ title: false, content: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = !!articleId;
  const errors = validate(title, content);
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async () => {
    setTouched({ title: true, content: true });
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (isEdit) {
        await updateArticle(articleId, { title, content });
        router.push(`/boards/${articleId}`);
      } else {
        await createArticle({ title, content });
        router.push("/boards");
      }
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">
          {isEdit ? "게시글 수정하기" : "게시글 등록하기"}
        </h1>
        <button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className="bg-primary-100 text-white font-medium px-5 py-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-primary-200"
        >
          {isEdit ? "수정" : "등록"}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-800">*제목</label>
          <span className={`text-xs ${title.trim().length > TITLE_MAX ? "text-red-500" : "text-gray-400"}`}>
            {title.trim().length}/{TITLE_MAX}
          </span>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, title: true }))}
          placeholder="제목을 입력해주세요"
          className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none placeholder:text-gray-400 ${touched.title && errors.title ? "ring-1 ring-red-400" : ""}`}
        />
        {touched.title && errors.title && (
          <p className="text-xs text-red-500">{errors.title}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-800">*내용</label>
          <span className={`text-xs ${content.trim().length > CONTENT_MAX ? "text-red-500" : "text-gray-400"}`}>
            {content.trim().length}/{CONTENT_MAX}
          </span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, content: true }))}
          placeholder="내용을 입력해주세요"
          rows={10}
          className={`w-full bg-gray-100 rounded-lg px-4 py-3 text-sm outline-none placeholder:text-gray-400 resize-none ${touched.content && errors.content ? "ring-1 ring-red-400" : ""}`}
        />
        {touched.content && errors.content && (
          <p className="text-xs text-red-500">{errors.content}</p>
        )}
      </div>
    </div>
  );
}
