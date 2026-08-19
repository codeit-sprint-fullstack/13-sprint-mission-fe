"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/services/itemService";
import SearchBar from "@/components/common/SearchBar";
import ItemCard from "./ItemCard";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";
import { MARKET_ITEM_OPTIONS } from "@/constants/dropdownOption";
import { ItemListResponse } from "@/types";

interface InitialFilters {
  page?: number;
  sort?: string;
  keyword?: string;
}

interface ItemListPageProps {
  initialFilters?: InitialFilters;
}

export default function ItemListPage({
  initialFilters = {},
}: ItemListPageProps) {
  const [currentPage, setCurrentPage] = useState(initialFilters.page ?? 1);
  const [sort, setSort] = useState(initialFilters.sort ?? "recent");
  const [keyword, setKeyword] = useState(initialFilters.keyword ?? "");

  const { data: bestItemsData } = useQuery<ItemListResponse, Error>({
    queryKey: ["bestItems"],
    queryFn: () => getItems({ page: 1, pageSize: 4, sort: "favorite" }),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: itemsData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["items", { page: currentPage, sort, keyword }],
    queryFn: () => getItems({ page: currentPage, pageSize: 10, sort, keyword }),
    staleTime: 1000 * 10,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
  });

  const bestItems = bestItemsData?.list || [];
  const items = itemsData?.list || [];
  const totalCount = itemsData?.totalCount || 0;
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-secondary-500 animate-pulse text-lg font-semibold">
          상품 데이터를 로딩 중입니다...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-lg font-bold text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
        <p className="text-secondary-600 text-sm">{error?.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="m-auto mt-6.5 flex w-full max-w-300 flex-col items-start gap-10 px-4">
        {bestItems.length > 0 && (
          <section className="flex w-full flex-col items-start gap-4">
            <h2 className="text-secondary-900 text-xl font-bold">
              베스트 상품
            </h2>
            <div className="grid w-full grid-cols-4 gap-4">
              {bestItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        <section className="flex w-full flex-col items-start gap-6">
          <div className="flex h-6 w-full items-center justify-between">
            <h2 className="text-secondary-900 text-xl font-bold whitespace-nowrap">
              판매 중인 상품
            </h2>
            <div className="flex items-center gap-3">
              <SearchBar
                className="w-81.25"
                currentKeyword={keyword}
                placeholder="검색할 상품을 입력해주세요"
                onSearch={(val) => {
                  setKeyword(val);
                  setCurrentPage(1);
                }}
              />
              <Button
                variant="primary"
                rounded="square"
                size="small"
                className="whitespace-nowrap"
              >
                상품 등록하기
              </Button>
              <Dropdown
                options={MARKET_ITEM_OPTIONS}
                value={sort}
                onChange={(val) => {
                  setSort(val);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div
            className={`w-full transition-opacity duration-200 ${isFetching ? "opacity-70" : "opacity-100"}`}
          >
            {items.length === 0 ? (
              <div className="text-secondary-500 w-full py-20 text-center">
                등록된 상품이 없습니다.
              </div>
            ) : (
              <div className="grid w-full grid-cols-5 gap-6">
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
