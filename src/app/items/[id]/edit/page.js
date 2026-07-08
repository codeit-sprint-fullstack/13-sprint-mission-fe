'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import ProductForm from '@/app/components/ProductForm';
import { getProduct, updateProduct } from '@/lib/products';

export default function ProductEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch(() => router.replace('/items'));
  }, [id, router]);

  async function handleSubmit(values) {
    await updateProduct(id, values);
    router.push('/items');
  }

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
      <main className="mx-auto max-w-[1120px] px-6 py-10">
        <ProductForm
          initial={product}
          onSubmit={handleSubmit}
          heading="상품 수정"
          submitLabel="수정"
        />
      </main>
    </div>
  );
}
