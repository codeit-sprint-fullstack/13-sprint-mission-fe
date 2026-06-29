"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Gnb from "../components/Gnb";
import Image from "next/image";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { api } from "@/app/lib/axios";

export default function ItemsPage() {
  const queryClient = useQueryClient();

  // 컨트롤 상태
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // 상수 정의
  const PAGE_SIZE = 10;
  const BEST_PAGE_SIZE = 4;
  const PAGE_GROUP_SIZE = 5;

  // 1. 베스트 상품 불러오기
  const {
    data: bestProducts = [],
    isLoading: isBestLoading,
    isError: isBestError,
  } = useQuery({
    queryKey: ["bestProducts"],
    queryFn: async () => {
      const res = await api.get("/products", {
        params: { page: 1, pageSize: BEST_PAGE_SIZE, orderBy: "favorite" },
      });
      return res.data.list || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["products", { page, orderBy, keyword }],
    queryFn: async () => {
      const res = await api.get("/products", {
        params: { page, pageSize: PAGE_SIZE, orderBy, keyword },
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const products = productsData?.list || [];
  const totalCount = productsData?.totalCount || 0;

  // --- 페이지네이션 로직 ---
  const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;
  const currentGroup = Math.ceil(page / PAGE_GROUP_SIZE);
  const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(currentGroup * PAGE_GROUP_SIZE, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 3. 다음 페이지 Prefetching
  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["products", { page: page + 1, orderBy, keyword }],
        queryFn: async () => {
          const res = await api.get("/products", {
            params: { page: page + 1, pageSize: PAGE_SIZE, orderBy, keyword },
          });
          return res.data;
        },
        staleTime: 1000 * 60 * 5,
      });
    }
  }, [page, totalPages, orderBy, keyword, queryClient]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
    setPage(1);
  };

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
    setPage(1);
  };

  const ProductCard = ({ product }) => (
    <Link href={`/items/${product.id}`} className="block group">
      <div className="flex flex-col h-full overflow-hidden transition-shadow bg-white border border-gray-200 rounded-xl hover:shadow-lg">
        {/* 썸네일 */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              이미지 없음
            </div>
          )}
        </div>
        {/* 정보 */}
        <div className="flex flex-col flex-1 p-4">
          <h3 className="text-lg font-medium text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-lg font-bold text-gray-900">
            {product.price?.toLocaleString()}원
          </p>
          <div className="flex items-center gap-1 pt-4 mt-auto text-gray-500">
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">{product.favoriteCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Gnb />

      <main className="max-w-6xl px-4 py-10 mx-auto">
        {/* 베스트 상품 영역 */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">베스트 상품</h2>
          {isBestLoading ? (
            <div className="py-10 text-center text-gray-500">로딩 중...</div>
          ) : isBestError ? (
            <div className="py-10 text-center text-red-500">
              베스트 상품을 불러오는데 실패했습니다.
            </div>
          ) : bestProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : null}
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            판매 중인 상품
          </h2>

          <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="검색할 상품을 입력해주세요"
                className="w-full px-10 py-3 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
              />
              <svg
                className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <button type="submit" className="hidden">
                검색
              </button>
            </form>

            <div className="flex items-center gap-4">
              <Link
                href="/items/new"
                className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                상품 등록하기
              </Link>
              <select
                value={orderBy}
                onChange={handleOrderChange}
                className="px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none cursor-pointer focus:border-blue-500"
              >
                <option value="recent">최신순</option>
                <option value="favorite">좋아요순</option>
              </select>
            </div>
          </div>

          {isProductsLoading ? (
            <div className="py-20 text-center text-gray-500 col-span-full">
              상품 목록을 불러오는 중입니다...
            </div>
          ) : isProductsError ? (
            <div className="py-20 text-center text-red-500 col-span-full">
              상품 목록을 불러오는데 실패했습니다. 다시 시도해주세요.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}

                {products.length === 0 && (
                  <div className="py-20 text-center text-gray-500 col-span-full">
                    일치하는 상품이 없습니다.
                  </div>
                )}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center justify-center w-10 h-10 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <div className="flex gap-2">
                    {pageNumbers.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                          page === p
                            ? "bg-blue-500 text-white shadow-md border-transparent"
                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex items-center justify-center w-10 h-10 text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
