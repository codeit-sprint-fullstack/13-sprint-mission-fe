"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchClient } from "@/lib/api/fetchClient";
import { Product, PaginatedResponse } from "@/types";

export default function ItemsListPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState('최신순');
  
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');

  const [bestItems, setBestItems] = useState<Product[]>([]);
  const [items, setItems] = useState<Product[]>([]);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBestItems = async () => {
      try {
        const res = await fetchClient("/products?orderBy=favorite&pageSize=4");
        const data = (await res.json()) as PaginatedResponse<Product> | Product[];
        const list = 'list' in data ? data.list : data;
        setBestItems(list);
      } catch (error) {
        console.error("베스트 상품 로드 실패:", error);
      }
    };
    fetchBestItems();
  }, []);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: '10',
        orderBy: sortBy === '최신순' ? 'recent' : 'favorite'
      });
      
      if (keyword) {
        params.append('keyword', keyword);
      }
      
      const res = await fetchClient(`/products?${params.toString()}`);
      const data = (await res.json()) as PaginatedResponse<Product>;
      
      const fetchedItems = data.list || [];
      setItems(fetchedItems);
      
      const total = data.totalCount || 75; 
      setTotalPages(Math.ceil(total / 10));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, keyword, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [keyword, sortBy]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const executeSearch = () => {
    setKeyword(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') executeSearch();
  };

  const getThumbnail = (item: Product) => {
    if (item.image) return item.image;
    if (item.images && item.images.length > 0) return item.images[0];
    return "/images/image 71.svg";
  };

  const currentGroup = Math.floor((page - 1) / 5);
  const startPage = currentGroup * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const handleNextGroup = () => {
    const nextGroupFirstPage = (currentGroup + 1) * 5 + 1;
    if (nextGroupFirstPage <= totalPages) {
      setPage(nextGroupFirstPage);
    }
  };

  const handlePrevGroup = () => {
    const prevGroupFirstPage = (currentGroup - 1) * 5 + 1;
    if (prevGroupFirstPage >= 1) {
      setPage(prevGroupFirstPage);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[40px] px-[24px] lg:px-0 pt-[32px] pb-[80px]">
      
      <div className="w-full">
        <h1 className="mb-[24px] font-['Pretendard'] text-[20px] font-bold text-[#111827]">
          베스트 상품
        </h1>
        <div className="grid grid-cols-2 gap-[24px] lg:grid-cols-4">
          {bestItems.map((item) => (
            <Link href={`/items/${item.id}`} key={`best-${item.id}`} className="flex w-full flex-col gap-[16px] transition-transform hover:-translate-y-1">
              <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-gray-100 border border-[#E5E7EB]">
                <Image src={getThumbnail(item)} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col gap-[8px]">
                <h3 className="line-clamp-1 font-['Pretendard'] text-[16px] font-medium text-[#1F2937]">{item.name}</h3>
                <span className="font-['Pretendard'] text-[18px] font-bold text-[#1F2937]">{item.price.toLocaleString()}원</span>
                <div className="flex items-center gap-[4px]">
                  <div className="relative h-[16px] w-[16px]">
                    <Image src="/images/ic_heart.svg" alt="좋아요" fill className="object-contain" />
                  </div>
                  <span className="font-['Pretendard'] text-[14px] text-[#6B7280]">{item.favoriteCount || 0}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-['Pretendard'] text-[20px] font-bold text-[#1F2937]">판매 중인 상품</h2>
          
          <div className="flex items-center gap-[12px]">
            <div className="flex h-[42px] w-[280px] items-center gap-[10px] rounded-[12px] bg-[#F3F4F6] px-[16px]">
              <button type="button" onClick={executeSearch} className="relative h-[24px] w-[24px] shrink-0 outline-none">
                <Image src="/images/ic_search.svg" alt="검색" fill className="object-contain" />
              </button>
              <input 
                type="text" 
                value={searchInput} 
                onChange={(e) => setSearchInput(e.target.value)} 
                onKeyDown={handleKeyDown} 
                placeholder="검색할 상품을 입력해주세요" 
                className="flex-1 bg-transparent font-['Pretendard'] text-[14px] outline-none placeholder:text-[#9CA3AF]" 
              />
            </div>

            <Link href="/items/new" className="flex h-[42px] items-center justify-center rounded-[8px] bg-[#3692FF] px-[23px] transition-colors hover:bg-blue-600">
              <span className="font-['Pretendard'] text-[16px] font-semibold text-[#FFF]">상품 등록하기</span>
            </Link>

            <div className="relative shrink-0">
              <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex h-[42px] w-[130px] items-center justify-between rounded-[12px] border border-[#E5E7EB] bg-[#FFF] px-[20px]">
                <span className="font-['Pretendard'] text-[16px] font-normal text-[#1F2937]">{sortBy}</span>
                <div className="relative h-[24px] w-[24px] shrink-0">
                  <Image src="/images/ic_arrow_down.svg" alt="정렬" fill className="object-contain" />
                </div>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-[48px] z-10 flex w-[130px] flex-col items-start overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#FFF] shadow-md">
                  <button type="button" onClick={() => { setSortBy('최신순'); setIsDropdownOpen(false); }} className="w-full px-[20px] py-[10px] text-left text-[16px] hover:bg-gray-50">최신순</button>
                  <button type="button" onClick={() => { setSortBy('좋아요순'); setIsDropdownOpen(false); }} className="w-full px-[20px] py-[10px] text-left text-[16px] hover:bg-gray-50">좋아요순</button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex w-full justify-center py-20 font-['Pretendard'] text-[#9CA3AF]">상품을 불러오는 중입니다...</div>
        ) : (
          <div className="mt-[24px] grid w-full grid-cols-2 gap-[24px] md:grid-cols-3 lg:grid-cols-5">
            {items.map((item) => (
              <Link href={`/items/${item.id}`} key={`item-${item.id}`} className="flex w-full flex-col gap-[16px] transition-transform hover:-translate-y-1">
                <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-gray-100 border border-[#E5E7EB]">
                  <Image src={getThumbnail(item)} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <h3 className="line-clamp-1 font-['Pretendard'] text-[16px] font-medium text-[#1F2937]">{item.name}</h3>
                  <span className="font-['Pretendard'] text-[18px] font-bold text-[#1F2937]">{item.price.toLocaleString()}원</span>
                  <div className="flex items-center gap-[4px]">
                    <div className="relative h-[16px] w-[16px]">
                      <Image src="/images/ic_heart.svg" alt="좋아요" fill className="object-contain" />
                    </div>
                    <span className="font-['Pretendard'] text-[14px] text-[#6B7280]">{item.favoriteCount || 0}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && items.length > 0 && (
          <div className="mt-[40px] flex w-full items-center justify-center gap-[12px]">
            
            <button 
              onClick={handlePrevGroup}
              disabled={currentGroup === 0}
              className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden transition-opacity disabled:opacity-30 active:scale-95"
            >
              <Image src="/images/Ellipse 39.svg" alt="버튼 배경" fill className="object-contain" />
              <div className="relative h-[20px] w-[20px] rotate-180">
                <Image src="/images/arrow_right.svg" alt="이전" fill className="object-contain" />
              </div>
            </button>
            
            {visiblePages.map(num => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden active:scale-95"
              >
                <Image src="/images/Ellipse 39.svg" alt="버튼 배경" fill className="object-contain" />
                
                <span className={`relative font-['Pretendard'] text-[16px] font-bold z-10 transition-colors ${
                  page === num ? "text-[#3692FF]" : "text-[#4B5563]"
                }`}>
                  {num}
                </span>
              </button>
            ))}

            <button 
              onClick={handleNextGroup}
              disabled={endPage >= totalPages}
              className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden transition-opacity disabled:opacity-30 active:scale-95"
            >
              <Image src="/images/Ellipse 39.svg" alt="버튼 배경" fill className="object-contain" />
              <div className="relative h-[20px] w-[20px]">
                <Image src="/images/arrow_right.svg" alt="다음" fill className="object-contain" />
              </div>
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
}