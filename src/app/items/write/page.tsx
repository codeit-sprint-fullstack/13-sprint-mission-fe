'use client';

import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import ProductForm from '@/app/components/ProductForm';
import { createProduct } from '@/lib/products';
import type { ProductCreateInput } from '@/types';

export default function ProductWritePage() {
  const router = useRouter();

  async function handleSubmit(values: ProductCreateInput) {
    await createProduct(values);
    router.push('/items');
  }

  return (
    <div className="min-h-screen bg-white">
      <Header active="market" />
      <main className="mx-auto max-w-[1120px] px-6 py-10">
        <ProductForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
