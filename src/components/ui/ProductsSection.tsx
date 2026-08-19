"use client";

import { getProducts, Product } from "@/lib/ProductApi";
import { useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";
import Products from "./Products";

export default function ProductsSection({
  orderBy,
  keyword,
  page,
  pageSize,
}: {
  orderBy: string;
  keyword: string;
  page: number;
  pageSize: number;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", orderBy, keyword, page],
    queryFn: () => getProducts(orderBy, keyword, page),
  });

  const products = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  if (isLoading) return <p className="mt-6 text-gray-400">불러오는 중...</p>;

  if (isError)
    return (
      <p className="mt-6 text-red-400">
        목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
      </p>
    );

  return (
    <>
      <section className="grid grid-cols-5 gap-6 mt-6 mb-10.5">
        {products.map((p: Product) => (
          <Products key={p.id} post={p} />
        ))}
      </section>
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </>
  );
}
