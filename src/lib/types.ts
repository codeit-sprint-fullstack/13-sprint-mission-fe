// 특정 API 모듈 하나가 소유하지 않는 공유 타입만 둔다.
// Post는 PostAPI, Product는 ProductApi에 각자 남아 있다.

export type ListResponse<T> = {
  list: T[];
  totalCount: number;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  writer: { id: number; nickname: string; image?: string };
};

export type User = {
  id: number;
  nickName: string;
  email: string;
  image: string | null;
  provider: string | null;
  providerId: string | null;
  createdAt: string;
  updatedAt: string;
};
