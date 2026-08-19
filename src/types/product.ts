// 정렬 옵션 (Union 타입)
export type ProductSortOption = "recent" | "favorite";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

// GET /products 목록이 실제로 내려주는 필드만 뽑아낸 타입 (Pick 유틸리티 타입)
export type ProductListItem = Pick<
  Product,
  "id" | "name" | "price" | "images" | "favoriteCount" | "createdAt"
>;

export interface ProductComment {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  // GET /products/:id 상세 응답에만 포함되고, 댓글 목록(cursor) 응답에는 없음
  writer?: { id: number; nickname: string; image: string | null };
}

// 참고: product.ownerId/ownerImage/ownerNickname/likeCount는 백엔드가 실제로 내려주지 않는
// 필드라 항상 undefined다 (panda_fe/app/items/[id]/page.js에서 읽고 있음). 런타임 동작은 그대로
// 두고, strict 모드에서도 컴파일이 깨지지 않도록 옵셔널 필드로 잡아둔다.
export type ProductDetail = Product & {
  isLiked: boolean;
  comments: ProductComment[];
  ownerId?: number;
  ownerNickname?: string;
  ownerImage?: string;
  likeCount?: number;
};
