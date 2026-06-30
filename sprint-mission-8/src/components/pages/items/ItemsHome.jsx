"use client";
import ProductItem from "@/components/ui/Item";
import { usePageSize } from "@/hooks/usePagesize";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const mockProduct = {
  name: "테스트 상품",
  price: 12000,
  image: "", // 빈 값 → DEFAULT_IMAGE로 폴백되는지 같이 확인
};

export default function ItemsHome() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [page, setPage] = useState(1);
  const pageSize = usePageSize();

  // 버그3 수정: effect 대신 렌더 중 조정
  const [prevPageSize, setPrevPageSize] = useState(pageSize);
  if (pageSize !== prevPageSize) {
    setPrevPageSize(pageSize);
    setPage(1);
  }

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", page, pageSize], // 버그2 수정: pageSize 포함
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&orderBy=recent`,
      );
      if (!res.ok) throw new Error("불러오기 실패");

      const data = await res.json(); // 버그1 수정: 한 번만 읽기
      return data;
    },
  });

  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생</p>;
  return (
    <div className="mx-auto max-w-300 p-4 pc:p-0">
      <div className="text-gray-900 text-xl font-bold">베스트 상품</div>
      <div className="mt-4 grid grid-cols-1 grid-rows-1 [grid-auto-rows:0] overflow-hidden gap-x-2 tablet:grid-cols-2 pc:grid-cols-4">
        {data.list.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className="flex mt-6">
        <div>판매중인 상품</div>
        <div className="flex">
          <div>검색창</div>
          <div>버튼</div>
          <div>드롭아웃</div>
        </div>
      </div>
    </div>
  );
}
