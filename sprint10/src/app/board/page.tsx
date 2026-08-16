"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchClient } from '@/lib/api/fetchClient';

interface CreateArticleResponse {
  id?: number;
  data?: {
    id: number;
  };
}

export default function BoardWritePage() {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = title.trim() !== '' && content.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetchClient("/articles", {
        method: "POST",
        body: JSON.stringify({ title, content }),
      });
      
      const data = (await response.json()) as CreateArticleResponse;
      const newPostId = data.id || (data.data && data.data.id);
      
      if (newPostId) {
        router.push(`/board/${newPostId}`);
      } else {
        throw new Error("게시글 ID를 받아오지 못했습니다.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("게시글 등록 에러:", error.message);
      } else {
        console.error("게시글 등록 에러:", error);
      }
      alert("게시글 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start pt-[24px]">
      
      <div className="mb-[32px] flex w-full items-center justify-between">
        <h1 className="font-['Pretendard'] text-[20px] font-bold leading-[32px] text-[#1F2937]">
          게시글 쓰기
        </h1>
        
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          type="button"
          className={`flex h-[42px] items-center justify-center gap-[10px] rounded-[8px] px-[23px] py-[12px] transition-colors
            ${isFormValid && !isSubmitting
              ? 'bg-[#3692FF] text-[#FFF] hover:bg-blue-600 cursor-pointer' 
              : 'bg-[#9CA3AF] text-[#F3F4F6] cursor-not-allowed'
            }
          `}
        >
          <span className="font-['Pretendard'] text-[16px] font-semibold leading-[26px]">
            {isSubmitting ? '등록 중...' : '등록'}
          </span>
        </button>
      </div>

      <div className="mb-[24px] flex w-full flex-col items-start">
        <label className="mb-[12px] font-['Pretendard'] text-[18px] font-bold leading-[26px] text-[#1F2937]">
          *제목
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          className="flex h-[56px] w-full items-start gap-[10px] rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#1F2937] outline-none placeholder:text-[#9CA3AF]"
        />
      </div>

      <div className="flex w-full flex-col items-start">
        <label className="mb-[12px] font-['Pretendard'] text-[18px] font-bold leading-[26px] text-[#1F2937]">
          *내용
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요"
          className="flex h-[282px] w-full resize-none items-start gap-[10px] rounded-[12px] bg-[#F3F4F6] px-[24px] py-[16px] font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#1F2937] outline-none placeholder:text-[#9CA3AF]"
        />
      </div>

    </div>
  );
}