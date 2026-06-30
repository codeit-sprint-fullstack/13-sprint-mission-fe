"use client";

import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";

export default function ProductListSection({
  products,
  keyword,
  onKeywordChange,
  orderBy,
  onOrderChange,
  totalPages,
  page,
  setPage,
}) {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-2 md:gap-6">
      {/* 모바일 */}
      <div className="flex items-center justify-between pr-[45px] md:hidden">
        <h2 className="text-[20px] font-bold">판매 중인 상품</h2>
        <button
          onClick={() => router.push("/registration")}
          className="bg-primary-100 rounded-xl px-[23px] py-3 text-lg font-semibold whitespace-nowrap text-white"
        >
          상품 등록하기
        </button>
      </div>
      <div className="md:hidden">
        <SearchBar
          keyword={keyword}
          onKeywordChange={onKeywordChange}
          orderBy={orderBy}
          onOrderChange={onOrderChange}
        />
      </div>

      {/* 태블릿/PC */}
      <div className="hidden md:flex md:items-center md:justify-between">
        <h2 className="text-[20px] font-bold">판매 중인 상품</h2>
        <SearchBar
          keyword={keyword}
          onKeywordChange={onKeywordChange}
          orderBy={orderBy}
          onOrderChange={onOrderChange}
        />
      </div>

      {/* 상품 카드 그리드 */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 md:gap-x-4 md:gap-y-10 lg:grid-cols-5 lg:gap-x-6">
        {products?.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </section>
  );
}
