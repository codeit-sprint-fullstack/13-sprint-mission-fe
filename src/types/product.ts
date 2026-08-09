import { TagType } from "./tag";
import { UserType } from "./user";
import { CommentType } from "./comment";

// 백엔드에서 가져온 image 객체 타입
export type ImageType = {
  id: number;
  productId: number;
  url: string;
};

// 프엔에서 생성한 image (File type) 타입
export type ImageUploadType = File;

type ProductBaseType = {
  id: number;
  name: string;
  description: string;
  price: number;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  tags: TagType[];
  user: UserType;
  liked: boolean;
  comments: CommentType[];
};

export type ProductType = ProductBaseType & { images: ImageType[] };
export type ProductUploadType = ProductBaseType & { images: ImageUploadType[] };
export type ProductListType = {
  totalCount: number;
  list: ProductType[];
};
export type ProductUploadListType = {
  totalCount: number;
  list: ProductUploadType[];
};
