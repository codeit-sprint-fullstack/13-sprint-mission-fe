'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import ArticleImage from '@/app/components/ArticleImage';
import { getProduct, getProductImageUrl } from '@/lib/products';

function formatPrice(price) {
  return Number(price ?? 0).toLocaleString('ko-KR');
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch(() => router.replace('/items'));
  }, [id, router]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header active="market" />
        <p className="py-20 text-center text-sm text-[#9CA3AF]">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header active="market" />
      <main className="mx-auto max-w-[1120px] px-6 py-8">
        <div className="mb-6 text-sm text-[#9CA3AF]">
          <Link href="/items" className="transition-colors hover:text-[#3692FF]">← 목록</Link>
        </div>

        <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold text-[#1F2937]">{product.name}</h1>
            <Link
              href={`/items/${id}/edit`}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              수정
            </Link>
          </div>

          <div className="mt-3 flex items-center justify-between border-b border-slate-100 pb-4 text-sm text-[#6B7280]">
            <strong className="text-xl text-[#1F2937]">{formatPrice(product.price)}원</strong>
            <span>♡ {product.likeCount ?? product.favoriteCount ?? 0}</span>
          </div>

          <ArticleImage
            src={getProductImageUrl(product)}
            alt={product.name}
            width={720}
            height={720}
            className="mt-5 w-full rounded-xl object-cover"
          />

          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#F3F4F6] px-3 py-1 text-sm text-[#6B7280]">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
            {product.description}
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
