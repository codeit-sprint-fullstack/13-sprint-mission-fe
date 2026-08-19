export interface PostWriter {
  id: number;
  nickname: string;
  image?: string | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  images?: string[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: PostWriter;
  isLiked?: boolean;
}

export type Posts = Post[];

export interface CreatePostInput {
  title: string;
  content: string;
}

export type UpdatePostInput = Partial<CreatePostInput>;

export interface PostListResponse {
  success: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  filters: { keyword: string; orderBy: string };
  list: Posts;
}

export interface CommentWriter {
  id: number;
  nickname: string;
  image?: string | null;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: CommentWriter;
}

export type Comments = Comment[];

export interface CommentListResponse {
  success: boolean;
  limit: number;
  total: number;
  nextCursor: number | null;
  sort: string;
  list: Comments;
}

export interface CreateCommentInput {
  content: string;
}

export type UpdateCommentInput = Partial<CreateCommentInput>;

export interface ProductWriter {
  id: number;
  nickname: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  ownerNickname: string;
  isLiked: boolean;
  comments?: {
    id: number;
    content: string;
    createdAt: string;
    writerId: number;
    writerNickname: string;
  }[];
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  tags?: string[];
  images?: string[];
}

export interface ItemWriter {
  id: number;
  nickname: string;
  image?: string | null;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  writer: ItemWriter;
}

export interface ItemListResponse {
  success: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  filters: { search: string; sort: string };
  list: Item[];
}
