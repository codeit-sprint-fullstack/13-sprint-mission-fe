"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ProductCard from "@/components/product/ProductCard";
import { productApi } from "@/lib/api";
import { queryKeys } from "@/lib/queries";

const shellClass =
  "mx-auto w-[min(100%-32px,640px)] tablet:w-[min(100%-48px,900px)] desktop:w-[min(100%-48px,1120px)]";

export default function ItemsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [draftKeyword, setDraftKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const pageSize = 10;

  const productsQuery = useQuery({
    queryKey: queryKeys.products(page, orderBy, keyword),
    queryFn: () => productApi.list({ page, pageSize, orderBy, keyword }),
    refetchInterval: 1000 * 30,
  });

  const bestProductsQuery = useQuery({
    queryKey: queryKeys.products(1, "favorite", ""),
    queryFn: () =>
      productApi.list({ page: 1, pageSize: 4, orderBy: "favorite" }),
    staleTime: 1000 * 60 * 5,
  });

  const totalPages = useMemo(
    () =>
      Math.max(1, Math.ceil((productsQuery.data?.totalCount || 0) / pageSize)),
    [productsQuery.data?.totalCount],
  );

  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: queryKeys.products(page + 1, orderBy, keyword),
        queryFn: () =>
          productApi.list({ page: page + 1, pageSize, orderBy, keyword }),
      });
    }
  }, [keyword, orderBy, page, queryClient, totalPages]);

  useEffect(() => {
    const firstProduct =
      productsQuery.data?.list[0] || bestProductsQuery.data?.list[0];

    if (firstProduct) {
      queryClient.prefetchQuery({
        queryKey: queryKeys.product(firstProduct.id),
        queryFn: () => productApi.detail(firstProduct.id),
      });
    }
  }, [bestProductsQuery.data?.list, productsQuery.data?.list, queryClient]);

  const search = (event) => {
    event.prevenDefault();
    setPage(1);
    setKeyword(draftKeyword.trim());
  };

  return (
    <div className="bg-white text-[#1f2937">
      <Header />
      <main
        className={`${shellClass} min-h-[calc(100vh-170px)] pb-[90px] pt-8`}
      >
        <section>
          <h1 className="mb-[18px] text-xl font-bold">베스트 상품</h1>
          {bestProductsQuery.isLoading ? (
            <div className="rounded-lg bg-[#f3f4f6] p-[18px] text-[#6b7280]">
              상품을 불러오는 중...
            </div>
          ) : null}
          {bestProductsQuery.isError ? (
            <p className="rounded-lg bg-red-50 p-[18px] text-red-700">
              베스트 상품을 불러오지 못했어요.
            </p>
          ) : null}
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-7 tablet:grid-cols-2 desktop:grid-cols-4 desktop:gap-x-5 desktop:gap-y-9">
            {bestProductsQuery.data?.list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-11">
          <div className="mb-[22px] flex flex-col items-stretch gap-6 desktop:flex-row desktop:items-center desktop:justify-between">
            <h2 className="mb-[18px] text-xl font-bold desktop:mb-0">
              판매 중인 상품
            </h2>
            <div className="flex flex-col items-stretch gap-3 desktop:flex-row desktop:items-center">
              <form
                className="relative h-[42px] w-full rounded-lg bg-[#f3f4f6] text-gray-400 desktop:w-[min(320px,32vw)]"
                onSubmit={search}
              >
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2"
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <input
                  className="h-full w-full border-0 bg-transparent pl-11 pr-3.5 text-[15px] leading-[42px] outline-none placeholder:text-gray-400"
                  value={draftKeyword}
                  onChange={(event) => setDraftKeyword(event.target.value)}
                  placeholder="검색할 상품을 입력해주세요"
                />
              </form>
              <button
                className="inline-flex min-h-[42px] items-center justify-center rounded-lg bg-[#3692ff] px-[18px] font-bold text-white"
                type="button"
              >
                상품 등록하기
              </button>
              <label className="relative inline-flex w-full items-center desktop:w-auto">
                <select
                  className="h-[42px] w-full appearance-none rounded-lg border border-[#e5e7eb] bg-white pl-4 pr-[38px] font-bold"
                  value={orderBy}
                  onChange={(event) => {
                    (setPage(1), setOrderBy(event.target.value));
                  }}
                >
                  <option value="recent">최신순</option>
                  <option value="favorite">좋아요순</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5"
                  size={16}
                />
              </label>
            </div>
          </div>

          {productsQuery.isLoading ? (
            <div className="rounded-lg bg-[#f3f4f6] p-[18px] text-[#6b7280]">
              상품을 불러오는 중...
            </div>
          ) : null}
          {productsQuery.isError ? (
            <p className="rounded-lg bg-red-50 p-[18px] text-red-700">
              상품 목록을 불러오지 못했어요.
            </p>
          ) : null}
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-7 tablet:grid-cols-3 desktop:grid-cols-5 desktop:gap-x-5 desktop:gap-y-9">
            {productsQuery.data?.list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-11 flex justify-center gap-2">
            <button
              className="h-8 w-8 rounded-full border border-[#e5e7eb] bg-white text-gray-600"
              type="button"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              <ChevronLeft size={16} className="mx-auto" />
            </button>
            {Array.from(
              { length: Math.min(totalPages, 5) },
              (_, index) => index + 1,
            ).map((pageNumber) => (
              <button
                className={`h-8 w-8 rounded-full border ${page === pageNumber ? "border-[#3692ff] bg-[#3692ff] tet-white" : "border-[#e5e7eb] bg-white text-gray-600"}`}
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className="h-8 w-8 rounded-full border border-[#e5e7eb] bg-white text-gray-600"
              type="button"
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
            >
              <ChevronRight size={16} className="mx-auto" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
