"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BoardForm({ isEdit = false }) {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit || !id) return;

    async function fetchOriginalPost() {
      try {
        const response = await fetch(`http://localhost:4000/articles/${id}`);
        if (!response.ok) throw new Error("게시글 불러오기 실패");
        const data = await response.json();

        setTitle(data.title || "");
        setContent(data.content || "");
      } catch (error) {
        console.error("기존 게시글 불러오기 실패:", error);
        alert("게시글을 불러올 수 없습니다.");
        router.push("/boards");
      } finally {
        setIsLoading(false);
      }
    }
    fetchOriginalPost();
  }, [id, isEdit, router]);

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const url = isEdit
        ? `http://localhost:4000/articles/${id}`
        : `http://localhost:4000/articles`;

      const method = isEdit ? "PATCH" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error("게시글 저장 실패");

      const savedPost = await response.json();
      const targetId = isEdit ? id : savedPost.id;

      alert(isEdit ? "게시글이 수정되었습니다." : "게시글이 등록되었습니다.");
      router.push(`/boards/${targetId}`);
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("저장에 실패했습니다.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 ">데이터를 불러오는 중...</div>;
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white box-border select-none mb-[100px]">
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full mb-[32px]">
          <h1 className="text-[20px] font-bold text-[#1F2937]">
            {isEdit ? "게시글 수정" : "게시글 쓰기"}
          </h1>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-[74px] h-[42px] rounded-[8px] font-semibold text-[16px] transition cursor-pointer text-white
              ${
                isFormValid
                  ? "bg-[#3692FF] "
                  : "bg-[#9CA3AF] cursor-not-allowed text-[#F3F4F6]"
              }`}
          >
            {isEdit ? "수정" : "등록"}
          </button>
        </div>

        <div className="flex flex-col gap-3 w-full mb-[24px]">
          <label className="text-[18px] font-bold text-[#1F2937]">
            <span className="text-[#1F2937]">*제목</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
            className="w-full px-[24px] py-[16px] bg-[#F3F4F6] border-none rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px] placeholder-[#9CA3AF] box-border"
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <label className="text-[18px] font-bold text-[#1F2937]">
            <span className="text-[#1F2937]">*내용</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요"
            className="w-full h-[282px] px-[24px] py-[16px] bg-[#F3F4F6] border-none rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px] placeholder-[#9CA3AF] resize-none box-border "
          />
        </div>
      </form>
    </div>
  );
}
