/** Pagination API Response Interface */
export interface Pagination {
  totalArticles: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}

/** API Common Response Interface */
export interface ListResponse<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
}

/** Server Action 공통 반환 타입 */
export type ActionResult =
  | { success: true }
  | { success: false; error: string; code?: string };

