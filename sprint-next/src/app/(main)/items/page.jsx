import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";
import ItemsPageClient from "./_components/ItemsPageClient";

export default async function ItemsPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["products", { page: 1, orderBy: "recent", keyword: "" }],
      queryFn: () => getProducts({ page: 1, orderBy: "recent", pageSize: 10, keyword: "" }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", "best"],
      queryFn: () => getProducts({ page: 1, orderBy: "favorite", pageSize: 4 }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemsPageClient />
    </HydrationBoundary>
  );
}
