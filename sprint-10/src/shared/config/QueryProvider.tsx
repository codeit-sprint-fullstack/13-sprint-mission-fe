"use client";

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

function makeQueryClient() {
  const queryCache = new QueryCache({
    onError: (error, query) => {
      alert(`오류 발생: ${query.meta?.name ?? "알 수 없는 쿼리"} - ${error.message}`);
    },
  });

  return new QueryClient({
    queryCache,
    defaultOptions: {
      queries: {
        staleTime: 10 * 1000,
        retry: false,
      },
    },
  });
}

const browserQueryClientBox: { current: QueryClient | undefined } = { current: undefined };

function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient();
  if (!browserQueryClientBox.current) browserQueryClientBox.current = makeQueryClient();
  return browserQueryClientBox.current;
}

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
