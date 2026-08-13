export interface User {
  id: number;
  email: string;
  nickname: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  likeCount?: number;
  createdAt: string;
  writer?: {
    id: number;
    nickname: string;
  };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  createdAt: string;
  favoriteCount: number;
  isFavorite?: boolean;
  image?: string;
  images?: string[];
  ownerId?: number;
  ownerNickname?: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

export interface PaginatedResponse<T> {
  list: T[];
  totalCount: number;
}