import type { PublicUser } from "@/entities/user";

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: PublicUser;
};

export type CommentListResponse = {
  nextCursor: string | null;
  list: Comment[];
};
