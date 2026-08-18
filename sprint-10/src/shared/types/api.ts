// 여러 엔티티의 API 응답/요청에서 반복되는 형태를 제네릭으로 추상화한 공용 타입.

export type PaginatedResponse<T> = {
  list: T[];
  totalCount: number;
};

export type CursorResponse<T> = {
  list: T[];
  nextCursor: string | null;
};

export type ApiSuccessResponse<T> = {
  success: boolean;
  data: T;
};

export type PaginationParams<TOrderBy extends string> = {
  page?: number;
  pageSize?: number;
  orderBy?: TOrderBy;
  keyword?: string;
};

export type CursorParams = {
  cursor?: string;
  pageSize?: number;
};
