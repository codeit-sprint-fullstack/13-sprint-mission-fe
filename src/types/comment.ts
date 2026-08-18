export interface Comment {
  id: number;
  title: string;
  content?: string;
  images: string[];
  likeCount: number;
  isLiked: boolean;
  ownerId: number;
  isMyComment: boolean;
  createdAt: string;
  owner: {
    id: number;
    nickname: string;
    avatar: string;
  };
}
