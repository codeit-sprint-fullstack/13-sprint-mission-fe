'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ArticleImage from '@/app/components/ArticleImage';
import { getProducts } from '@/lib/products';
import type { Product } from '@/types';

function formatPrice(price?: number): string {
  return Number(price ?? 0).toLocaleString('ko-KR');
}

export default function ItemsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts({ pageSize: 10, orderBy: 'recent' })
      .then((data) => {
        setProducts(data.list ?? []);
        setError('');
      })
      .catch((fetchError) => {
        console.error(fetchError);
        setError('상품을 불러오지 못했습니다.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header active="market" />
      <main className="mx-auto max-w-[1120px] px-6 py-10">
        <h1 className="mb-6 text-2xl font-bold text-[#1F2937]">중고마켓</h1>

        {isLoading ? (
          <p className="py-20 text-center text-sm text-[#9CA3AF]">불러오는 중...</p>
        ) : error ? (
          <p role="alert" className="py-20 text-center text-sm text-rose-500">{error}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {products.map((product) => (
              <article key={product.id} className="group">
                <ArticleImage
                  src={product.images?.[0]}
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
                  ♡ {product.favoriteCount ?? 0}
                </p>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
