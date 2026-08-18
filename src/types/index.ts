type CardType = {
  id: number;
  title: string;
  date: number;
};

interface PageParam {
  page: number;
  pageSize: number;
}
interface ArticleResponse {
  list: Article[];
}
interface Article {
  title: string;
  createdAt: number;
  id: number;
  content: string;
}

interface Comment {
  id: number;
  content: string;
}

type ProductParam = {
  page: number;
  pageSize: number;
  orderBy: string;
};

interface ProductResponse {
  totalCount: number;
  list: Product[];
}
interface Product {
  id: number;
  images: string;
  description: string;
  price: number;
}

type AuthResponse = {
  accessToken: string;
};
interface User {
  id: number;
  email: string;
  nickname: string;
}
