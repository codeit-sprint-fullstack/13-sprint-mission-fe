export type SortOrder = "recent" | "favorite";

export interface User {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
}

export interface Writer {
  id: number;
  nickname: string;
  image: string | null;
}

export interface Product {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt?: string;
  favoriteCount: number;
  isLiked: boolean;
}

export interface Article {
  id: number;
  writer: Writer;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
  updatedAt?: string;
  favoriteCount: number;
  isLiked: boolean;
}

export interface Comment {
  id: number;
  writer: Writer;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageResponse<T> {
  totalCount: number;
  list: T[];
}

export interface CursorPage<T> {
  list: T[];
  nextCursor: number | null;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  tags: string[];
  images: string[];
}

export type CreateProductInput = Omit<ProductFormValues, "price"> & {
  price: number;
};

export type UpdateProductInput = Partial<CreateProductInput>;

export interface ArticleInput {
  title: string;
  content: string;
  image?: string | null;
}

export interface CommentInput {
  content: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput extends SignInInput {
  nickname: string;
  passwordConfirmation: string;
}

export interface AuthResult {
  user: User;
}
