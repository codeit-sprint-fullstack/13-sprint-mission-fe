export interface ApiError {
  message: string;
  status: number;
}

export interface ListResponse<T> {
  list: T[];
  totalCount: number;
}

export interface CursorListResponse<T> {
  list: T[];
  nextCursor: number | null;
}

export interface UploadResponse {
  url: string;
}

export interface MessageResponse {
  message: string;
}