import ArticleApi from "./api/ArticleService.js";
import ProductApi from "./api/ProductService.js";

const article = new ArticleApi();
const products = new ProductApi();

const btn = document.getElementById("test-btn");

const listParams = new URLSearchParams({
  page: 1,
  pageSize: 10,
  orderBy: "recent",
  keyword: "",
});

test();

async function test() {
  await articleApiTest();
  // ================ProcutApi========================
  await productApiTest();
}

async function articleApiTest() {
  const articleData = {
    image: "https://example.com/articlePost",
    content: "김대영의 스프린트3",
    title: "Article Post~",
  };

  const articlePatchData = {
    ...articleData,
    title: "Article Patch",
  };

  return article
    .getArticleList(listParams)
    .then((result) => {
      console.log("=====ArticleList======");
      const list = result.list;
      console.log(list);
      return list[0].id;
    })
    .then((id) => {
      return article.getArticle(id).then((result) => {
        console.log("=====Article{ID}======");
        console.log(result);
        return id;
      });
    })
    .then((id) => {
      return article.createArticle(articleData).then((result) => {
        console.log("=====ArticlePost======");
        console.log(result);
        return id;
      });
    })
    .then((id) => {
      return article.patchArticle(id, articlePatchData).then((result) => {
        console.log("=====ArticlePatch======");
        console.log(result);
        return id;
      });
    })
    .then((id) => {
      return article.deleteArticle(id).then((result) => {
        console.log("=====ArticleDelete=====");
        console.log(result);
      });
    });
}

async function productApiTest() {
  const productData = {
    images: ["https://example.com/..."],
    tags: ["전자제품", "학용퓸"],
    price: 0,
    description: "string",
    name: "POST 김대영",
  };
  const patchData = { ...productData, name: "PATCH 김대영" };

  //Product List
  let productListId = 0;
  try {
    const result = await products.getProductList(listParams);
    const list = result.list;
    productListId = list[0].id;
    console.log("============ProductsList=================");
    console.log(list);
  } catch (error) {
    console.error(error.message);
  }

  //Product{id}
  try {
    const result = await products.getProduct(productListId);
    console.log("============Products{id}=================");
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }

  //Product Post
  try {
    const result = await products.createProduct(productData);
    console.log("============ProductsPost=================");
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }

  //Product PATCH
  try {
    const result = await products.patchProduct(productListId, patchData);
    console.log("============ProductsPatch=================");
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }

  //Product DELETE
  try {
    const result = await products.deleteProduct(productListId);
    console.log("============ProductsDelete=================");
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
