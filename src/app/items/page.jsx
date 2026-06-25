"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getProducts } from "@/app/lib/api";
import ProductCard from "../components/ui/ProductCard";

const PAGE_GROUP_SIZE = 5;
const ARROW_RIGHT_ICON = "/icons/arrow_right.svg";
const ARROW_LEFT_ICON = "/icons/arrow_left.svg";

export default function ItemsPage() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", { page, keyword, orderBy, pageSize }],
    queryFn: () => getProducts({ page, pageSize, keyword, orderBy }),
  });

  const { data: bestData } = useQuery({
    queryKey: ["best-products"],
    queryFn: () => getProducts({ page: 1, pageSize: 4, orderBy: "favorite" }),
  });

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1560px)").matches)
        setPageSize(10); // 5열 × 2행
      else if (window.matchMedia("(min-width: 744px)").matches)
        setPageSize(6); // 3열 × 2행
      else setPageSize(4); // 2열 × 2행
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const bestProducts = bestData?.list ?? [];
  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 1;
  const currentGroup = Math.ceil(page / PAGE_GROUP_SIZE);
  const groupStart = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, totalPages);

  function handleSearch(e) {
    e.preventDefault();
    setKeyword(search);
    setPage(1);
  }

  return (
    <div className="max-w-390 mx-auto">
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">베스트 상품</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 bd:grid-cols-4 gap-4 bd:gap-6">
          {bestProducts.map((product, index) => (
            <div
              key={product.id}
              className={
                ["", "hidden md:block", "hidden bd:block", "hidden bd:block"][
                  index
                ]
              }
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
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
          <option value="favorite">좋아요순</option>
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
                onClick={() => setPage(groupStart - 1)}
                disabled={currentGroup === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 disabled:opacity-40"
              >
                <Image
                  src={ARROW_LEFT_ICON}
                  alt="이전"
                  width={16}
                  height={16}
                />
              </button>
              {Array.from(
                { length: groupEnd - groupStart + 1 },
                (_, i) => groupStart + i
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium border transition-colors ${
                    p === page
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(groupEnd + 1)}
                disabled={groupEnd === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 disabled:opacity-40"
              >
                <Image
                  src={ARROW_RIGHT_ICON}
                  alt="다음"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
