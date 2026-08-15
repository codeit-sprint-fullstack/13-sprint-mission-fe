export type ProductActionResult =
  | { success: true; data: Product }
  | { success: false; error: string };

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: number;
  owner: {
    id: number;
    nickname: string;
  };
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}
