import * as article from "./ArticleService.js";
import * as product from "./ProductService.js";

article.getArticleList({ page: 1, pageSize: 1, keyword: "iRum" });
article.getArticle(1111);
article.createArticle();
article.patchArticle(5981);
article.deleteArticle(5981);

product.getProductList({ page: 1, pageSize: 1, keyword: "iRum" });
product.getProduct(3075);
product.createProduct();
product.patchProduct(3426);
product.deleteProduct(3426);
