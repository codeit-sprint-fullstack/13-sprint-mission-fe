import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ItemListPage from "./_components/ItemListPage";
import { getItems } from "@/services/itemService";

interface ItemPageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    keyword?: string;
  }>;
}

export default async function ItemPage({ searchParams }: ItemPageProps) {
  const resolvedSearchParams = await searchParams;
  const searchInfo = {
    page: Number(resolvedSearchParams?.page) || 1,
    sort: resolvedSearchParams?.sort || "recent",
    keyword: resolvedSearchParams?.keyword || "",
  };
  const { page, sort, keyword } = searchInfo;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["items", { page, sort, keyword }],
    queryFn: () => getItems({ page, pageSize: 10, sort, keyword }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["bestItems"],
    queryFn: () => getItems({ page: 1, pageSize: 4, sort: "favorite" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ItemListPage initialFilters={searchInfo} />
    </HydrationBoundary>
  );
}
