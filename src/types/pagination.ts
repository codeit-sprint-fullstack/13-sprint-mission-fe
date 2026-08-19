// 오프셋(page) 기반 목록 응답과 커서 기반 목록 응답에 공통으로 쓰는 제네릭 타입.
export interface PaginatedResponse<T> {
  list: T[];
  totalCount: number;
}

export interface CursorPaginatedResponse<T> {
  list: T[];
  nextCursor: number | null;
}
