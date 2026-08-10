'use client';

import {
  useEffect,
  useState,
  type FormEvent,
} from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import { getProducts } from '@/lib/products';
import type { Product, ProductOrderBy } from '@/types';
import ProductCard from './ProductCard';
import {
  createItemsUrl,
  getItemsPageNormalizationUrl,
  getTotalPages,
  getVisiblePages,
  parseProductListState,
  PRODUCT_PAGE_SIZE,
} from './product-list-state';

const BEST_PRODUCT_COUNT = 4;

interface SearchControlsProps {
  initialKeyword: string;
  orderBy: ProductOrderBy;
  onSearch: (keyword: string) => void;
  onOrderChange: (orderBy: ProductOrderBy) => void;
}

function SearchControls({
  initialKeyword,
  orderBy,
  onSearch,
  onOrderChange,
}: SearchControlsProps) {
  const [searchInput, setSearchInput] = useState(initialKeyword);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(searchInput);
  }

  return (
    <form className="mb-6 flex gap-3" role="search" onSubmit={handleSubmit}>
      <div className="relative flex-1">
        <label htmlFor="product-search" className="sr-only">
          상품 검색
        </label>
        <svg
          aria-hidden="true"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="product-search"
          type="search"
          placeholder="검색할 상품을 입력해주세요"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="h-12 w-full rounded-xl border-0 bg-[#F3F4F6] py-3 pl-10 pr-4 text-base text-[#1F2937] placeholder:text-[#9CA3AF] transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3692FF]"
        />
      </div>
      <button
        type="submit"
        className="h-12 shrink-0 rounded-lg bg-[#3692FF] px-5 text-base font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[#3692FF] focus:ring-offset-2"
      >
        검색
      </button>
      <label htmlFor="product-order" className="sr-only">
        상품 정렬
      </label>
      <select
        id="product-order"
        value={orderBy}
        onChange={(event) => onOrderChange(event.target.value as ProductOrderBy)}
        className="h-12 rounded-xl border border-[#E5E7EB] bg-white px-4 text-base font-medium text-[#1F2937] transition focus:border-[#3692FF] focus:outline-none focus:ring-2 focus:ring-[#3692FF]"
      >
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
    </form>
  );
}

export default function ItemsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { keyword, orderBy, page } = parseProductListState(searchParams);

  const [bestProducts, setBestProducts] = useState<Product[]>([]);
  const [isBestLoading, setIsBestLoading] = useState(true);
  const [bestError, setBestError] = useState('');

  const requestKey = createItemsUrl({ keyword, orderBy, page });
  const [productResult, setProductResult] = useState<{
    requestKey: string | null;
    products: Product[];
    totalCount: number;
    error: string;
  }>({ requestKey: null, products: [], totalCount: 0, error: '' });
  const isLoading = productResult.requestKey !== requestKey;
  const { products, totalCount, error } = productResult;

  useEffect(() => {
    let cancelled = false;

    getProducts({ pageSize: BEST_PRODUCT_COUNT, orderBy: 'favorite' })
      .then((data) => {
        if (cancelled) return;
        setBestProducts(data.list ?? []);
        setBestError('');
      })
      .catch((fetchError: unknown) => {
        if (cancelled) return;
        console.error(fetchError);
        setBestError('베스트 상품을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      })
      .finally(() => {
        if (!cancelled) setIsBestLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    getProducts({ page, pageSize: PRODUCT_PAGE_SIZE, keyword, orderBy })
      .then((data) => {
        if (cancelled) return;
        const normalizationUrl = getItemsPageNormalizationUrl(
          { keyword, orderBy, page },
          data.totalCount ?? 0,
        );

        if (normalizationUrl) {
          router.replace(normalizationUrl);
          return;
        }

        setProductResult({
          requestKey,
          products: data.list ?? [],
          totalCount: data.totalCount ?? 0,
          error: '',
        });
      })
      .catch((fetchError: unknown) => {
        if (cancelled) return;
        console.error(fetchError);
        setProductResult({
          requestKey,
          products: [],
          totalCount: 0,
          error: '상품을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
        });
      });

    return () => {
      cancelled = true;
    };
  }, [keyword, orderBy, page, requestKey, router]);

  const totalPages = getTotalPages(totalCount);
  const visiblePages = getVisiblePages(page, totalPages);

  function navigateToPage(nextPage: number) {
    router.push(createItemsUrl({ keyword, orderBy, page: nextPage }));
  }

  function handleSearch(nextKeyword: string) {
    router.push(createItemsUrl({ keyword: nextKeyword, orderBy, page: 1 }));
  }

  function handleOrderChange(nextOrderBy: ProductOrderBy) {
    router.push(createItemsUrl({ keyword, orderBy: nextOrderBy, page: 1 }));
  }

  return (
    <div className="min-h-screen bg-white">
      <Header active="market" />

      <main className="mx-auto max-w-[1120px] px-6 py-8">
        <section className="mb-10" aria-labelledby="best-products-heading">
          <h1 id="best-products-heading" className="mb-5 text-xl font-bold text-[#1F2937]">
            베스트 상품
          </h1>
          {isBestLoading ? (
            <p role="status" className="py-12 text-center text-sm text-[#9CA3AF]">
              베스트 상품을 불러오는 중...
            </p>
          ) : bestError ? (
            <p role="alert" className="py-12 text-center text-sm text-rose-500">
              {bestError}
            </p>
          ) : bestProducts.length === 0 ? (
            <p className="py-12 text-center text-sm text-[#9CA3AF]">
              아직 베스트 상품이 없습니다.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {bestProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < BEST_PRODUCT_COUNT}
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              ))}
            </div>
          )}
        </section>

        <div className="mb-5 mt-12 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-[#1F2937]">전체 상품</h2>
          <Link
            href="/items/write"
            className="flex h-12 w-[88px] shrink-0 items-center justify-center rounded-lg bg-[#3692FF] text-base font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[#3692FF] focus:ring-offset-2"
          >
            등록
          </Link>
        </div>

        <SearchControls
          key={keyword}
          initialKeyword={keyword}
          orderBy={orderBy}
          onSearch={handleSearch}
          onOrderChange={handleOrderChange}
        />

        <section aria-label="상품 목록">
          {isLoading ? (
            <p role="status" className="py-20 text-center text-sm text-[#9CA3AF]">
              불러오는 중...
            </p>
          ) : error ? (
            <p role="alert" className="py-20 text-center text-sm text-rose-500">
              {error}
            </p>
          ) : products.length === 0 ? (
            <p className="py-20 text-center text-sm text-[#9CA3AF]">
              {keyword
                ? `“${keyword}”에 대한 상품이 없습니다.`
                : '아직 등록된 상품이 없습니다.'}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                />
              ))}
            </div>
          )}
        </section>

        {!isLoading && !error && totalPages >= 2 && (
          <nav className="mt-10 flex justify-center gap-2" aria-label="상품 목록 페이지">
            <button
              type="button"
              onClick={() => navigateToPage(page - 1)}
              disabled={page <= 1}
              aria-label="이전 페이지"
              className="h-10 rounded-lg border border-[#E5E7EB] px-4 text-sm font-medium text-[#374151] transition-colors hover:border-[#3692FF] hover:text-[#3692FF] disabled:cursor-not-allowed disabled:opacity-40"
            >
              이전
            </button>
            {visiblePages.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => navigateToPage(pageNumber)}
                aria-current={pageNumber === page ? 'page' : undefined}
                aria-label={`${pageNumber}페이지`}
                className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition-colors ${
                  pageNumber === page
                    ? 'border-[#3692FF] bg-[#3692FF] text-white'
                    : 'border-[#E5E7EB] text-[#374151] hover:border-[#3692FF] hover:text-[#3692FF]'
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              onClick={() => navigateToPage(page + 1)}
              disabled={page >= totalPages}
              aria-label="다음 페이지"
              className="h-10 rounded-lg border border-[#E5E7EB] px-4 text-sm font-medium text-[#374151] transition-colors hover:border-[#3692FF] hover:text-[#3692FF] disabled:cursor-not-allowed disabled:opacity-40"
            >
              다음
            </button>
          </nav>
        )}
      </main>

      <Footer />
    </div>
  );
}
