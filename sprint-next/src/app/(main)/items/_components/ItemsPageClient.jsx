"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";
import { clientApi } from "@/services/clientApiService";
import Pagination from "@/components/ui/Pagination";
import SortDropdown from "@/components/ui/SortDropdown";
import BestProductSection from "./BestProductSection";
import ProductCard from "./ProductCard";
import SearchForm from "./SearchForm";

const ORDER_BY = { RECENT: "recent", FAVORITE: "favorite" };

export default function ItemsPageClient() {
  const [orderBy, setOrderBy] = useState(ORDER_BY.RECENT);
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", { page: currentPage, orderBy, keyword }],
    queryFn: () => getProducts({ page: currentPage, orderBy, pageSize: 10, keyword }),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  const { data: bestData } = useQuery({
    queryKey: ["products", "best"],
    queryFn: () => getProducts({ page: 1, orderBy: ORDER_BY.FAVORITE, pageSize: 4 }),
    staleTime: 5 * 60 * 1000,
  });

  const productList = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;
  const bestList = bestData?.list ?? [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(inputValue);
    setCurrentPage(1);
  };

  const handleOrderByChange = (value) => {
    setOrderBy(value);
    setCurrentPage(1);
  };

  const prefetchProduct = (productId) => {
    queryClient.prefetchQuery({
      queryKey: ["product", String(productId)],
      queryFn: () => clientApi.get(`/products/${productId}`),
      staleTime: 60 * 1000,
    });
  };

  return (
    <section className="px-4 md:px-6 lg:px-20 pb-20">
      <BestProductSection products={bestList} />

      <div className="flex items-center mt-12">
        <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap">판매 중인 상품</h2>

        <div className="hidden md:flex items-center gap-3 ml-auto">
          <div className="min-w-[18rem]">
            <SearchForm
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSubmit={handleSubmit}
            />
          </div>
          <button
            onClick={() => router.push("/items/registration")}
            className="bg-primary-100 hover:bg-primary-200 text-white text-sm font-medium px-5 py-2.5 rounded-lg whitespace-nowrap transition-colors"
          >
            상품 등록하기
          </button>
          <SortDropdown value={orderBy} onChange={handleOrderByChange} />
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
          <SearchForm
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSubmit={handleSubmit}
          />
        </div>
        <SortDropdown value={orderBy} onChange={handleOrderByChange} />
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
        pageSize={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
