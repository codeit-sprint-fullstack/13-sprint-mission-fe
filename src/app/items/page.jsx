"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/app/lib/api";
import Pagination from "@/app/components/common/Pagination";
import icSearch from "@/app/assets/images/icons/ic_search.svg";
import icArrowDown from "@/app/assets/images/icons/ic_arrow_down.svg";
import icHeart from "@/app/assets/images/icons/ic_heart.svg";
import defaultImage from "@/app/assets/images/default.svg";

const PAGE_SIZE = 10;
const BEST_PRODUCTS_SIZE = 4;
const REFRESH_INTERVAL = 1000 * 30;

const sortOptions = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "favorite" },
];

const formatPrice = (price) => `${Number(price || 0).toLocaleString()}원`;

const getProducts = async ({ page, pageSize, orderBy, keyword }) => {
  const response = await api.get("/products", {
    params: {
      page,
      pageSize,
      orderBy,
      keyword: keyword || undefined,
    },
  });

  return response.data;
};

const getProductList = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.list)) {
    return data.list;
  }

  if (Array.isArray(data?.products)) {
    return data.products;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
};

const getTotalCount = (data, fallbackCount) => {
  if (typeof data?.totalCount === "number") {
    return data.totalCount;
  }

  if (typeof data?.total === "number") {
    return data.total;
  }

  return fallbackCount;
};

const isValidImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return false;
  }

  if (imageUrl.includes("...")) {
    return false;
  }

  return imageUrl.startsWith("http://") || imageUrl.startsWith("https://");
};

function ProductImage({ product }) {
  const imageUrl = product.images?.[0];

  if (isValidImageUrl(imageUrl)) {
    return (
      <div
        className="aspect-square w-full rounded-lg bg-panda-100 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={product.name}
      />
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-panda-100">
      <Image
        src={defaultImage}
        alt={product.name}
        fill
        className="object-cover"
        sizes="(max-width: 743px) 45vw, (max-width: 1199px) 30vw, 220px"
      />
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link href={`/items/${product.id}`} className="group block min-w-0">
      <ProductImage product={product} />
      <div className="mt-3 min-w-0">
        <h3 className="truncate text-sm font-medium text-panda-900">
          {product.name}
        </h3>
        <p className="mt-1 text-base font-bold text-panda-900">
          {formatPrice(product.price)}
        </p>
        <div className="mt-1 flex items-center gap-1 text-xs text-panda-600">
          <Image src={icHeart} alt="좋아요" width={14} height={14} />
          <span>{product.favoriteCount || 0}</span>
        </div>
      </div>
    </Link>
  );
}

function ProductGridSkeleton({ count = 10 }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <div key={`product-skeleton-${index}`} className="animate-pulse">
          <div className="aspect-square rounded-lg bg-panda-200" />
          <div className="mt-3 h-4 w-4/5 rounded bg-panda-200" />
          <div className="mt-2 h-5 w-2/3 rounded bg-panda-200" />
          <div className="mt-2 h-3 w-1/3 rounded bg-panda-200" />
        </div>
      ))}
    </div>
  );
}

export default function ItemsPage() {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const bestProductsQuery = useQuery({
    queryKey: ["products", "best", BEST_PRODUCTS_SIZE],
    queryFn: () =>
      getProducts({
        page: 1,
        pageSize: BEST_PRODUCTS_SIZE,
        orderBy: "favorite",
      }),
    staleTime: 1000 * 60,
    refetchInterval: REFRESH_INTERVAL,
  });

  const productsQuery = useQuery({
    queryKey: ["products", { currentPage, keyword, orderBy, pageSize: PAGE_SIZE }],
    queryFn: () =>
      getProducts({
        page: currentPage,
        pageSize: PAGE_SIZE,
        orderBy,
        keyword,
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 10,
    refetchInterval: REFRESH_INTERVAL,
    refetchOnWindowFocus: true,
  });

  const bestProducts = getProductList(bestProductsQuery.data);
  const products = getProductList(productsQuery.data);
  const totalCount = getTotalCount(productsQuery.data, products.length);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const selectedSortLabel =
    sortOptions.find((option) => option.value === orderBy)?.label || "최신순";

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (nextOrderBy) => {
    setOrderBy(nextOrderBy);
    setCurrentPage(1);
    setIsSortOpen(false);
  };

  return (
    <div className="w-full pb-20">
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-bold text-panda-900 md:text-xl">
          베스트 상품
        </h2>

        {bestProductsQuery.isLoading ? (
          <ProductGridSkeleton count={BEST_PRODUCTS_SIZE} />
        ) : bestProductsQuery.isError ? (
          <div className="rounded-lg bg-white py-12 text-center text-sm font-medium text-red-500">
            베스트 상품을 불러오지 못했습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {bestProducts.map((product) => (
              <ProductCard key={`best-product-${product.id}`} product={product} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-panda-900 md:text-xl">
              판매 중인 상품
            </h2>
            <Link
              href="/items/write"
              className="flex h-11 shrink-0 items-center justify-center rounded-lg bg-brand-blue px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-hover md:px-5"
            >
              상품 등록하기
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative min-w-0 flex-1 md:max-w-[325px]">
              <Image
                src={icSearch}
                alt="검색"
                width={20}
                height={20}
                className="absolute left-4 top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="검색할 상품을 입력해주세요"
                className="h-11 w-full rounded-xl bg-panda-100 pl-11 pr-4 text-sm text-panda-900 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-brand-blue"
              />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen((prevIsSortOpen) => !prevIsSortOpen)}
                className="flex h-11 w-[112px] items-center justify-between gap-2 rounded-xl border border-panda-200 bg-white px-3 text-sm font-medium text-panda-900 transition-colors hover:bg-panda-50 md:w-[130px] md:px-4"
                aria-expanded={isSortOpen}
              >
                <span>{selectedSortLabel}</span>
                <Image
                  src={icArrowDown}
                  alt=""
                  width={16}
                  height={16}
                  className={isSortOpen ? "rotate-180 transition" : "transition"}
                />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 z-10 mt-2 w-[112px] overflow-hidden rounded-xl border border-panda-200 bg-white shadow-lg md:w-[130px]">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSortChange(option.value)}
                      className="block w-full px-4 py-3 text-left text-sm text-panda-900 transition-colors hover:bg-panda-100"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {productsQuery.isLoading ? (
          <ProductGridSkeleton />
        ) : productsQuery.isError ? (
          <div className="rounded-lg bg-white py-20 text-center">
            <p className="text-base font-semibold text-red-500">
              상품 목록을 불러오지 못했습니다.
            </p>
            <button
              type="button"
              onClick={() => productsQuery.refetch()}
              className="mt-4 h-10 rounded-lg bg-brand-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              다시 시도
            </button>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5 xl:grid-cols-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="rounded-lg bg-white py-20 text-center text-base font-medium text-panda-500">
            검색 결과가 없습니다.
          </div>
        )}
      </section>
    </div>
  );
}
