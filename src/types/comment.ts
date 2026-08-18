import { UserType } from "./user";

export type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  liked: boolean;
  userId: number;
  articleId: number;
  user: UserType;
};
