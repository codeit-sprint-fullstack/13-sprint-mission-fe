import { getAccessToken } from "@/lib/authStorage";
import type { UploadResponse, ApiError } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function uploadImage(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("image", file);

  const token = getAccessToken();
  const res = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  if (!res.ok) {
    const parsed = (await res.json().catch(() => ({ message: "이미지 업로드에 실패했습니다." }))) as Partial<ApiError>;
    const error: ApiError = { message: parsed.message ?? "이미지 업로드에 실패했습니다.", status: res.status };
    throw error;
  }

  return res.json() as Promise<UploadResponse>;
}