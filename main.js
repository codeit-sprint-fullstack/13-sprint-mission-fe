import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './services/ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './services/ProductService.js';

// Article 함수 실행
getArticleList({ page: 1, pageSize: 5 }).then((data) => console.log('getArticleList:', data));

// create → 반환된 id로 get / patch / delete
createArticle({ title: '테스트 제목', content: '테스트 내용', image: 'https://via.placeholder.com/150' }).then((data) => {
  console.log('createArticle:', data);
  const id = data.id;

  getArticle(id).then((data) => console.log('getArticle:', data));
  patchArticle(id, { title: '수정된 제목' }).then((data) => console.log('patchArticle:', data));
  deleteArticle(id).then((data) => console.log('deleteArticle:', data));
});

// Product 함수 실행
getProductList({ page: 1, pageSize: 5 }).then((data) => console.log('getProductList:', data));

// create → 반환된 id로 get / patch / delete
createProduct({
  name: '테스트 상품',
  description: '테스트 설명',
  price: 10000,
  tags: ['태그1'],
  images: [],
}).then((data) => {
  console.log('createProduct:', data);
  const id = data.id;

  getProduct(id).then((data) => console.log('getProduct:', data));
  patchProduct(id, { name: '수정된 상품명' }).then((data) => console.log('patchProduct:', data));
  deleteProduct(id).then((data) => console.log('deleteProduct:', data));
});
