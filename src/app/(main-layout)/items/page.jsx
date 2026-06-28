"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/lib/productService";

export default function ProductListPage() {
  // 🚀 1. 리액트 쿼리로 상품 목록 데이터 낚아채기
  const {
    data: productsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

  // 로딩 상태 처리
  if (isPending) {
    return (
      <div className="mt-20 text-center text-lg text-gray-500 font-medium">
        상품 목록을 불러오는 중입니다...
      </div>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return (
      <div className="mt-20 text-center text-lg text-red-500 font-medium">
        상품 목록을 불러오는 데 실패했습니다.
      </div>
    );
  }

  // 백엔드 응답 구조에 맞게 알맹이 배열 추출 (예: productsData.list 또는 productsData 전체)
  const products = productsData?.list || productsData || [];

  return (
    <main className="mt-20 flex flex-col justify-center items-center gap-10 mb-30 w-full">
      <section className="flex flex-col gap-6 max-w-[1200px] w-[344px] md:w-[696px] lg:w-[1200px]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">📢 상품 목록</h1>

        {/* 🛍️ 상품 리스트 영역 */}
        <div className="flex flex-col gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              /* 🌟 핵심: Link 태그로 감싸서 누르면 우리가 열심히 만든 상세 페이지(/items/ID)로 이동! */
              <Link
                key={product.id}
                href={`/items/${product.id}`}
                className="block"
              >
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:border-primary-100 transition-colors cursor-pointer">
                  {/* 요청한 대로 div 안에 상품 이름만 깔끔하게 노출 */}
                  <div className="text-lg font-medium text-gray-800">
                    {product.name || product.title}
                  </div>

                  {/* 상세 페이지로 이동 유도하는 심플한 버튼 디자인 */}
                  <div className="text-sm bg-primary-100 text-white px-4 py-2 rounded-lg font-semibold">
                    상세보기 👉
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400 text-sm py-10">
              등록된 상품이 없습니다.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
