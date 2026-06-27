"use client";

import {
  isServer,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  const queryCache = new QueryCache({
    onError: (error, query) => {
      alert(
        `오류 발생: ${query.meta?.name || "알 수 없는 쿼리"} - ${
          error.message
        }`,
      );
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

let browserQueryClient = undefined;

function getQueryClient() {
  if (isServer) {
    // 서버에서는 항상 새로운 쿼리 클라이언트를 만들어 반환
    return makeQueryClient();
  } else {
    // 브라우저에서는 이미 만들어진 쿼리 클라이언트를 반환
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({ children }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
