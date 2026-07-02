export const queryKeys = {
  me: ["me"],
  products: (page, orderBy, keyword) => ["products", page, orderBy, keyword],
  product: (productId) => ["product", productId],
  comments: (productId) => ["comments", productId],
  articles: (page, orderBy, keyword) => ["articles", page, orderBy, keyword],
  bestArticles: ["articles", "best"],
  article: (articleId) => ["article", articleId],
  articleComments: (articleId) => ["comments", "article", articleId],
};
