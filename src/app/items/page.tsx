import { Suspense } from 'react';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import ItemsPageContent from './ItemsPageContent';

function ItemsPageFallback() {
  return (
    <div className="min-h-screen bg-white">
      <Header active="market" />
      <main className="mx-auto max-w-[1120px] px-6 py-10">
        <p className="py-20 text-center text-sm text-[#9CA3AF]">불러오는 중...</p>
      </main>
      <Footer />
    </div>
  );
}

export default function ItemsPage() {
  return (
    <Suspense fallback={<ItemsPageFallback />}>
      <ItemsPageContent />
    </Suspense>
  );
}
