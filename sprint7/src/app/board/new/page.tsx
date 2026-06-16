"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BoardWritePage() {
  const router = useRouter();
  
  // 폼 입력 상태 관리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 등록 버튼 활성화 조건: 제목과 내용이 모두 비어있지 않아야 함
  const isFormValid = title.trim() !== '' && content.trim() !== '';

  // 등록(수정) 버튼 클릭 핸들러
  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      /* [API 연동 영역] 
        이전 미션에서 생성한 POST 메서드를 여기에 연결합니다.
        
        const response = await fetch('이전_미션_API_엔드포인트', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
        });
        
        if (!response.ok) throw new Error('등록 실패');
        const data = await response.json();
        const newPostId = data.id; // 서버에서 응답받은 생성된 게시글 ID
      */

      console.log("가상 게시글 등록 전송:", { title, content });
      
      // 테스트를 위해 임의의 ID(예: 999) 상세 페이지로 강제 이동합니다.
      // 실제 연동 시에는 위 API 응답의 newPostId를 사용해야 합니다.
      const mockPostId = 999;
      router.push(`/board/${mockPostId}`);
      
    } catch (error) {
      console.error("게시글 등록 오류:", error);
      alert("게시글 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start pt-[24px]">
      
      {/* 상단 타이틀 & 등록 버튼 */}
      <div className="mb-[32px] flex w-full items-center justify-between">
        <h1 className="font-['Pretendard'] text-[20px] font-bold leading-[32px] text-[#1F2937]">
          게시글 쓰기
        </h1>
        
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          type="button"
          className={`flex h-[42px] items-center justify-center gap-[10px] rounded-[8px] px-[23px] py-[12px] transition-colors
            ${isFormValid 
              ? 'bg-[#3692FF] text-[#FFF] hover:bg-blue-600 cursor-pointer' 
              : 'bg-[#9CA3AF] text-[#F3F4F6] cursor-not-allowed'
            }
          `}
        >
          <span className="font-['Pretendard'] text-[16px] font-semibold leading-[26px]">
            등록
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