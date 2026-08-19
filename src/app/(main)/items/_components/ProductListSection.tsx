"use client";

import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import type { ProductListItem, ProductOrderBy } from "@/types/product";

interface ProductListSectionProps {
  products: ProductListItem[];
  keyword: string;
  onKeywordChange: (value: string) => void;
  orderBy: ProductOrderBy;
  onOrderChange: (value: ProductOrderBy) => void;
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  onToggleLike: (id: number, isLiked: boolean) => void;
}

export default function ProductListSection({
  products,
  keyword,
  onKeywordChange,
  orderBy,
  onOrderChange,
  totalPages,
  page,
  setPage,
  onToggleLike,
}: ProductListSectionProps) {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-2 md:gap-6">
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
        <SearchBar keyword={keyword} onKeywordChange={onKeywordChange} orderBy={orderBy} onOrderChange={onOrderChange} />
      </div>

      <div className="hidden md:flex md:items-center md:justify-between">
        <h2 className="text-[20px] font-bold">판매 중인 상품</h2>
        <SearchBar keyword={keyword} onKeywordChange={onKeywordChange} orderBy={orderBy} onOrderChange={onOrderChange} />
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 md:gap-x-4 md:gap-y-10 lg:grid-cols-5 lg:gap-x-6">
        {products?.map((item) => (
          <ProductCard key={item.id} item={item} onToggleLike={onToggleLike} />
        ))}
      </div>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </section>
  );
}