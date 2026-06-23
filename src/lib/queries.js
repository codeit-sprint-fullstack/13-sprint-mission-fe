export const queryKeys = {
  me: ["me"],
  products: (page, orderBy, keyword) => ["products", page, orderBy, keyword],
  product: (productId) => ["product", productId],
  comments: (productId) => ["comments", productId],
};
