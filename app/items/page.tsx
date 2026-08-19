"use client";

import { useState, type KeyboardEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../src/api/productApi";
import ProductCard from "../../src/components/ProductCard";
import Pagination from "../../src/components/Pagination";
import type { PaginatedResponse } from "../../src/types/pagination";
import type { ProductListItem, ProductSortOption } from "../../src/types/product";

export default function ItemsPage() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState<ProductSortOption>("recent");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: bestData } = useQuery<PaginatedResponse<ProductListItem> | null, Error>({
    queryKey: ["best-products"],
    queryFn: () => getProducts({ page: 1, limit: 4, sort: "favorite" }),
  });
  const bestProducts = bestData?.list || [];

  const { data, isLoading, isError } = useQuery<PaginatedResponse<ProductListItem> | null, Error>({
    queryKey: ["products", page, keyword, sort],
    queryFn: () => getProducts({ page, limit, keyword, sort }),
  });

  const products = data?.list || [];
  const totalPages = Math.ceil((data?.totalCount ?? 0) / limit) || 1;

  function handleSearch(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setKeyword(searchText);
      setPage(1);
    }
  }

  function handleSortChange(e: ChangeEvent<HTMLSelectElement>) {
    setSort(e.target.value as ProductSortOption);
    setPage(1);
  }

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-8">
      <section className="mb-10">
        <h2 className="mb-5 text-xl font-bold text-gray-800">베스트 상품</h2>
        {bestProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {bestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-6 text-center text-gray-400">
            베스트 상품이 없습니다.
          </p>
        )}
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-800">판매 중인 상품</h2>

          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:flex-wrap">
            <div className="flex h-[42px] flex-1 items-center gap-2 rounded-xl bg-gray-100 px-4 md:min-w-[280px]">
              <span>🔍</span>
              <input
                className="w-full bg-transparent text-[15px] outline-none"
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>

            <button
              className="h-[42px] rounded-lg bg-panda-primary px-5 font-semibold text-white transition hover:bg-panda-hover active:bg-panda-active"
              type="button"
              onClick={() => router.push("/registration")}
            >
              상품 등록하기
            </button>

            <select
              className="h-[42px] rounded-xl border border-gray-200 bg-white px-4 text-[15px]"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="py-10 text-center text-gray-400">
            상품을 불러오는 중입니다...
          </div>
        ) : isError ? (
          <div className="py-10 text-center text-red-400">
            상품을 불러오지 못했습니다.
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-400">
            등록된 상품이 없습니다.
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </section>
    </main>
  );
}
