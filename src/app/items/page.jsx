"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/app/lib/api";

const PAGE_SIZE = 10;

function ProductCard({ product }) {
  return (
    <Link
      href={`/items/${product.id}`}
      className="flex flex-col gap-3 cursor-pointer no-underline"
    >
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            이미지 없음
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-gray-800 truncate">
          {product.name}
        </p>
        <p className="text-base font-bold text-gray-900">
          {product.price.toLocaleString()}원
        </p>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Image
            src="/icons/ic_heart.svg"
            alt="좋아요"
            width={16}
            height={16}
          />
          <span>{product.favoriteCount}</span>
        </div>
      </div>
    </Link>
  );
}

export default function ItemsPage() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("recent");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", { page, keyword, orderBy }],
    queryFn: () => getProducts({ page, pageSize: PAGE_SIZE, keyword, orderBy }),
  });

  const totalPages = data ? Math.ceil(data.totalCount / PAGE_SIZE) : 1;

  function handleSearch(e) {
    e.preventDefault();
    setKeyword(search);
    setPage(1);
  }

  return (
    <div className="max-w-390 mx-auto">
      {/* 상단 검색/정렬 */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-bold text-gray-800 whitespace-nowrap">
          판매 중인 상품
        </h2>
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색할 상품을 입력해주세요"
            className="flex-1 h-10 px-4 rounded-xl bg-gray-100 text-sm outline-none"
          />
          <button
            type="submit"
            className="h-10 px-4 bg-primary text-white rounded-xl text-sm font-semibold"
          >
            검색
          </button>
        </form>
        <select
          value={orderBy}
          onChange={(e) => {
            setOrderBy(e.target.value);
            setPage(1);
          }}
          className="h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none"
        >
          <option value="recent">최신순</option>
          <option value="favoriteCount">좋아요순</option>
        </select>
      </div>

      {/* 상품 목록 */}
      {isLoading && (
        <p className="text-center text-gray-500 py-20">로딩 중...</p>
      )}
      {isError && (
        <p className="text-center text-red-500 py-20">
          상품을 불러오지 못했습니다.
        </p>
      )}
      {data && (
        <>
          <div className="grid grid-cols-2 bd:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {data.list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-40"
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded border text-sm ${
                    p === page
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-40"
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}