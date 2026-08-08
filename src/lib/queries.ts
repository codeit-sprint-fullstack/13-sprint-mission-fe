import type { SortOrder } from "@/types/api";

export const queryKeys = {
  me: ["me"],
  products: (page: number, orderBy: SortOrder, keyword: string) =>
    ["products", page, orderBy, keyword] as const,
  product: (productId: string) => ["product", productId] as const,
  comments: (productId: string) => ["comments", productId] as const,
  articles: (page: number, orderBy: SortOrder, keyword: string) =>
    ["articles", page, orderBy, keyword] as const,
  bestArticles: ["articles", "best"],
  article: (articleId: string) => ["article", articleId] as const,
  articleComments: (articleId: string) =>
    ["comments", "article", articleId] as const,
};
