import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./services/ArticleService.js";

import {
  createProduct,
  getProduct,
  getProductList,
  patchProduct,
  deleteProduct,
} from "./services/ProductService.js";

getArticleList(1, 5, "");
// getArticle(6402);
// createArticle(
//   "스프린트 미션 3입니다.",
//   "스프린트 미션 3 내용입니다.",
//   "https://example.com/...",
// );
//
// patchArticle("6390");
//
// deleteArticle("6417");

(async () => {
  const productList = await getProductList(1, 5, "");
  console.log(productList);

  // const product = await getProduct(3860);
  // console.log(product);
  //
  // const newProduct = await createProduct(
  //   "노트북",
  //   "최신 노트북",
  //   120000000,
  //   ["전자제품"],
  //   ["https://example.com/..."],
  // );
  // console.log(newProduct);
  //
  // const patchedProduct = await patchProduct(3845);
  // console.log(patchedProduct);
  //
  // await deleteProduct(3859);
})();
