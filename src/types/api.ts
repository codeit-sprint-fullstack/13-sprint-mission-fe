export type SortOrder = "recent" | "favorite";
export type ResourceType = "product" | "article";

export type TargetRef = 
    | { type: "product"; productId: string }
    | { type: "article"; articleId: string };

export type FormErrors<T extends object> = Partial<Record<keyof T, string>>;

export interface User {
    id: string;
    email?: string;
    nickname: string;
    image?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    tags?: string[];
    imageUrls?: string[];
    images?: string[];
    ownerId?: string;
    writer?: User | null;
    ownerNickname?: string;
    favoriteCount?: number;
    isFavorite?: boolean;
    isLiked?: boolean;
    createdAt?: string;
    updatedAt?: string;
    comments?: Comment[];
}

export interface Article {
    id: string;
    title: string;
    content: string;
    imageUrls?: string[];
    images?: string[];
    ownerId?: string;
    writer?: User | null;
    ownerNickname?: string;
    favoriteCount?: number;
    isFavorite?: boolean;
    isLiked?: boolean;
    createdAt?: string;
    updatedAt?: string;
    comments?: Comment[];
}

export interface Comment {
    id: string;
    content: string;
    targetType?: "product" | "article";
    targetId?: string;
    ownerId?: string;
    writer?: User | null;
    ownerNickname?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PaginatedResponse<T> {
    list: T[];
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}

export interface ApiResponse<TData> {
    data: TData;
    message?: string;
}

export interface AuthFormValues {
    email: string;
    password: string;
}

export interface SignUpFormValues extends AuthFormValues {
    nickname: string;
    passwordConfirmation?: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken?: string;
}

export interface ProductListParams {
    page?: number;
    limit?: number;
    pageSize?: number;
    orderBy?: SortOrder;
    keyword?: string;
}

export interface ArticleListParams {
    page?: number;
    limit?: number;
    pageSize?: number;
    orderBy?: SortOrder;
    keyword?: string;
}

export type ProductPayload = Pick<Product, "name" | "description" | "price"> & Partial<Pick<Product, "tags" | "images" | "imageUrls">>;

export interface ArticlePayload {
    title: string;
    content: string;
    images?: string[];
    imageUrls?: string[];
}

export interface ImageUploadResponse {
    imageUrls: string[];
}

export interface ProductFormValues {
    name: string;
    description: string;
    price: string;
    tagInput: string;
    tags: string[];
}

export interface ArticleFormValues {
    title: string;
    content: string;
}