"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchClient } from "@/lib/api/fetchClient";
import { Article, PaginatedResponse } from "@/types";

export default function BoardListPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState('최신순');
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');

  const [bestPosts, setBestPosts] = useState<Article[]>([]);
  const [posts, setPosts] = useState<Article[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchBestPosts = async () => {
      try {
        const res = await fetchClient("/articles?orderBy=like&pageSize=3");
        const data = (await res.json()) as PaginatedResponse<Article> | Article[];
        const list = Array.isArray(data) ? data : (data?.list || []);
        setBestPosts(list);
      } catch (error) {
        console.error("베스트 게시글 로드 실패:", error);
      }
    };
    fetchBestPosts();
  }, []);

  useEffect(() => {
    setPosts([]);
    setHasMore(true);
  }, [keyword, sortBy]);

  const loadMorePosts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        pageSize: '10',
        orderBy: sortBy === '최신순' ? 'recent' : 'like'
      });
      if (keyword) {
        params.append('keyword', keyword);
      }
      
      const res = await fetchClient(`/articles?${params.toString()}`);
      const data = (await res.json()) as PaginatedResponse<Article> | Article[];
      
      const newPosts = Array.isArray(data) ? data : (data?.list || []);
      
      setPosts((prev) => [...prev, ...newPosts]);
      
      if (newPosts.length < 10) {
        setHasMore(false); 
      }
    } catch (error) {
      console.error(error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, keyword, sortBy]);

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

  const executeSearch = () => setKeyword(searchInput);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') executeSearch();
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[24px] md:gap-[40px] px-[16px] md:px-[24px] lg:px-0 pt-[24px] md:pt-[32px]">
      <div className="w-full">
        <h1 className="mb-[16px] md:mb-[24px] font-['Pretendard'] text-[18px] md:text-[20px] font-bold text-[#111827]">
          베스트 게시글
        </h1>
        <div className="flex w-full gap-[16px] md:gap-[24px] overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {bestPosts.map((post) => (
            <Link href={`/board/${post.id}`} key={`best-${post.id}`} className="flex h-[169px] w-[280px] md:w-[384px] lg:w-full shrink-0 flex-col items-start gap-[10px] rounded-[8px] bg-[#F9FAFB] px-[16px] md:px-[24px] py-0 transition-shadow hover:shadow-md">
              <div className="w-[80px] md:w-[102px] shrink-0">
                <Image src="/images/img_badge.svg" alt="Best" width={102} height={32} className="h-auto w-full" />
              </div>
              <div className="flex w-full items-start justify-between gap-[8px]">
                <h3 className="line-clamp-2 flex-1 font-['Pretendard'] text-[14px] md:text-[16px] font-medium leading-[22px] md:leading-[24px] text-[#1F2937]">{post.title}</h3>
                <div className="flex h-[60px] w-[60px] md:h-[72px] md:w-[72px] shrink-0 items-center justify-center rounded-[6px] border border-[#E5E7EB] bg-[#FFF] p-[8px] md:p-[12px]">
                  <div className="relative h-full w-full">
                    <Image src="/images/image 71.svg" alt="썸네일" fill className="object-cover rounded-[4px]" />
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <span className="font-['Pretendard'] text-[12px] md:text-[14px] font-normal leading-[24px] text-[#4B5563]">
                    {post.writer?.nickname || "익명"}
                  </span>
                  <div className="ml-[8px] flex items-center gap-[4px]">
                    <div className="relative h-[14px] w-[14px] md:h-[16px] md:w-[16px]">
                      <Image src="/images/ic_heart.svg" alt="좋아요" fill className="object-contain" />
                    </div>
                    <span className="font-['Pretendard'] text-[12px] md:text-[14px] font-normal leading-[24px] text-[#6B7280]">
                      {post.likeCount || 0}
                    </span>
                  </div>
                </div>
                <span className="font-['Pretendard'] text-[12px] md:text-[14px] font-normal leading-[24px] text-[#9CA3AF]">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-['Pretendard'] text-[18px] md:text-[20px] font-bold leading-[32px] text-[#1F2937]">게시글</h2>
          <Link href="/board/new" className="flex h-[36px] md:h-[42px] items-center justify-center gap-[6px] md:gap-[10px] rounded-[8px] bg-[#3692FF] px-[16px] md:px-[23px] py-[8px] md:py-[12px] transition-colors hover:bg-blue-600">
            <span className="font-['Pretendard'] text-[14px] md:text-[16px] font-semibold text-[#FFF]">글쓰기</span>
          </Link>
        </div>
        
        <div className="mt-[16px] md:mt-[24px] flex w-full flex-col md:flex-row items-end md:items-center justify-between gap-[12px] md:gap-4">
          <div className="flex h-[42px] w-full md:flex-1 items-center gap-[10px] rounded-[12px] bg-[#F3F4F6] py-[9px] pl-[16px] pr-[20px]">
            <button type="button" onClick={executeSearch} className="relative h-[20px] w-[20px] md:h-[24px] md:w-[24px] shrink-0 outline-none transition-transform hover:scale-110 active:scale-95" aria-label="검색">
              <Image src="/images/ic_search.svg" alt="검색 아이콘" fill className="object-contain" />
            </button>
            <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="검색할 게시글을 입력해주세요" className="flex-1 bg-transparent font-['Pretendard'] text-[14px] md:text-[16px] outline-none placeholder:text-[#9CA3AF]" />
          </div>

          <div className="relative shrink-0 w-full md:w-auto flex justify-end">
            <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex h-[42px] w-[110px] md:w-[130px] items-center justify-between rounded-[12px] border border-[#E5E7EB] bg-[#FFF] px-[16px] md:px-[20px] py-[12px]">
              <span className="font-['Pretendard'] text-[14px] md:text-[16px] font-normal text-[#1F2937]">{sortBy}</span>
              <div className="relative h-[20px] w-[20px] md:h-[24px] md:w-[24px] shrink-0">
                <Image src="/images/ic_arrow_down.svg" alt="정렬" fill className="object-contain" />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 top-[48px] z-10 flex w-[110px] md:w-[130px] flex-col items-start overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#FFF] shadow-md">
                <button type="button" onClick={() => { setSortBy('최신순'); setIsDropdownOpen(false); }} className="w-full px-[16px] md:px-[20px] py-[10px] text-left text-[14px] md:text-[16px] hover:bg-gray-50">최신순</button>
                <button type="button" onClick={() => { setSortBy('좋아요순'); setIsDropdownOpen(false); }} className="w-full px-[16px] md:px-[20px] py-[10px] text-left text-[14px] md:text-[16px] hover:bg-gray-50">좋아요순</button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-[16px] md:mt-[24px] flex w-full flex-col items-start gap-[16px] md:gap-[24px] bg-[#FCFCFC]">
          {posts.map((post) => (
            <Link href={`/board/${post.id}`} key={`post-${post.id}`} className="flex w-full flex-col border-b border-[#E5E7EB] pb-[16px] md:pb-[24px] transition-colors hover:bg-gray-50">
              <div className="flex w-full items-start justify-between gap-[16px]">
                <h3 className="font-['Pretendard'] text-[16px] md:text-[20px] font-semibold leading-[26px] md:leading-[32px] text-[#1F2937] break-all">{post.title}</h3>
                <div className="flex h-[60px] w-[60px] md:h-[72px] md:w-[72px] shrink-0 items-center justify-center rounded-[8px] border border-[#F3F4F6] bg-[#FFF] p-[8px] md:p-[12px]">
                  <div className="relative h-full w-full">
                    <Image src="/images/image 71.svg" alt="썸네일" fill className="object-cover rounded-[4px]" />
                  </div>
                </div>
              </div>
              <div className="mt-[12px] md:mt-[16px] flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="relative h-[20px] w-[20px] md:h-[24px] md:w-[24px] shrink-0 overflow-hidden rounded-full">
                    <Image src="/images/ic_profile.svg" alt="프로필" fill className="object-cover" />
                  </div>
                  <span className="ml-[6px] md:ml-[8px] font-['Pretendard'] text-[12px] md:text-[14px] text-[#4B5563]">
                    {post.writer?.nickname || "익명"}
                  </span>
                  <span className="ml-[6px] md:ml-[8px] font-['Pretendard'] text-[12px] md:text-[14px] text-[#9CA3AF]">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <div className="relative h-[20px] w-[20px] md:h-[24px] md:w-[24px] shrink-0">
                    <Image src="/images/ic_heart.svg" alt="좋아요" fill className="object-contain" />
                  </div>
                  <span className="ml-[4px] md:ml-[8px] font-['Pretendard'] text-[14px] md:text-[16px] text-[#6B7280]">
                    {post.likeCount || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {hasMore && (
            <div ref={observerRef} className="flex w-full justify-center py-4">
              {isLoading && <span className="font-['Pretendard'] text-[12px] md:text-[14px] text-[#9CA3AF]">데이터를 불러오는 중입니다...</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}