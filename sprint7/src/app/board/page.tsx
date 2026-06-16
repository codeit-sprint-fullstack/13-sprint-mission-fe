"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- 더미 데이터 영역 ---
const bestPosts = [
  { id: 1, title: "요즘 프론트엔드 트렌드에 대해 질문이 있습니다.", author: "김코드", likes: 15200, date: "2026. 06. 15", imageUrl: "/images/image 71.svg" },
  { id: 2, title: "프로젝트 진행할 때 Git 브랜치 전략 다들 어떻게 가져가시나요?", author: "이깃헙", likes: 98, date: "2026. 06. 14", imageUrl: "/images/image 71.svg" },
  { id: 3, title: "Tailwind CSS와 정적 스타일링 라이브러리 비교 분석!", author: "박테일", likes: 85, date: "2026. 06. 12", imageUrl: "/images/image 71.svg" },
];

const initialNormalPosts = [
  { id: 4, title: "프론트엔드 개발자 취업 준비, 어떻게 시작해야 할까요?", author: "취준생1", date: "2026. 06. 16", likes: 10045, imageUrl: "/images/image 71.svg" },
  { id: 5, title: "React와 Next.js의 차이점이 정확히 무엇인지 궁금합니다.", author: "리액트초보", date: "2026. 06. 15", likes: 32, imageUrl: "/images/image 71.svg" },
];

const generateMockPosts = (page: number, keyword: string = '', sort: string = '최신순') => {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: page * 10 + i + 10,
    title: keyword ? `[${keyword} 검색결과] ${page}페이지 게시글` : `[${sort}] 무한 스크롤 ${page}페이지`,
    author: `유저${page}${i}`,
    date: "2026. 06. 16",
    likes: Math.floor(Math.random() * 15000),
    imageUrl: "/images/image 71.svg",
  }));
};

export default function BoardListPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState('최신순');
  
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');

  const [posts, setPosts] = useState(initialNormalPosts);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPosts([]); 
    setPage(1);
    setHasMore(true);
    setPosts(generateMockPosts(1, keyword, sortBy));
  }, [sortBy, keyword]);

  const loadMorePosts = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const newPosts = generateMockPosts(page + 1, keyword, sortBy);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
      
      if (page >= 4) setHasMore(false);
    }, 1000);
  }, [page, isLoading, hasMore, keyword, sortBy]);

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
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loadMorePosts, isLoading, hasMore]);

  // 공통 검색 실행 로직
  const executeSearch = () => {
    setKeyword(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[40px] pt-[24px] px-4 lg:px-0">
      
      {/* 베스트 게시글 섹션 */}
      <div className="w-full">
        <h1 className="mb-[24px] font-['Pretendard'] text-[20px] font-bold text-[#111827]">
          베스트 게시글
        </h1>

        <div className="flex w-full overflow-x-auto lg:overflow-visible items-center gap-[24px] pb-4 lg:pb-0 scrollbar-hide">
          {bestPosts.map((post) => (
            <Link href={`/board/${post.id}`} key={post.id} className="flex h-[169px] w-[384px] shrink-0 flex-col items-start gap-[10px] rounded-[8px] bg-[#F9FAFB] px-[24px] py-0 transition-shadow hover:shadow-md">
              <div className="w-[102px] shrink-0">
                <Image src="/images/img_badge.svg" alt="Best" width={102} height={32} className="h-auto w-full" />
              </div>
              <div className="flex w-full items-start justify-between gap-[8px]">
                <h3 className="line-clamp-2 flex-1 font-['Pretendard'] text-[14px] font-medium leading-[22px] text-[#1F2937]">{post.title}</h3>
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[6px] border border-[#E5E7EB] bg-[#FFF] px-[12px] pb-[13.714px] pt-[13.714px]">
                  <div className="relative h-full w-full">
                    <Image src={post.imageUrl} alt="썸네일" fill className="object-cover rounded-[4px]" />
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <span className="font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#4B5563]">{post.author}</span>
                  <div className="ml-[8px] flex items-center gap-[4px]">
                    <div className="relative h-[16px] w-[16px]">
                      <Image src="/images/ic_heart.svg" alt="좋아요" fill className="object-contain" />
                    </div>
                    <span className="font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#6B7280]">{post.likes > 9999 ? '9999+' : post.likes}</span>
                  </div>
                </div>
                <span className="font-['Pretendard'] text-[14px] font-normal leading-[24px] text-[#9CA3AF]">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 일반 게시글 섹션 */}
      <div className="flex w-full flex-col items-start">
        
        <div className="flex w-full items-center justify-between">
          <h2 className="font-['Pretendard'] text-[20px] font-bold leading-[32px] text-[#1F2937]">게시글</h2>
          <Link href="/board/new" className="flex h-[42px] items-center justify-center gap-[10px] rounded-[8px] bg-[#3692FF] px-[23px] py-[12px] transition-colors hover:bg-blue-600">
            <span className="font-['Pretendard'] text-[16px] font-semibold text-[#FFF]">글쓰기</span>
          </Link>
        </div>
        
        <div className="mt-[24px] flex w-full flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          {/* 검색창 제어 영역 */}
          <div className="flex h-[42px] w-full lg:flex-1 items-center gap-[10px] rounded-[12px] bg-[#F3F4F6] py-[9px] pl-[16px] pr-[20px]">
            {/* 검색 아이콘을 버튼으로 변경하여 클릭 시 executeSearch 실행 */}
            <button 
              type="button" 
              onClick={executeSearch}
              className="relative h-[24px] w-[24px] shrink-0 outline-none transition-transform hover:scale-110 active:scale-95"
              aria-label="검색"
            >
              <Image src="/images/ic_search.svg" alt="검색 아이콘" fill className="object-contain" />
            </button>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="검색할 상품을 입력해주세요"
              className="flex-1 bg-transparent font-['Pretendard'] text-[16px] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>

          <div className="relative shrink-0">
            <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex h-[42px] w-[130px] items-center justify-between rounded-[12px] border border-[#E5E7EB] bg-[#FFF] px-[20px] py-[12px]">
              <span className="font-['Pretendard'] text-[16px] font-normal text-[#1F2937]">{sortBy}</span>
              <div className="relative h-[24px] w-[24px] shrink-0">
                <Image src="/images/ic_arrow_down.svg" alt="정렬" fill className="object-contain" />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 top-[48px] z-10 flex w-[130px] flex-col items-start overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#FFF] shadow-md">
                <button type="button" onClick={() => { setSortBy('최신순'); setIsDropdownOpen(false); }} className="w-full px-[20px] py-[10px] text-left hover:bg-gray-50">최신순</button>
                <button type="button" onClick={() => { setSortBy('좋아요순'); setIsDropdownOpen(false); }} className="w-full px-[20px] py-[10px] text-left hover:bg-gray-50">좋아요순</button>
              </div>
            )}
          </div>
        </div>
        
        {/* 일반 게시글 리스트 */}
        <div className="mt-[24px] flex w-full flex-col items-start gap-[24px] bg-[#FCFCFC]">
          {posts.map((post) => (
            <Link href={`/board/${post.id}`} key={post.id} className="flex w-full flex-col border-b border-[#E5E7EB] pb-[24px] transition-colors hover:bg-gray-50">
              <div className="flex w-full items-start justify-between">
                <h3 className="font-['Pretendard'] text-[20px] font-semibold leading-[32px] text-[#1F2937]">{post.title}</h3>
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[8px] border border-[#F3F4F6] bg-[#FFF] px-[12px] py-[13.7px]">
                  <div className="relative h-full w-full">
                    <Image src={post.imageUrl} alt="썸네일" fill className="object-cover" />
                  </div>
                </div>
              </div>
              <div className="mt-[16px] flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="relative h-[24px] w-[24px] shrink-0 overflow-hidden rounded-full">
                    <Image src="/images/ic_profile.svg" alt="프로필" fill className="object-cover" />
                  </div>
                  <span className="ml-[8px] font-['Pretendard'] text-[14px] text-[#4B5563]">{post.author}</span>
                  <span className="ml-[8px] font-['Pretendard'] text-[14px] text-[#9CA3AF]">{post.date}</span>
                </div>
                <div className="flex items-center">
                  <div className="relative h-[24px] w-[24px] shrink-0">
                    <Image src="/images/ic_heart.svg" alt="좋아요" fill className="object-contain" />
                  </div>
                  <span className="ml-[8px] font-['Pretendard'] text-[16px] text-[#6B7280]">{post.likes > 9999 ? '9999+' : post.likes}</span>
                </div>
              </div>
            </Link>
          ))}

          {hasMore && (
            <div ref={observerRef} className="flex w-full justify-center py-4">
              {isLoading && <span className="font-['Pretendard'] text-[14px] text-[#9CA3AF]">데이터를 불러오는 중입니다...</span>}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}