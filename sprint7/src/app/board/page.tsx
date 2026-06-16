"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 1. 베스트 게시글 가상 더미 데이터
const bestPosts = [
  {
    id: 1,
    title: "요즘 프론트엔드 트렌드에 대해 질문이 있습니다. Next.js App Router가 대세인가요?",
    author: "김코드",
    likes: 15200,
    date: "2026. 06. 15",
    imageUrl: "/images/image 71.svg",
  },
  {
    id: 2,
    title: "프로젝트 진행할 때 Git 브랜치 전략 다들 어떻게 가져가시나요? Git-flow 사용하시나요?",
    author: "이깃헙",
    likes: 98,
    date: "2026. 06. 14",
    imageUrl: "/images/image 71.svg",
  },
  {
    id: 3,
    title: "Tailwind CSS와 정적 스타일링 라이브러리 비교 분석! 생산성 측면에서 엄청난 차이가 있네요.",
    author: "박테일",
    likes: 85,
    date: "2026. 06. 12",
    imageUrl: "/images/image 71.svg",
  },
];

// 2. 초기 일반 게시글 데이터
const initialNormalPosts = [
  {
    id: 4,
    title: "프론트엔드 개발자 취업 준비, 어떻게 시작해야 할까요?",
    author: "취준생1",
    date: "2026. 06. 16",
    likes: 10045,
    imageUrl: "/images/image 71.svg",
  },
  {
    id: 5,
    title: "React와 Next.js의 차이점이 정확히 무엇인지 궁금합니다.",
    author: "리액트초보",
    date: "2026. 06. 15",
    likes: 32,
    imageUrl: "/images/image 71.svg",
  },
  {
    id: 6,
    title: "포트폴리오 프로젝트 주제 추천 부탁드립니다!",
    author: "개발자지망생",
    date: "2026. 06. 14",
    likes: 89,
    imageUrl: "/images/image 71.svg",
  }
];

// 3. 무한 스크롤용 가상 데이터 생성 함수
const generateMockPosts = (page: number) => {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: page * 10 + i + 10,
    title: `무한 스크롤로 불러온 ${page}페이지 게시글 ${i + 1}`,
    author: `유저${page}${i}`,
    date: "2026. 06. 16",
    likes: Math.floor(Math.random() * 15000),
    imageUrl: "/images/image 71.svg",
  }));
};

export default function BoardListPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState('최신순');

  const [posts, setPosts] = useState(initialNormalPosts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMorePosts = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newPosts = generateMockPosts(page);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
      
      if (page >= 5) {
        setHasMore(false);
      }
    }, 1000);
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMorePosts, isLoading, hasMore]);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[40px] pt-[24px]">
      
      {/* 베스트 게시글 섹션 */}
      <div className="w-full">
        <h1 className="mb-[24px] font-['Pretendard'] text-[20px] font-bold text-[#111827]">
          베스트 게시글
        </h1>

        <div className="flex w-full items-center gap-[24px]">
          {bestPosts.map((post) => (
            <Link
              href={`/board/${post.id}`}
              key={post.id}
              className="flex h-[169px] w-[384px] flex-col items-start gap-[10px] rounded-[8px] bg-[#F9FAFB] px-[24px] py-0 transition-shadow hover:shadow-md"
            >
              {/* fill 속성을 제거하고 비율 축소 없이 정확히 왼쪽 시작점부터 102px을 그리도록 수정 */}
              <div className="w-[102px] shrink-0">
                <Image 
                  src="/images/img_badge.svg" 
                  alt="Best" 
                  width={102} 
                  height={32} 
                  className="h-auto w-full" 
                />
              </div>

              <div className="flex w-full items-start justify-between gap-[8px]">
                <h3 className="line-clamp-2 flex-1 font-['Pretendard'] text-[14px] font-medium leading-[22px] text-[#1F2937]">
                  {post.title}
                </h3>
                
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[6px] border border-[#E5E7EB] bg-[#FFF] px-[12px] pb-[13.714px] pt-[13.714px]">
                  <div className="relative h-full w-full">
                    <Image src={post.imageUrl} alt="게시글 이미지" fill className="object-cover rounded-[4px]" />
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <span className="font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#4B5563]">
                    {post.author}
                  </span>
                  <div className="ml-[8px] flex items-center gap-[4px]">
                    <div className="relative h-[16px] w-[16px]">
                      <Image src="/images/ic_heart.svg" alt="좋아요" fill className="object-contain" />
                    </div>
                    <span className="font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#6B7280]">
                      {post.likes > 9999 ? '9999+' : post.likes}
                    </span>
                  </div>
                </div>
                <span className="font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#9CA3AF]">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 일반 게시글 섹션 */}
      <div className="flex w-full flex-col items-start">
        
        <div className="flex w-full items-center justify-between">
          <h2 className="font-['Pretendard'] text-[20px] font-bold leading-[32px] text-[#1F2937]">
            게시글
          </h2>
          <Link
            href="/board/new"
            className="flex h-[42px] w-auto items-center justify-center gap-[10px] rounded-[8px] bg-[#3692FF] px-[23px] py-[12px] transition-colors hover:bg-blue-600"
          >
            <span className="font-['Pretendard'] text-[16px] font-semibold text-[#FFF]">
              글쓰기
            </span>
          </Link>
        </div>
        
        <div className="mt-[24px] flex w-full items-center justify-between">
          <div className="flex h-[42px] w-[1054px] shrink-0 items-center gap-[10px] rounded-[12px] bg-[#F3F4F6] py-[9px] pl-[16px] pr-[20px]">
            <div className="relative h-[24px] w-[24px] shrink-0">
              <Image src="/images/ic_search.svg" alt="검색" fill className="object-contain" />
            </div>
            <input
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              className="flex-1 bg-transparent font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#1F2937] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex h-[42px] w-[130px] items-center justify-between rounded-[12px] border border-[#E5E7EB] bg-[#FFF] px-[20px] py-[12px]"
            >
              <span className="font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#1F2937]">
                {sortBy}
              </span>
              <div className="relative h-[24px] w-[24px] shrink-0">
                <Image src="/images/ic_arrow_down.svg" alt="정렬" fill className="object-contain" />
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-[48px] z-10 flex w-[130px] flex-col items-start overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#FFF] shadow-md">
                <button
                  type="button"
                  onClick={() => { setSortBy('최신순'); setIsDropdownOpen(false); }}
                  className="w-full px-[20px] py-[10px] text-left font-['Pretendard'] text-[16px] text-[#1F2937] hover:bg-gray-50"
                >
                  최신순
                </button>
                <button
                  type="button"
                  onClick={() => { setSortBy('좋아요순'); setIsDropdownOpen(false); }}
                  className="w-full px-[20px] py-[10px] text-left font-['Pretendard'] text-[16px] text-[#1F2937] hover:bg-gray-50"
                >
                  좋아요순
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-[24px] flex w-full flex-col items-start gap-[24px] bg-[#FCFCFC]">
          {posts.map((post) => (
            <Link
              href={`/board/${post.id}`}
              key={post.id}
              className="flex w-full flex-col border-b border-[#E5E7EB] pb-[24px] transition-colors hover:bg-gray-50"
            >
              <div className="flex w-full items-start justify-between">
                <h3 className="font-['Pretendard'] text-[20px] font-semibold leading-[32px] text-[#1F2937]">
                  {post.title}
                </h3>
                
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[8px] border border-[#F3F4F6] bg-[#FFF] px-[12px] py-[13.7px]">
                  <div className="relative h-full w-full">
                    <Image src={post.imageUrl} alt="게시글 썸네일" fill className="object-cover" />
                  </div>
                </div>
              </div>

              <div className="mt-[16px] flex w-full items-center justify-between">
                
                <div className="flex items-center">
                  <div className="relative h-[24px] w-[24px] shrink-0 overflow-hidden rounded-full">
                    <Image src="/images/ic_profile.svg" alt="프로필" fill className="object-cover" />
                  </div>
                  <span className="ml-[8px] font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#4B5563]">
                    {post.author}
                  </span>
                  <span className="ml-[8px] font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#9CA3AF]">
                    {post.date}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="relative h-[24px] w-[24px] shrink-0">
                    <Image src="/images/ic_heart.svg" alt="좋아요" fill className="object-contain" />
                  </div>
                  <span className="ml-[8px] font-['Pretendard'] text-[16px] font-normal leading-[26px] text-[#6B7280]">
                    {post.likes > 9999 ? '9999+' : post.likes}
                  </span>
                </div>

              </div>
            </Link>
          ))}

          {hasMore && (
            <div ref={observerRef} className="flex w-full justify-center py-4">
              {isLoading && (
                <span className="font-['Pretendard'] text-[14px] text-[#9CA3AF]">
                  게시글을 불러오는 중입니다...
                </span>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}