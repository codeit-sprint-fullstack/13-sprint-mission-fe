import { useState, type ChangeEvent } from "react";

interface ArticleFormValues {
  title: string;
  content: string;
}

export function useArticleForm(
  initialValues: ArticleFormValues = { title: "", content: "" }
) {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  const isValid = title.trim() !== "" && content.trim() !== "";

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const getValues = (): ArticleFormValues => ({
    title: title.trim(),
    content: content.trim(),
  });

  const reset = () => {
    setTitle("");
    setContent("");
  };

  return {
    title,
    content,
    isValid,
    handleTitleChange,
    handleContentChange,
    getValues,
    reset,
    setTitle,
    setContent,
  };
}
