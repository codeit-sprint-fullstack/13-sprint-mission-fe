export type ArticleActionResult =
  | { success: true; data: Article }
  | { success: false; error: string };

export interface ArticlePayload {
  title: string;
  content: string;
  images: string[];
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  likeCount: number;
  isLiked: boolean;
  ownerId: number;
  owner: {
    id: number;
    nickname: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}
