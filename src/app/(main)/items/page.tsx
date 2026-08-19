"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, addFavorite, removeFavorite } from "@/api/product";
import type { ProductListItem, ProductOrderBy } from "@/types/product";
import type { ListResponse } from "@/types/api";
import BestSection from "./_components/BestSection";
import ProductListSection from "./_components/ProductListSection";

export default function ItemsPage() {
  const [bestCount, setBestCount] = useState(4);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState<ProductOrderBy>("recent");
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setBestCount(4);
        setPageSize(10);
      } else if (width >= 744) {
        setBestCount(2);
        setPageSize(6);
      } else {
        setBestCount(1);
        setPageSize(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: bestData } = useQuery({
    queryKey: ["products", "best", bestCount],
    queryFn: () => getProducts({ page: 1, pageSize: bestCount, orderBy: "like" }),
  });

  const { data: listData, isLoading } = useQuery({
    queryKey: ["products", "list", page, pageSize, orderBy, keyword],
    queryFn: () => getProducts({ page, pageSize, orderBy, keyword }),
    refetchInterval: 1000 * 60,
  });

  const bestProducts = bestData?.list ?? [];
  const products = listData?.list ?? [];
  const totalCount = listData?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setPage(1);
  };
  const handleOrderChange = (value: ProductOrderBy) => {
    setOrderBy(value);
    setPage(1);
  };

  const toggleLike = async (id: number, isLiked: boolean) => {
    try {
      const updated = isLiked ? await removeFavorite(id) : await addFavorite(id);

      const updateList = (data: ListResponse<ProductListItem> | undefined) => {
        if (!data) return data;
        return {
          ...data,
          list: data.list.map((p) =>
            p.id === id ? { ...p, isLiked: !isLiked, likeCount: updated.likeCount } : p,
          ),
        };
      };

      queryClient.setQueryData(["products", "best", bestCount], updateList);
      queryClient.setQueryData(["products", "list", page, pageSize, orderBy, keyword], updateList);
    } catch {}
  };

  return (
    <main className="mx-auto flex max-w-[1200px] flex-col gap-6 pb-10 md:gap-10 md:px-6">
      <BestSection items={bestProducts} onToggleLike={toggleLike} />
      {isLoading ? (
        <p className="text-center text-gray-400">불러오는 중...</p>
      ) : (
        <ProductListSection
          products={products}
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          orderBy={orderBy}
          onOrderChange={handleOrderChange}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          onToggleLike={toggleLike}
        />
      )}
    </main>
  );
}