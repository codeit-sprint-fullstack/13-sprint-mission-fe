import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 },
    },
  });

const getQueryClient = cache(makeQueryClient);
export default getQueryClient;
