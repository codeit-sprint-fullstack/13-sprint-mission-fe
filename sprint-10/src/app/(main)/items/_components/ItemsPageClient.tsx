"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { productApi, ProductCard, type OrderBy } from "@/entities/product";
import Pagination from "@/shared/ui/Pagination";
import SortDropdown from "@/shared/ui/SortDropdown";
import SearchForm from "@/shared/ui/SearchForm";
import BestProductSection from "./BestProductSection";

const PAGE_SIZE = 10;

const SORT_OPTIONS = [
  { value: "recent", label: "최신순" },
  { value: "oldest", label: "오래된순" },
];

export default function ItemsPageClient() {
  const [orderBy, setOrderBy] = useState<OrderBy>("recent");
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", { page: currentPage, orderBy, keyword }],
    queryFn: () =>
      productApi.getProducts({ page: currentPage, orderBy, pageSize: PAGE_SIZE, keyword }),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  const { data: bestList = [] } = useQuery({
    queryKey: ["products", "best"],
    queryFn: () => productApi.getBestProducts(4),
    staleTime: 5 * 60 * 1000,
  });

  const productList = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(inputValue);
    setCurrentPage(1);
  };

  const handleOrderByChange = (value: string) => {
    setOrderBy(value as OrderBy);
    setCurrentPage(1);
  };

  const prefetchProduct = (productId: string) => {
    queryClient.prefetchQuery({
      queryKey: ["product", productId],
      queryFn: () => productApi.getProduct(productId),
      staleTime: 60 * 1000,
    });
  };

  return (
    <section className="px-4 md:px-6 lg:px-20 pb-20">
      <BestProductSection products={bestList} />

      <div className="flex items-center mt-12">
        <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap">판매 중인 상품</h2>

        <div className="hidden md:flex items-center gap-3 ml-auto">
          <div className="min-w-72">
            <SearchForm value={inputValue} onChange={handleInputChange} onSubmit={handleSubmit} />
          </div>
          <button
            onClick={() => router.push("/items/registration")}
            className="bg-primary-100 hover:bg-primary-200 text-white text-sm font-medium px-5 py-2.5 rounded-lg whitespace-nowrap transition-colors"
          >
            상품 등록하기
          </button>
          <SortDropdown value={orderBy} onChange={handleOrderByChange} options={SORT_OPTIONS} />
        </div>

        <button
          onClick={() => router.push("/items/registration")}
          className="md:hidden ml-auto bg-primary-100 hover:bg-primary-200 text-white text-sm font-medium px-5 py-2.5 rounded-lg whitespace-nowrap transition-colors"
        >
          상품 등록하기
        </button>
      </div>

      <div className="flex md:hidden items-center gap-2 mt-3">
        <div className="flex-1">
          <SearchForm value={inputValue} onChange={handleInputChange} onSubmit={handleSubmit} />
        </div>
        <SortDropdown value={orderBy} onChange={handleOrderByChange} options={SORT_OPTIONS} />
      </div>

      {isPending ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 mt-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </ul>
      ) : isError ? (
        <p className="text-center text-gray-500 mt-16">상품을 불러오지 못했습니다.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 mt-8">
          {productList.map((product, index) => (
            <li
              key={product.id}
              className={index < 4 ? "" : index < 6 ? "hidden md:block" : "hidden lg:block"}
              onMouseEnter={() => prefetchProduct(product.id)}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      <Pagination
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
