import axios from './axios';
import type {
  Comment,
  CommentInput,
  CreateProductInput,
  CursorPage,
  PageResponse,
  Product,
  SortOrder,
  UpdateProductInput,
} from '../types/models';

interface ProductListParams {
  orderBy?: SortOrder;
  page?: number;
  pageSize?: number;
  keyword?: string;
}

interface ProductCommentListParams {
  productId: string | number;
  params: {
    limit: number;
    cursor?: number;
  };
}

export async function getProducts({
  orderBy = 'recent',
  page = 1,
  pageSize = 10,
  keyword,
}: ProductListParams = {}): Promise<PageResponse<Product>> {
  const response = await axios.get<PageResponse<Product>>('/products', {
    params: {
      orderBy,
      page,
      pageSize,
      keyword,
    },
  });
  const { totalCount, list } = response.data;
  return { totalCount, list };
}

export async function addProduct(product: CreateProductInput): Promise<Product> {
  const response = await axios.post<Product>('/products', product);
  const newProduct = response.data;
  return newProduct;
}

export async function getProduct(productId: string | number): Promise<Product> {
  const response = await axios.get<Product>(`/products/${productId}`);
  const product = response.data;
  return product;
}

export async function patchProduct(productId: string | number, partialProduct: UpdateProductInput): Promise<Product> {
  const response = await axios.patch<Product>(`/products/${productId}`, partialProduct);
  const product = response.data;
  return product;
}

export async function deleteProduct(productId: string | number): Promise<void> {
  await axios.delete(`/products/${productId}`);
}

export async function addProductFavorite(productId: string | number): Promise<Product> {
  const response = await axios.post<Product>(`/products/${productId}/favorite`);
  const product = response.data;
  return product;
}

export async function deleteProductFavorite(productId: string | number): Promise<Product> {
  const response = await axios.delete<Product>(`/products/${productId}/favorite`);
  const product = response.data;
  return product;
}

export async function getProductComments({
  productId,
  params: { limit, cursor },
}: ProductCommentListParams): Promise<CursorPage<Comment>> {
  const response = await axios.get<CursorPage<Comment>>(`/products/${productId}/comments`, {
    params: { limit, cursor },
  });
  return response.data;
}

export async function addProductComment(productId: string | number, { content }: CommentInput): Promise<Comment> {
  const response = await axios.post<Comment>(`/products/${productId}/comments`, {
    content,
  });
  const comment = response.data;
  return comment;
}
