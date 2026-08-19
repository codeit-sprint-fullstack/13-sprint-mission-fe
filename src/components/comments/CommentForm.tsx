"use client";

import { useState } from "react";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  heading: string;
  placeholder: string;
}

export default function CommentForm({ onSubmit, heading, placeholder }: CommentFormProps) {
  const [content, setContent] = useState("");

  const isValid = content.trim().length > 0;

  const handleSubmit = () => {
    onSubmit(content);
    setContent("");
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 md:text-gray-900">{heading}</h3>
      <textarea
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-md mt-3 h-26 w-full resize-none rounded-xl bg-gray-100 px-6 py-4 text-gray-800 placeholder-gray-400 outline-none"
      />
      <div className="mt-4 flex justify-end">
        <button onClick={handleSubmit} disabled={!isValid} className="btn_small_40">
          등록
        </button>
      </div>
    </div>
  );
}