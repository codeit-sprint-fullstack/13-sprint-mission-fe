import { UserType } from "./user";
import { CommentType } from "./comment";

export type PostType = {
  id: number;
  title: string;
  content: string;
  favoriteCount: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  liked: boolean;
  userId: number;
  user: UserType;
  comments?: CommentType[];
};
export type PostListType = {
  totalCount: number;
  list: PostType[];
};
