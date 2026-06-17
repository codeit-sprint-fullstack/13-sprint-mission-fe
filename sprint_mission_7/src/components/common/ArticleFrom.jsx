"use client";

import React, { useEffect, useState } from "react";

export default function ArticleFrom({ editData, onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setContent(editData.content || "");
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    onSubmit({ title, content });
  };

  const isFormValid = title.trim() !== "" && content.trim() !== "";
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-gray-800 font-bold">
          {editData ? "상품 수정하기" : "싱품 등록하기"}
        </h2>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-[76px] h-[42px] rounded-lg text-lg text-white ${isFormValid ? "bg-primary-100 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {editData ? "수정" : "등록"}
        </button>
      </div>
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-gray-800">*제목</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            className="w-[297px] px-[24px] py-[16px] bg-gray-100 rounded-xl text-lg"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-gray-800">*내용</h3>
          <textarea
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요"
            className=" w-[297px] h-[250px] px-[24px] py-[16px] bg-gray-100 rounded-xl text-lg"
          />
        </div>
      </div>
    </form>
  );
}
