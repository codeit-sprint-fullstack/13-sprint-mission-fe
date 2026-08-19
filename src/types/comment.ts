import { SuccessResponse } from "./api";

export type ArticleComment = {
  id: number;
  content: string;
  createdAt: string;
  article: {
    userName: string;
  };
};

type CommentCursor = {
  nextCursor: number | null;
};

export type ProductComment = {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
};

export type ProductCommentResponse = CommentCursor & {
  list: ProductComment[];
};

export type ArticleCommentResponse = SuccessResponse<ArticleComment[]> &
  CommentCursor;
