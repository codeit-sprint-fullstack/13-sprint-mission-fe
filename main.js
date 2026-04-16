import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

// Article API 테스트
getArticleList(1, 5, "")
  .then((data) => {
    console.log("📄 Article List:", data);
  })
  .catch((error) => console.error(error));

getArticle(1)
  .then((data) => console.log("📄 Article:", data))
  .catch((error) => console.error(error));

createArticle({
  title: "테스트 게시글",
  content: "테스트 내용입니다.",
  image: "https://via.placeholder.com/150",
})
  .then((data) => console.log("📄 Created Article:", data))
  .catch((error) => console.error(error));

// Product API 테스트
(async () => {
  try {
    const productList = await getProductList(1, 5, "");
    console.log("🛒 Product List:", productList);

    const product = await getProduct(1);
    console.log("🛒 Product:", product);

    const newProduct = await createProduct({
      name: "테스트 상품",
      description: "테스트 상품 설명",
      price: 10000,
      tags: ["test", "sample"],
      images: ["https://via.placeholder.com/150"],
    });
    console.log("🛒 Created Product:", newProduct);
  } catch (error) {
    console.error(error);
  }
})();
