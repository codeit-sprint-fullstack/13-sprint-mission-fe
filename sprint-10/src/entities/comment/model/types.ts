import type { PublicUser } from "@/entities/user";
import type { CursorResponse } from "@/shared/types/api";

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: PublicUser;
};

export type CommentListResponse = CursorResponse<Comment>;
