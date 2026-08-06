'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ArticleImage from '@/app/components/ArticleImage';
import { getProductImageUrl, getProducts } from '@/lib/products';
import type { Product, ProductOrderBy } from '@/types';

function formatPrice(price?: number): string {
  return Number(price ?? 0).toLocaleString('ko-KR');
}

export default function ItemsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderBy, setOrderBy] = useState<ProductOrderBy>('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts({ pageSize: 10, orderBy })
      .then((data) => {
        setProducts(data.list ?? []);
        setError('');
      })
      .catch((fetchError) => {
        console.error(fetchError);
        setError('상품을 불러오지 못했습니다.');
      })
      .finally(() => setIsLoading(false));
  }, [orderBy]);

  function handleOrderChange(event: ChangeEvent<HTMLSelectElement>) {
    setIsLoading(true);
    setOrderBy(event.target.value as ProductOrderBy);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header active="market" />
      <main className="mx-auto max-w-[1120px] px-6 py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#1F2937]">중고마켓</h1>
          <div className="flex items-center gap-3">
            <select
              value={orderBy}
              onChange={handleOrderChange}
              className="h-12 rounded-xl border border-[#E5E7EB] bg-white px-4 text-base font-medium text-[#1F2937]"
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
            <Link
              href="/items/write"
              className="flex h-12 w-[88px] items-center justify-center rounded-lg bg-[#3692FF] text-base font-semibold text-white transition-colors hover:bg-blue-600"
            >
              등록
            </Link>
          </div>
        </div>

        {isLoading ? (
          <p className="py-20 text-center text-sm text-[#9CA3AF]">불러오는 중...</p>
        ) : error ? (
          <p role="alert" className="py-20 text-center text-sm text-rose-500">{error}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {products.map((product) => (
              <Link key={product.id} href={`/items/${product.id}`} className="group block">
                <ArticleImage
                  src={getProductImageUrl(product)}
                  alt={product.name}
                  width={240}
                  height={240}
                  className="aspect-square w-full rounded-xl object-cover ring-1 ring-slate-100"
                />
                <h2 className="mt-3 line-clamp-1 text-base font-semibold text-[#1F2937]">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm font-bold text-[#1F2937]">
                  {formatPrice(product.price)}원
                </p>
                <p className="mt-1 text-sm text-[#6B7280]">
                  ♡ {product.likeCount ?? product.favoriteCount ?? 0}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
