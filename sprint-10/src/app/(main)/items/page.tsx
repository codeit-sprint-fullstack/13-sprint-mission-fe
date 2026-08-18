import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { productApi } from "@/entities/product";
import ItemsPageClient from "./_components/ItemsPageClient";

export const dynamic = "force-dynamic";

export default async function ItemsPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["products", { page: 1, orderBy: "recent", keyword: "" }],
      queryFn: () =>
        productApi.getProducts({ page: 1, orderBy: "recent", pageSize: 10, keyword: "" }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", "best"],
      queryFn: () => productApi.getBestProducts(4),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemsPageClient />
    </HydrationBoundary>
  );
}
