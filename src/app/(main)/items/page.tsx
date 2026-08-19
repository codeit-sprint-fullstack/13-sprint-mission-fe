import Button from "@/components/common/Button";
import BestProductsSection from "@/components/ui/BestProductsSection";
import ProductsSection from "@/components/ui/ProductsSection";
import SearchInput from "@/components/ui/SeartchInput";
import SortDropDown from "@/components/ui/SortDropDown";
import getQueryClient from "@/lib/getQueryClient";
import { getBestProduct, getProducts } from "@/lib/ProductApi";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";

const PAGE_SIZE = 10;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ orderBy?: string; keyword?: string; page?: string }>;
}) {
  const params = await searchParams;
  const orderBy = params?.orderBy ?? "recent";
  const keyword = params?.keyword ?? "";
  const page = Number(params?.page ?? 1);

  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["bestProducts"],
      queryFn: getBestProduct,
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", orderBy, keyword, page],
      queryFn: () => getProducts(orderBy, keyword, page),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="page-container mt-6.5">
        <h1 className="text-xl font-bold mb-4">베스트 상품</h1>
        <section className="flex gap-4">
          <BestProductsSection />
        </section>
        <section className="flex justify-between items-center mt-10">
          <h2 className="text-xl font-bold">판매 중인 상품</h2>
          <nav className="flex gap-3 items-center">
            <SearchInput defaultValue={keyword} />
            <Link href="/items/post">
              <Button>상품 등록하기</Button>
            </Link>
            <SortDropDown current={orderBy} />
          </nav>
        </section>
        <ProductsSection
          orderBy={orderBy}
          keyword={keyword}
          page={page}
          pageSize={PAGE_SIZE}
        />
      </div>
    </HydrationBoundary>
  );
}
