// API: https://panda-market-api-crud.vercel.app
import type {
  ListResponse,
  Product,
  ProductCreateInput,
  ProductListParams,
  ProductUpdateInput,
  UploadedImage,
} from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://panda-market-api-crud.vercel.app";

/** 로그인 후 저장되는 토큰 키. 로그인 화면은 다음 미션에서 연결 예정. */
function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function normalizeAssetUrl(path?: string | null): string | undefined {
  if (!path || /^https?:\/\//.test(path)) return path ?? undefined;
  return `${BASE_URL}${path}`;
}

/** 자체 백엔드(imageUrl)와 실습용 CRUD API(images[]) 응답을 모두 지원 */
export function getProductImageUrl(
  product: Pick<Product, "imageUrl" | "images">,
): string | undefined {
  return normalizeAssetUrl(product.imageUrl ?? product.images?.[0]);
}

/** 응답 본문 타입을 제네릭으로 받는 공통 fetch 래퍼 */
async function requestApi<T>(
  path: string,
  errorMessage: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store", ...init });
  if (!res.ok) throw new Error(errorMessage);
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

function jsonBody(data: unknown): RequestInit {
  return {
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  };
}

export async function getProducts({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
}: ProductListParams = {}): Promise<ListResponse<Product>> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    keyword: String(keyword),
    orderBy: String(orderBy),
  });
  return requestApi<ListResponse<Product>>(
    `/products?${params}`,
    "상품 목록을 불러오지 못했습니다.",
  );
}

export async function getProduct(id: number | string): Promise<Product> {
  return requestApi<Product>(`/products/${id}`, "상품을 불러오지 못했습니다.");
}

export async function uploadProductImage(file: File): Promise<UploadedImage> {
  const formData = new FormData();
  formData.append("image", file);

  return requestApi<UploadedImage>(`/images/upload`, "이미지 업로드에 실패했습니다.", {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });
}

export async function createProduct(data: ProductCreateInput): Promise<Product> {
  return requestApi<Product>(`/products`, "상품 등록에 실패했습니다.", {
    method: "POST",
    ...jsonBody(data),
  });
}

export async function updateProduct(
  id: number | string,
  data: ProductUpdateInput,
): Promise<Product> {
  return requestApi<Product>(`/products/${id}`, "상품 수정에 실패했습니다.", {
    method: "PATCH",
    ...jsonBody(data),
  });
}
