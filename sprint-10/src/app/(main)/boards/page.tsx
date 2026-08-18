import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { articleApi } from "@/entities/article";
import BoardsPageClient from "./_components/BoardsPageClient";

export const dynamic = "force-dynamic";

export default async function BoardsPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["articles", { page: 1, orderBy: "recent", keyword: "" }],
      queryFn: () =>
        articleApi.getArticles({ page: 1, orderBy: "recent", pageSize: 10, keyword: "" }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["articles", "best"],
      queryFn: () => articleApi.getBestArticles(3),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardsPageClient />
    </HydrationBoundary>
  );
}
