import type { User } from "./user";

export type CommentAuthor = Pick<User, "id" | "nickname" | "image">;

export interface BaseComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor | null;
}